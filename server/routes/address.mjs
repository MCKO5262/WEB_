import { daAddress } from './../db/da.mjs';
class Address {
    constructor() {

    }
    async list(rq, rs) {
        let city_id = null;
        if (rq.query.city_id) {
            //sanitize
            //validate

            const sqlReg = /select/ig;
            const clearCity_id = rq.query.city_id.replace(sqlReg, '😁');
            console.log(clearCity_id)
            city_id = parseInt(rq.query.city_id, clearCity_id);
            if (city_id > 300) {
                rs.status(400).send("City id must be less than 300");
                return
            }
        }

        //dbcall
        const result = await daAddress.selectAddress(city_id);
        rs.status(200).send(result.rows);
    }
}
const address = new Address();
export { address }