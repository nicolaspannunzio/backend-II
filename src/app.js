import express from 'express';
import productRoutes from './routes/products.router.js'; 
import cartRoutes from './routes/carts.router.js'; 
import { __dirname } from './utils.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(__dirname + 'public'));
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.listen(8080, () => {
    console.log("server ready on port 8080")
}) 
