import { daCity } from "../db/da.mjs";

export default class City {
    constructor(parameters) {

    }

    /** GET Methods */
    /**
     * @openapi
     * '/api/cities':
     *  get:
     *     tags:
     *     - City Controller
     *     summary: Get a list of cities
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
    async get(req, res) {
        console.log("city getting...");
        
        await daCity.selectCities(req, res);
    }

    /** POST Methods */
    /**
     * @openapi
     * '/api/cities':
     *  post:
     *     tags:
     *     - City Controller
     *     summary: Create a city
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - cityName
     *              - countryId
     *            properties:
     *              cityName:
     *                type: string
     *                default: City 
     *              countryId:
     *                type: number
     *                default: 1
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
    async post(req, res) {
        console.log('inserting new city');
        const { cityName, countryId } = req.body;
        //validation
        //sanitazation
        await daCity.insertCity(req, res,
            {
            name: cityName,
            country: countryId
            });
    }

    async put(req, res) {
        console.log('updating the city');
        const { city, city_id } = req.body;
        
        await daCity.updateCity(req, res, { city: city, city_id: city_id });
    }


}

const city = new City();

export { city }