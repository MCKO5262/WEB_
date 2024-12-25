export default class DaLogin {
    constructor(pool) {
        this.pool = pool
        this.checkLoginStr = "SELECT * FROM users where email = $1 and password = $2";
    }
    async checkLogin(req, res, authInfo) {
        try {
            // Log for debugging
            console.log("Executing query...");
            
            const result = await this.pool.query(
                this.checkLoginStr,
                [
                    authInfo.u,
                    authInfo.p
                ]
            );
    
            // Log the rows of the result
            console.log("Query result rows:", result.rows);
    
            res.status(200).send(result.rows);
        } catch (error) {
            console.error("Error executing query:", error);
            res.status(500).send('Error: ' + error);
        }
    }
    
    async insertCity(req, res, cityObj) {
        try {
            const result = await this.pool.query(this.insertCitiesStr, [cityObj.name, cityObj.country]);
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

