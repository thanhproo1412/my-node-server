import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../models/User';

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email: string, password: string, done: (err: any, user?: any, info?: any) => void) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'No user with that email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Password incorrect' });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user: any, done: (err: any, id?: string) => void) => {
    done(null, user.id);
});

passport.deserializeUser((id: string, done: (err: any, user?: any) => void) => {
    User.findById(id, (err: any, user: any) => {
        done(err, user);
    });
});
