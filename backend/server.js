const app = require('./app');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');
const morgan = require('morgan');
app.use(morgan('dev'));
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express server is running: http://localhost:${PORT}`);
});

app.use(errorHandler);






























// require('dotenv').config();
// const express = require('express');
// const app = express();
// const cors = require('cors');

// const corsOptions = {
//   origin: process.env.NODE_ENV === 'production' 
//     ? 'https://myapp.com' 
//     : 'http://localhost:5173',
//   credentials: true
// };

// app.use(cors(corsOptions));

// const taskRoutes = require('./routes/taskRoutes');
// const authRoutes = require('./routes/authRoutes');
// const swaggerUi = require('swagger-ui-express');
// const swaggerSpec = require('./swagger');
// const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected successfully'))
//   .catch((err) => console.error('MongoDB connection error:', err));
// app.use(express.json());

// const helmet = require('helmet');
// app.use(helmet());

// const rateLimit = require('express-rate-limit');

// const loginLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5, // max 5 attempts
//   message: { message: 'Too many login attempts, please try again after 15 minutes' }
// });

// app.use('/api/v1/auth/login', loginLimiter);

// const { body, validationResult } = require('express-validator');

// exports.registerValidation = [
//   body('name').trim().notEmpty().withMessage('Name is required'),
//   body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
//   body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
// ];

// exports.validate = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   next();
// };

// app.use((req, res, next) => {
//   console.log(`${req.method} request received: ${req.url}`);
//   next();
// });

// app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.get('/', (req, res) => {
//   res.send('Home Page — From Express!');
// });

// app.get('/about', (req, res) => {
//   res.status(200).json({ name: 'Muzzamil', role: 'MERN Intern' });
// });

// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/tasks', taskRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Express server is running: http://localhost:${PORT}`);
// });