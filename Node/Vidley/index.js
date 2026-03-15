const express = require('express');
const debug = require('./debugger');
const genres = require('./routes/genres.route')
const home = require('./routes/home.route')
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
}

app.use('/',home);
app.use('/api/genres',genres)



app.listen(port,()=>{
    debug(`Server is running on port ${port}`)
});