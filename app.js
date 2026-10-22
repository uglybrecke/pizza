// Import the express module
import express from 'express';

//create an instance of an
//express application
const app = express();

//define a port number
//for our server to listen on
const PORT = 3000;

//create array to store orders
const orders = [];

//enable static file serving (from a folder called public)
app.use(express.static('public'));

//allow the app to parse form data
//access form data throuh req.nody
app.use(express.urlencoded({ extended: true }));

//define a default route ("/") <-------------this is where you define the homepage
app.get('/', (req, res) => {
    //res.send('Welcome to Thatza Pizza');
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

//add a contact route to displays a CONTACT view page
app.get('/contact', (req, res) => {
    //send this file
    res.sendFile(`${import.meta.dirname}/views/contact.html`);
})

//add a contact route to displays a CONFIRM view page
app.get('/confirm-order', (req, res) => {
    //send this file
    res.sendFile(`${import.meta.dirname}/views/confirm.html`);
})

//add a contact route to displays a MENU view page
app.get('/menu', (req, res) => {
    //send this file
    res.sendFile(`${import.meta.dirname}/views/menu.html`);
})

//add a route to to process the pizza order POST POST POST
app.post('/submit-order', (req, res) => {

    //send this file
    //create a json object to store order data
    const order = req.body;
    order['timestamp'] = new Date();
    console.log(order);

    orders.push(order);
    console.log(orders);

    //display confirmation page
    res.sendFile(`${import.meta.dirname}/views/confirm.html`);
})

//add an ADMIN route route
app.get('/admin', (req, res) => {
    //send this file
    res.send(orders);
})

//start the server on the designated port
app.listen(PORT, () => {
    console.log(`Server is running at
        http://localhost:${PORT}`);
});

