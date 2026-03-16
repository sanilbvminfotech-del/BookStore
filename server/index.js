require('dotenv').config();
require('./config/dbConnect');
const express = require('express');
const router = require('./router');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT;

app.use(cookieParser());
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use('/image', express.static('public'));


app.use('/api', router);

app.listen(port, () => {
    console.log('server is running on port :', port)
});