const express = require('express');
const app = express();
const { Pool } = require('pg');
require('dotenv').config();

app.use(express.json());

//queries
const allHotels = 'select * from hotels h';
const retrieveHotelID = 'select * from hotels h where id = $1';
const newHotel = 'insert into hotels (name, rooms, postcode) values ($1, $2, $3)';
const retrieveHotelName = 'select * from hotels h where name = $1';
const retrieveCustomer = 'select * from customers c where name = $1';
const newCustomer = 'insert into customers (name, email, address, city, postcode, country) values ($1, $2, $3, $4, $5, $6)';
const orderedCustomers = 'select * from customers c order by name';
const retrieveCustomerID = 'select * from customers c where id = $1';

//connection settings
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

//endpoints
app.get('/hotels/:hotelID', function (req, res) {
  const hotelID = parseInt(req.params.hotelID);

  const invalidHotelID = !Number.isInteger(hotelID) || hotelID <= 0;

  if (invalidHotelID) {
    return res.send('HotelId must be a number larger than 0');
  }

  pool.query(retrieveHotelID, [hotelID], (err, result) => {
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    return res.json(result.rows);
  })
});

app.get('/hotels', function (req, res) {
  pool.query(allHotels, (err, result) => {
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    return res.json(result.rows)
  })
});

app.get('/customers/:customerID', function (req, res) {
  const customerId = parseInt(req.params.customerID);

  const invalidCustomerID = !Number.isInteger(customerId) || customerId <= 0;
  if (invalidCustomerID) {
    return res.status(400).send('CustomerID should be a positive integer')
  }
  !(async function () {
    try {
      const result = await pool.query(retrieveCustomerID, [customerId]);
      return res.json(result.rows);
    } catch (error) {
      console.error(error)
    }
  })();
});

app.get('/customers', function (req, res) {

  !(async function () {
    try {
      const result = await pool.query(orderedCustomers, []);
      return res.json(result.rows)
    } catch (error) {
      console.error(error)
    }
  })();
});

app.post('/hotels', function (req, res) {
  const { name, rooms, postcode } = req.body;
  const values = [name, rooms, postcode];

  const invalidRoomsNumber = !Number.isInteger(rooms) || rooms <= 0;

  if (invalidRoomsNumber) {
    return res.status(400).send('"The number of rooms should be a positive integer"')
  }
  !(async function () {
    try {
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
    } catch (error) {
      console.error(error)
    }
  })();
});

app.post('/customers', function (req, res) {
  const { name, email, address, city, postcode, country } = req.body;
  const values = [name, email, address, city, postcode, country];

  !(async function () {
    try {
      const client = await pool.connect();
      let result = await client.query(retrieveCustomer, [name]);

      if (result.rowCount > 0) {
        client.release();
        return res.status(400).send('A customer with the same name already exists!');
      } else {
        result = await client.query(newCustomer, values);
        client.release();
        return res.send('Customer Created!')
      }

    } catch (error) {
      console.error(error)
    }
  })();
});

app.listen(3000, function () {
  console.log('Server is listening on port 3000')
});

