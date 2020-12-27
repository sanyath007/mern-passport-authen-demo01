import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import cors from 'cors';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt, { hash } from 'bcryptjs';
import dotenv from 'dotenv';
import User from './User';
import { IUser } from './Interfaces/IUser';
import { userInfo } from 'os';

const LocalStrategy = passportLocal.Strategy;

mongoose.connect('mongodb://127.0.0.1:27017/test', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err: Error) => {
    if (err) throw err;
    console.log("Connected to mongodb");    
});

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors({ origin: "http:localhost:3000", credentials: true }));
app.use(session({ secret: "supersecret", resave: true, saveUninitialized: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

//PASSPORT
passport.use(new LocalStrategy((email, password, done) => {
    User.findOne({ email }, (err, user: any) => {
        if (err) throw err;
        if(!user) return done(null, false);

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;

            if (result === true) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    });
}));

passport.serializeUser((user: any, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id: string, cb) => {
    User.findOne({ _id: id }, (err, user: any) => {
        const userInformation = {
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        };

        cb(err, userInformation)
    });
});

// ROUTES
app.post('/register', async (req: Request, res: Response) => {
    const { name, email, password } = req?.body;

    if (!name || !email || !password || typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
        res.send("Improper values");
        return;
    }

    User.findOne({ email }, async (err: Error, doc: IUser) => {
        if (err) throw err;
        if (doc) res.send("User already exists");

        if(!doc) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new User({
                name: name,
                email: email,
                password: hashedPassword
            });
            await newUser.save();
            res.send("Success");
        }
    });
});

app.post('/login', passport.authenticate("local"), (req, res) => {
    res.send("Successfully authenticated")
});

app.get('/user', async (req, res) => {
    const user = await User.find();
    res.send(user)
})

app.listen(4000, () => console.log("Server started..."));
