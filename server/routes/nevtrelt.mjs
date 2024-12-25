import { daLogin } from '../db/da.mjs';

class Nevtrelt {
    constructor() {
        
    }


    /** POST Methods */
    /**
     * @openapi
     * '/api/login':
     *  post:
     *     tags:
     *     - Login Controller
     *     summary: Check the login
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - u
     *              - p
     *            properties:
     *              u:
     *                type: string
     *                default: user 
     *              p:
     *                type: string
     *                default: 123
     *     responses:
     *      200:
     *        description: Accepted
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
    async check(req, res) { 
        const { u, p } = req.body;
       console.log(u, p)
        //validation higdeed ok baival DB tei ajillana
        await daLogin.checkLogin(req, res, { u, p });
    }
}

const login = new Nevtrelt();
export { login }