const mongoose = require('mongoose');

let connectedInstance = null;

const dbConnect = async () => {

    try {

        if (connectedInstance) {
            console.log('connection already exists');
            return connectedInstance;
        }

        const connect = await mongoose.connect(process.env.MONGO_URI);

        if (connect) {
            console.log('connection to mongoDB successful');
            connectedInstance = connect;
            return connectedInstance;
        }

    } catch (error) {

        console.log(error);

    }

}

module.exports = { dbConnect };