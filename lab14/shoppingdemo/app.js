const express = require('express');
const cors = require('cors');

const productRouter = require('./routes/productRouter');

const app = express();

app.use(cors());

app.use(express.json()); //req.body = {...}

app.use('/products', productRouter);


app.listen(3000, () => console.log('listen on 3000'));