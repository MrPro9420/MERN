const express = require('express');
const debug = require('./debugger');
const genres = require('./routes/genres.route')
const home = require('./routes/home.route')
const morgan = require('morgan');
const customer = require('./routes/customer.route')
require('./connectDb');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
console.log(app.get('env'))
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
}

app.use('/', home);
app.use('/api/genres', genres)
app.use('/api/customer', customer)




app.listen(port, () => {
    debug(`Server is running on port ${port}`)
});