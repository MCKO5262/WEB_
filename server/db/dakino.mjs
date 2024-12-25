export default class DaKino {
    constructor(pool) {
        this.pool = pool;
        this.filterByRatingStr = "SELECT * FROM public.film WHERE rating = $1 and rental_duration=$2 ORDER BY film_id ASC "
    }
    async filterKino(rating, duration) { 
        return this
            .pool
            .query(
                this
                    .filterByRatingStr,
                [rating, duration]);
    }
}
