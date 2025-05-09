const mysql = require('mysql2');

// Master connection (for write operations)
const masterPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'dev3',
    port: '3306'
}).promise();

// Slave connection (for read operations)
const slavePool = mysql.createPool({
    host: 'localhost', // You can set to a different IP if needed
    user: 'root',
    password: 'pass',
    database: 'dev3',
    port: '3307' // Assuming your slave is running on port 3307
}).promise();

// READ from slave
async function getData() {
    const [rows] = await slavePool.query('SELECT * FROM test');

    console.log(rows);
    return rows || [];
}

async function getEntry(id) {
    const [rows] = await slavePool.query('SELECT * FROM test WHERE id = ?', [id]);
    return rows[0] || null;
}

// WRITE to master
async function createEntry(name, age, country) {
    const [result] = await masterPool.query(
        'INSERT INTO test(Name, Age, Country) VALUES (?, ?, ?)',
        [name, age, country]
    );
    return result;
}

async function updateEntry(id, name, age, country) {
    const [result] = await masterPool.query(
        'UPDATE test SET Name = ?, Age = ?, Country = ? WHERE ID = ?',
        [name, age, country, id]
    );
    return result;
}

async function removeEntry(id) {
    const [result] = await masterPool.query(
        'DELETE FROM test WHERE ID = ?',
        [id]
    );
    return result;
}

// Optional: test the connection
getData().then(result => console.log("Slave data sample:", result.slice(0, 1)));

module.exports = {
    getData,
    getEntry,
    createEntry,
    updateEntry,
    removeEntry
};
