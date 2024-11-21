import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import eventRoutes from './routes/eventRoutes';
import blogRoutes from './routes/blogRoutes';
import calendarRoutes from './routes/calendarRoutes';
import adminRoutes from './routes/adminRoutes';

dotenv.config();

const app = express();

connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/events', eventRoutes);
app.use('/blogs', blogRoutes);
app.use('/calendar', calendarRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
