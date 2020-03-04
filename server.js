const express = require('express');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex=require('knex');

const postgres=knex({
    client: 'pg',
    connection: {
      host : 'smartbrain.cedooml21cmy.ap-south-1.rds.amazonaws.com',
      user : 'postgres',
      password : 'anand9911',
      database:null
    }
  });

  console.log(postgres.select('*').from('users').then(data=>{
      console.log(data)
  }))


const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'jhon',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database)
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json(database.users[0]);
        // res.json('success');
    }
    else {
        res.status(400).json('Error logging in');
    }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    bcrypt.hash(password, null, null, function (err, hash) {
        console.log(hash);
    });

    database.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(404).json('user not found')
    }
})

app.put('/image', (req, res) => {

    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(404).json('user not found')
    }

})



// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function (err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function (err, res) {
//     // res = false
// });



app.listen(3001, () => {
    console.log('app is running on port 3001')
})



/*
IDEA OF WHAT WE ARE CREATING
/--> res --> working
/signin --> POST=success/fail
/register --> POST=user
/profile/:userId--> GET= user
/image--> PUT--> userCount

*/