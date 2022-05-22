const mongoose = require('mongoose')

const DBConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('database connected');

    } catch (error) {
        console.log("could not connect");
    }
};

DBConnect();
