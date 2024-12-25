import { daCountry } from "../db/da.mjs";

class Country {
    constructor(parameters) {
        
    }
    /** GET Methods */
    /**
     * @openapi
     * '/api/country':
     *  get:
     *     tags:
     *     - Country Controller
     *     summary: Get a list of countries
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
    async list(rq, rs) { 
        //validation function
        //return
        const result = await daCountry.listCountries();
        rs.status(200).send(result);
    }
}

const country = new Country();

export { country}