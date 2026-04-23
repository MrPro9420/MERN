const mongoose = require("mongoose");
const connection = mongoose.connect(process.env.MONGO_DB_URL).then(() => {
    console.log("Connected to db")
}).catch((err) => {
    console.log(err.message)
})

module.exports = connection;