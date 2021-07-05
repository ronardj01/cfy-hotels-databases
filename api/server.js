const express = require('express');
const app = express();
const { Pool } = require('pg');

app.use(express.json());

//queries
const allHotels = 'select * from hotels h';
const newHotel = 'insert into hotels (name, rooms, postcode) values ($1, $2, $3)';

//connection settings
const pool = new Pool({
  user: 'migracode',
  host: 'localhost',
  database: 'cyf_hotels',
  password: '',
  port: 5432
});

//endpoints
app.get('/hotels', function (req, res) {
  pool.query(allHotels, (err, result) => {
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    return res.json(result.rows)
  })
});

app.post('/hotels', function (req, res) {
  const { name, rooms, postcode } = req.body;
  const values = [name, rooms, postcode];

  pool.query(newHotel, values, (err, result) => {
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    return res.send('Hotel created!!!')
  })
});

app.listen(3000, function () {
  console.log('Server is listening on port 3000')
});

