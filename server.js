const express = require('express');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex=require('knex');

const register=require('./controllers/register');
const signin=require('./controllers/signin');
const image=require('./controllers/image');
const profile=require('./controllers/profile');

const db=knex({
    client: 'pg',
    connection: {
      host : 'smartbrain.cedooml21cmy.ap-south-1.rds.amazonaws.com',
      user : 'postgres',
      password : 'anand9911',
      database:'smartbrain'
    }
  });
  
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send('Its working Good Job')})

app.post('/signin', (req,res)=>{signin.handleSignin(req,res,db,bcrypt)})

app.post('/register', (req,res)=>{register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id', (req,res)=>{profile.handleImage(req,res,db)})

app.put('/image', (req,res)=>{image.handleImage(req,res,db)})

app.post('/imageUrl', (req,res)=>{image.handleApiCall(req,res,db)})

app.listen(process.env.PORT || 3001, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})



/*
IDEA OF WHAT WE ARE CREATING
/--> res --> working
/signin --> POST=success/fail
/register --> POST=user
/profile/:userId--> GET= user
/image--> PUT--> userCount

*/