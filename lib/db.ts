import mysql from 'mysql2/promise'

// Using connection pool instead of single connection
// to improve performance by reusing connections and handling concurrent queries efficiently
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

export default db