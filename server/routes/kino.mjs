import { daKino } from './../db/da.mjs';

class Kino {
    constructor() {
        this.allowedRatings = ["G", "PG-13", "R", "PG"];
    }

    /** GET Methods */
    /**
     * @openapi
     * '/api/kino':
     *  get:
     *     tags:
     *     - Kino Controller
     *     summary: Get a list of movies
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
    async filter(req, res) {
        const rtg = req.query.rating;
        const duration = req.query.duration;
        //sanitize
        security.Sanitize(req);
        //validation
        if (duration > 10) {
            res.status(400).send("duration 10 aas baga baih heregtei");
            return;
        }
        //dbtai ajillana

        res.send(await daKino.filterKino(rtg, duration));
    }
}

const kino = new Kino();
export { kino }