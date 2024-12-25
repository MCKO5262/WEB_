export default class DaAddress {
    constructor(poolObj) {
        this.pool = poolObj;
        this.selectStr = "SELECT address_id, address, address2, district, city_id, postal_code FROM public.address limit 10; "
        this.selectfilterStr = "SELECT address_id, address, address2, district, city_id, postal_code FROM public.address where city_id=$1"
        this.selectfilterStr = "SELECT address_id, address, address2, district, city_id, postal_code FROM public.address where city_id=$1 and type=$2"
        
    }

    async selectAddress(city_id, type) {
        console.log(city_id)
        if(!city_id)
            return await this.pool.query(this.selectStr);

        return await this.pool.query(this.selectfilterStr, [city_id]);
    }
}