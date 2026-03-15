
const express = require('express');
const genres_router = require('./routes/movies.route');
const homepage_router = require('./routes/homepage.route');
const morgan = require('morgan');
const auth = require('./middleware/Auth.middleware');

const port = process.env.PORT || 3002
const app = express();

app.use(auth);
app.use(express.json())
app.use(morgan('tiny'));
app.use('/',homepage_router);
app.use('/api/genres',genres_router);

app.listen(port,()=>{console.log(`App ruuning on port ${port}`)})
