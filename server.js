import express from 'express'
import coinsRouter from './routes/coinsRouter.js'

const app = express();
const PORT = 8080;

//middleware
app.use(express.json());

//routes
app.use('/', coinsRouter);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
