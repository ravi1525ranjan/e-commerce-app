const express = require('express')
const dbConnection = require('./db/connection')
const CORS = require('cors')
const app = express()
const PORT = 3000

const userRoutes = require('./routes/user-auth')
const categoryRoutes = require('./routes/category')
const brandRoutes = require('./routes/brand')
const productRoutes = require('./routes/product')
const customerRoutes = require('./routes/customer')

// Middleware
app.use(CORS())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Routes
app.use('/api/user', userRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/brands', brandRoutes)
app.use('/api/products', productRoutes)
app.use('/api/customer', customerRoutes)


//DB Connection
dbConnection.connectionDb()

app.listen(PORT,()=>{
    console.log(`server is running on port : ${PORT}`)
})