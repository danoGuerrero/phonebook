const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 8080;

app.listen(PORT, () =>{
    console.log(`Server is running on PORT ${PORT}`)
});

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
        useUnifiedTopology: true,
}).then(() => {
    console.log('Database connected')
});