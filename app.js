// Import the express module
import express from 'express';

// Import the mysql2 module
// mysql2 allows Node.js to communicate with a MySQL database
import mysql2 from 'mysql2';

//import our dotenv file
import dotenv from 'dotenv';
dotenv.config();

/* ==================== DATABASE CONNECTION POOL ====================


 * Create a CONNECTION POOL to the database
 * A "pool" is like a bucket of ready-to-use database connections.
 * Instead of creating a new connection every time we need to talk
 * to the database (which is slow), we create several connections
 * upfront and reuse them. This makes our app much faster.
 * 
 * .promise() converts the pool to use modern JavaScript Promises
 * This allows us to use 'async/await' syntax which simplifies our code.
 */


const pool = mysql2.createPool({
    host: process.env.DB_HOST,       	// Your Digital Ocean IP
    user: process.env.DB_USER,          // MySQL username
    password: process.env.DB_PASSWORD, 	// MySQL password from readme.txt
    database: process.env.DB_NAME,      // Database name
    port: process.env.DB_PORT           // MySQL port (default is 3306)
}).promise();


//create an instance of an
//express application
const app = express();

//define a port number
//for our server to listen on
const PORT = 3000;

//create array to store orders
const orders = [];

// Database test - http://localhost:3000/db-test to test this route
app.get('/db-test', async(req,res) => {
    /* 
     * 'async' tells JavaScript that this function will do asynchronous work
     * Asynchronous means "it takes time to complete" (like waiting for
     * database). By marking it 'async', we can use 'await' inside it
     * 
     * 'await' keyword means "pause here and wait for the database to respond"
     * pool.query() returns a Promise ("I'll get back to you!")
     * 'await' waits for the Promise to complete before moving on
     * 
     * pool.query() returns an ARRAY with 2 items:
     *   [0] = the actual data rows from the database
     *   [1] = metadata about the query (field names, types, etc.)
     * So 'orders[0]' contains just the data rows, like:
     * [ {id: 1, customer: 'John', pizza: 'Pepperoni'}, 
     *   {id: 2, customer: 'Jane', pizza: 'Veggie'} ]
     */

    // try/catch block for error handling
    try {
        const orders = await pool.query('SELECT * FROM orders');
        // Send the orders data back to the browser as JSON
        res.send(orders[0]);
    } catch(err) {
        // If ANY error happened in the 'try' block, this code runs
        // Log the error to the server console (for developers to see)
        console.error('Database error:', err);


        // Send an error response to the browser
        // status(500) means "Internal Server Error"
        res.status(500).send('Database error: ' + err.message);
    }
});

//enable static file serving (from a folder called public)
app.use(express.static('public'));

//allow the app to parse form data
//access form data throuh req.nody
app.use(express.urlencoded({ extended: true }));

// set view engine to EJS
app.set('view engine', 'ejs');

//define a default route ("/") <-------------this is where you define the homepage
app.get('/', (req, res) => {
    //res.send('Welcome to Thatza Pizza');
    res.render('home'); // <--- npm install ejs lets us adjust home to .ejs and then change from /res.sendFile(`$etcetc)
});

//add a contact route to displays a CONTACT view page
app.get('/contact', (req, res) => {
    //send this file
    res.render(`contact`);
})

//add a contact route to displays a CONFIRM view page
app.get('/confirm-order', (req, res) => {
    //send this file
    res.render(`confirm`);
})

//add a contact route to displays a MENU view page
app.get('/menu', (req, res) => {
    //send this file
    res.render(`menu`);
})

//add a route to to process the pizza order POST POST POST
app.post('/submit-order', async(req, res) => {

    //send this file
    //create a json object to store order data
    const order = req.body;

    //old code
    // order['timestamp'] = new Date();

    console.log(order);

    //define an SQL query to INSERT new order
    const sql = `INSERT INTO orders (fname, lname, email, size, method, toppings, comment) VALUES(?,?,?,?,?,?,?)`;

    //create an array of parameters froim order data
    const params = [
        order.fname,
        order.lname,
        order.email,
        order.size,
        order.method,
        order.toppings,
        order.comment
    ];

    //execute the query
    const [result] = await pool.execute(sql, params);

    //old code
    // orders.push(order);
    // console.log(orders);

    //display confirmation page
    res.render(`confirm`, { order }); //adding the ORDER object to the data on the confirm page
})

//add an ADMIN route route
app.get('/admin', async(req, res) => {
    //send this file
    // try/catch block for error handling
    try {
        const orders = await pool.query('SELECT * FROM orders');
        // Send the orders data back to the browser as JSON
        // res.send(orders[0]);
        res.render(`admin`, { orders:orders[0] } );
    } catch(err) {
        // If ANY error happened in the 'try' block, this code runs
        // Log the error to the server console (for developers to see)
        console.error('Database error:', err);
        // Send an error response to the browser
        // status(500) means "Internal Server Error"
        res.status(500).send('Database error: ' + err.message);
    }
})

//start the server on the designated port
app.listen(PORT, () => {
    console.log(`Server is running at
        http://localhost:${PORT}`);
});

