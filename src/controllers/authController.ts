import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import User from '../models/User';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('auth/register', { errors, name, email, password, password2 });
  } else {
    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        errors.push({ msg: 'Email already exists' });
        res.render('auth/register', { errors, name, email, password, password2 });
      } else {
        const newUser = new User({ name, email, password });
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        await newUser.save();
        res.redirect('/auth/login');
      }
    } catch (error) {
      console.error(error);
      res.render('auth/register', { errors: [{ msg: 'Error registering user' }] });
    }
  }
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/login',
    failureFlash: true,
  })(req, res, next);
};

export const logout = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ msg: 'Failed to log out' });
    res.redirect('/auth/login');
  });
};
