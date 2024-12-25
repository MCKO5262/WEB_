import { daFilm } from "../db/da.mjs";

class Film {
    constructor() {
        
    }
    /** GET Methods */
    /**
     * @openapi
     * '/api/film':
     *  get:
     *     tags:
     *     - Film Controller
     *     summary: Get a list of films
     *     responses:
     *      200:
     *        description: Fetched Successfully
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
    async list(req, res) {
        
        if (req.query.urt) { 

            const urtregexp = /select/ig
            const sanitized = req.query.urt.replace(urtregexp, "*");
            console.log("Sanitized string = ", sanitized);
            const urt = parseInt(req.query.urt);
            console.log("urt = ", urt);

            const result = await daFilm.filterFilms(req, res, urt);
            res.status(200).send(result.rows);
            return;
        }
  

        await daFilm.listFilms(req, res);
    }
    async filter(req, res) {
        
        //sanitization
        const urtregexp = /select/ig
        const sanitized = req.params.urt.replace(urtregexp, "*");
        console.log("Sanitized string = ", sanitized);
        const urt = parseInt(sanitized);
        console.log("urt = ", urt);
        //validation
        if (urt > 300 || urt < 15) { 
            res.status(400).send('Invalid request');
            return;
        }

        const result = await daFilm.filterFilms(req, res, urt);
        res.status(200).send(result.rows);
    }

}

const film = new Film();

export { film }