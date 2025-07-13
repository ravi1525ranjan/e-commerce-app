const mongoose = require('mongoose')
const connectionDb = async () =>{
    await mongoose.connect('mongodb://localhost:27017/e-comm-store').then(() => {
        console.log('Database connected successfully');
    }).catch((err) => {
        console.error('Database connection failed:', err);
    });
}
module.exports = { connectionDb }