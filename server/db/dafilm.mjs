export default class DaFilm {
    constructor(poolObj) {
        this.pool = poolObj;
        this.listFilmQuery = 'SELECT film_id, title, description, release_year FROM public.film where length > 180';
        this.filterFilmQuery = 'SELECT film_id, title, description, release_year FROM public.film where length > $1';
    }
    async listFilms(req, res) { 
        const result = await this.pool.query(this.listFilmQuery)
        res.status(200).send(result.rows);
    }
    async filterFilms(req, res, urt) { 
        return await this.pool.query(this.filterFilmQuery, [urt]);
    }
}

