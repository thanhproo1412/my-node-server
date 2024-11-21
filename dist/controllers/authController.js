"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const passport_1 = __importDefault(require("passport"));
const User_1 = __importDefault(require("../models/User"));
const register = async (req, res) => {
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
    }
    else {
        try {
            const userExists = await User_1.default.findOne({ email });
            if (userExists) {
                errors.push({ msg: 'Email already exists' });
                res.render('auth/register', { errors, name, email, password, password2 });
            }
            else {
                const newUser = new User_1.default({ name, email, password });
                const salt = await bcryptjs_1.default.genSalt(10);
                newUser.password = await bcryptjs_1.default.hash(newUser.password, salt);
                await newUser.save();
                res.redirect('/auth/login');
            }
        }
        catch (error) {
            console.error(error);
            res.render('auth/register', { errors: [{ msg: 'Error registering user' }] });
        }
    }
};
exports.register = register;
const login = (req, res, next) => {
    passport_1.default.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/auth/login',
        failureFlash: true,
    })(req, res, next);
};
exports.login = login;
const logout = (req, res) => {
    req.logout((err) => {
        if (err)
            return res.status(500).json({ msg: 'Failed to log out' });
        res.redirect('/auth/login');
    });
};
exports.logout = logout;
