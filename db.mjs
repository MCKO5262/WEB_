import express from 'express';
import { city } from './routes/city.mjs';
import { login } from './routes/nevtrelt.mjs';
import { film } from './routes/film.mjs';
import { country } from './routes/country.mjs';
import { kino } from './routes/kino.mjs';
import { address } from './routes/address.mjs';

import swaggerDocs from './swagger.mjs';

const app = express()
app.use(express.json());
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/cities', (await city.get))

app.post('/api/cities', await city.post)

app.put('/api/cities', await city.put)

app.post('/api/login', await login.check)

app.get('/api/film', await film.list)
app.get('/api/film/:urt', await film.filter)

app.get('/api/country', await country.list);

//api/address?city_id=1&type=capital
app.get('/api/address', await address.list)
//api/kino?rating=G
app.get('/api/kino', await kino.filter);

// //localhost:3000/api/kanu/PG/6
// app.post('/api/kanu/:rating/:duration', await kanu.shuult)
// app.get('/api/filterfilm', await film.filterFilm)

app.listen(port, () => {
    swaggerDocs(app, port);
    console.log(`Listening on http://localhost:${port}`);
    console.log(`Documentation is on http://localhost:${port}/docs`);
})

