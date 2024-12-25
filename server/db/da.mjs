import pg from 'pg'
import DaCity from './dacity.mjs'
import DaLogin from './dalogin.mjs';
import DaFilm from './dafilm.mjs';
import DaCountry from './dacountry.mjs';
import DaKino from './dakino.mjs';
import DaAddress from './daaddress.mjs';

const pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'Sodoo',
    database: 'test'
});

export default pool;
const daCity = new DaCity(pool);
const daLogin = new DaLogin(pool);
const daFilm = new DaFilm(pool);
const daCountry = new DaCountry(pool);
const daKino = new DaKino(pool);
const daAddress = new DaAddress(pool);
export { daCity, daLogin, daFilm, daCountry, daKino, daAddress}
