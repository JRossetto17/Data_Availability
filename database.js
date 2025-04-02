const mysql = require('mysql2');

//connection to databse, harcoded to local for simplicity.
// we will use a .env if deployed for security 
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'dev1'
}).promise();

async function getData() {
    const result = await pool.query("select * from test");

    return result;
}

async function createEntry(name, date, notes, color) {
    const result = await pool.query(
        'insert into test(name, created_date, notes, color) ' +
        'values (?, ? ,? ,?)', [name, date, notes, color]
    )

    return result;
}

const result =  getData();

console.log(result);

module.exports = { getData, createEntry };