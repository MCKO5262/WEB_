export default class DaCity {
    constructor(pool) {
        this.pool = pool
        this.insertCitiesStr = 'INSERT INTO public.city( city, country_id, last_update) VALUES ($1, $2, now())';
        this.updateCitiesStr = 'update public.city set city=$1 where city_id=$2';
        this.deleteCitiesStr = 'select * from city';
        this.selectCitiesStr = 'SELECT * FROM artists';
    }

    async selectCities(req, res) {
        try {
            res.status(200)
                .send(
                    (await this.pool
                        .query(this.selectCitiesStr)
                    )
                    .rows
                )
        }
        catch (error) {
            res.status(500).send('Error' + error)
        }
    }

    async insertCity(req, res, cityObj) {
        try {
            const result = await this.pool
                .query(
                    this.insertCitiesStr,
                    [cityObj.name, cityObj.country]
                );
            if (result.rowCount != 1) {
                res.status(500).send(`Couldn't add new city.`);
                return;
            }

            res.status(201).send('New city created successfully');
        }
        catch (error) {
            res.status(500).send(`Couldn't add new city. Error is: \n"${error}"`)
        }
    }

    async updateCity(req, res, cityObj) {
        try {
            const result = await this.pool.query(this.updateCitiesStr, [cityObj.city, cityObj.city_id]);
            if (result.rowCount != 1) {
                res.status(400).send(`Couldn't update city. Check the value`);
                return;
            }

            res.status(200).send('City updated successfully');
        }
        catch (error) {
            res.status(500).send('Could not update the city. Error: \n' + error)
        }
    }
}

