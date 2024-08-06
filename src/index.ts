import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoute';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'))

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET'],
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    next();
});

app.use('/api', productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});