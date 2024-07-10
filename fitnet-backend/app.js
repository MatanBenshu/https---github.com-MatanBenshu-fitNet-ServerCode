const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const app = express();

// Replace <username>, <password>, and <dbname> with your MongoDB Atlas credentials
const dbURI = 'mongodb+srv://matanbe7:fitNet2024@fitnet.qt2bqpe.mongodb.net/?retryWrites=true&w=majority&appName=fitNet';


mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));