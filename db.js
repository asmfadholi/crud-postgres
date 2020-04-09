// const Pool = require('pg').Pool;

// const pool = new Pool({
//     user: '',
//     password: '',
//     host: 'localhost',
//     port: 5432,
//     database: 'perntodo'
// })

const { Client } = require('pg');

const pool = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: process.env.NODE === 'production',
    },
});

pool.connect()

module.exports = pool;