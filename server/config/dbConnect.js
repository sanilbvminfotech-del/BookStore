const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sanilbvminfotech_db_user:I75TOUjJLk6TgCJL@cluster0.c54cugl.mongodb.net/bookStore').then(() => {
    console.log('mongoDB is connected');
}).catch((error) => {
    console.log(error)
});