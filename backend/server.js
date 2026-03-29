const app = require("./app");
const connectDB = require("./config/db");
const { initCronJobs } = require("./utils/cronJobs");
require('dotenv').config();

// middlewares
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const healthRoutes = require('./routes/healthRoutes');

connectDB();
initCronJobs();

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(bodyParser.json());

// auth & session
app.use(session({
  secret: process.env.COOKIE_KEY,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

//  routes 
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/reportRoutes'));
app.use('/api/aqi-insights', require('./routes/geminiRoutes'));
app.use('/api/health', healthRoutes); 

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));