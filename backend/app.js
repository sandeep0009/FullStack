import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dataBase from './db.js';
import route from './router/Route.js';
import session from "express-session";


dotenv.config();

const app = express();

app.use(cors({credentials:true,origin:'http://localhost:5173'}));
app.use(express.json()); 


app.use(
  session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      httpOnly: true,
      path: '/',
      maxAge: 24 * 60 * 60 * 1000, // Set the expiration time to 24 hours (in milliseconds)
    },
  })
);



dataBase();

app.use('/api', route); 




app.listen(process.env.PORT, () => {
    console.log('Server connected on port:', process.env.PORT);
});
