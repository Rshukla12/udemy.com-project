const mongoose = require("mongoose");

const CONNECTION_URL = process.env.MONGO;
const PORT = process.env.PORT|| 5000;

const connect = () => {
    return mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
}

module.exports = connect;