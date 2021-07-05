const express = require('express');
const app = express();
const { Pool } = require('pg');

app.use(express.json());

//queries
const allHotels = 'select * from hotels h';
const newHotel = 'insert into hotels (name, rooms, postcode) values ($1, $2, $3)';
const retrieveHotelName = 'select * from hotels h where name = $1'

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

  const invalidRoomsNumber = !Number.isInteger(rooms) || rooms <= 0;

  if (invalidRoomsNumber) {
    return res.status(400).send('"The number of rooms should be a positive integer"')
  }
  !(async function () {
    const client = await pool.connect();
    let result = await client.query(retrieveHotelName, [name]);

    if (result.rowCount > 0) {
      client.release();
      return res.status(400).send('An hotel with the same name already exists!');
    } else {
      result = await client.query(newHotel, values);
      client.release();
      return res.send('Hotel Created!');
    }
  })();
});

app.listen(3000, function () {
  console.log('Server is listening on port 3000')
});

