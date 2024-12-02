require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cookieParser = require('cookie-parser');

let cors = require("cors");
// app.use(cors());

app.use(cors({
  origin: 'https://yop-deployment-frontend.onrender.com',  // 允许前端域名
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 允许的请求方法
  allowedHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
  credentials: true  // 允许发送认证信息（cookies, authorization headers）
}));

app.use(express.json());

app.use(cookieParser());
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(error =>{
    console.log('Error connecting to MongoDB', error.message);
});

const userRoutes = require('./routes/userRoutes');
const journeyRoutes = require('./routes/journeyRoutes');
const journeyDetailRoutes = require('./routes/journeyDetailRoutes');

app.use('/users', userRoutes);
app.use('/journeys', journeyRoutes);
app.use('/details', journeyDetailRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to the YOP API.');

});
app.use(express.json());
const customHeadersAppLevel = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://yop-deployment-frontend.onrender.com');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.sendStatus(204);
  }
  next();
};
app.all('*', customHeadersAppLevel);
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});



