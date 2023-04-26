const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const userRouter = require('./routes/userRouter');
app.use('/users', userRouter);

const cartRouter = require('./routes/cartRouter');
app.use('/carts', cartRouter);

const productRouter = require('./routes/productRouter');
app.use('/products', productRouter);

app.listen(3000, () => console.log('Server is running on port 3000'));
