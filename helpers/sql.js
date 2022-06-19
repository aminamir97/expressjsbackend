// const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: "ycbzsvfglooolt",
//   host: "ec2-54-147-33-38.compute-1.amazonaws.com",
//   database: "d5go8a4fo28pbk",
//   password: "ef96d9dbe78d3ad72f861f149f92922a75a8e79fda3ec1134cd70f2ffb58c390",
//   port: 5432,
// });
// module.exports = pool;

// const { Client } = require("pg");
// const client = new Client({
//   connectionString:
//     "postgres://ycbzsvfglooolt:ef96d9dbe78d3ad72f861f149f92922a75a8e79fda3ec1134cd70f2ffb58c390@ec2-54-147-33-38.compute-1.amazonaws.com:5432/d5go8a4fo28pbk",
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });
// if (!client) client.connect();

const pg = require("pg");
const client = new pg.Client({
  connectionString:
    "postgres://ycbzsvfglooolt:ef96d9dbe78d3ad72f861f149f92922a75a8e79fda3ec1134cd70f2ffb58c390@ec2-54-147-33-38.compute-1.amazonaws.com:5432/d5go8a4fo28pbk",
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

module.exports = client;
