const express = require('express');
const app = express();
const { Pool } = require('pg');

//queries
const allHotels = 'select * from hotels h';

//connection settings
const pool = new Pool({
  user: 'migracode',
  host: 'localhost',
  database: 'cyf_hotels',
  password: '',
  port: 5432
});

app.get('/hotels', function (req, res) {
  pool.query(allHotels, (err, result) => {
    if(err) {
      return console.error('Error executing query', err.stack)
    }
    return res.json(result.rows)
  })
});

app.listen(3000, function() {
  console.log('Server is listening on port 3000')
});

