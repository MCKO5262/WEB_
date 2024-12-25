export default class DaCountry {
    constructor(poolObj) {
        this.db = poolObj;
        this.Query = "query;"
    }
    async listCountries() { 
            return await this.db.query(this.Query);
    }
}