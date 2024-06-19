const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

const usersControler = require('./controlers/users')
const emailValidator = require('deep-email-validator');
const computersControler = require('./controlers/computers')
const port = 3004;
const users = []; //משתנה גלובלי מערך אובייקטים 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// async function connect() {
//   console.log("333333333333333333")
//   await mongoose.connect('mongodb://127.0.0.1:27017/test');
//   console.log("7777777777777777777")
// }
// connect().catch(moshe => console.log("moshe"));

try {
  mongoose.connect('mongodb://127.0.0.1:27017/test');
} 
catch (err) {
  console.error(err.message);
  process.exit(1);
}

const dbConnection = mongoose.connection; // הכנסת החיבור למסד הנתונים למשתנה
dbConnection.on("open", (_) => {
  console.log(`Database connected`); // הודעה שתודפס כאשר החיבור למסד הנתונים הצליח
});
dbConnection.on("error", (err) => {
  console.log(`Connection error: ${err}`); // הודעה שתודפס כאשר אירעה שגיאה במהלך החיבור למסד הנתונים
});

app.get("/", (req, res) => {
  res.send("requested /");
});

app.get("/good", (req, res) => {
  res.send("requested good");
});

app.get("/bad", (req, res) => {
  console.log("In /bad");
  res.send("requested bad");
});

app.post("/bad", (req, res) => {
  const str = JSON.stringify(req.body);
  console.log(`In post /computer ${JSON.stringify(req.body)}`);
  res.send(`requested computer on port ${JSON.stringify(port)}`);
});

// app.post("/cars", (req, res) => {
//   //רכבים
//   const str = JSON.stringify(req.body); //המרה מאובייקט לסטרינג
//   const mmo = (req.body.max + req.body.min) / 2; //פעולה חשבון של ממוצע
//   console.log(`avg ${mmo}`); //הדפסה
//   res.send(`the avg is ${mmo}`); //מחזיר תשובה ללקוח
// });

app.get("/car", (req, res) => {
  console.log("volvo");
  res.send("the name car:");
});
// מערך סיסמאות
// // app.post(`/usreCod`,(req, res) => {
// const name1 =  ["y","v","d","s","t","i","o","p","a","b"];
// const code1 =  ["1","2","3","4","5","6","7","8","9","0"];
// for(i=0; i<10; i++ )
// {
// if(req.body.code === code1[i] && req.body.name === name1[i])
// {
//   res.send('good1')
// }
// }
//   res.send('not good1')
// })
app.post('/login', (req, res) => {
  return usersControler.login(req, res)
});

app.post('/Register',(req,res)=>{
  return usersControler.register(req, res)
})
app.get('/computers', (req, res) => {
  return computersControler.get5HighRatedComputers(req, res)
});
app.post('/NewComputer', (req, res) => {
  return computersControler.newComputer(req, res)
});

// app.post(`/carPris`, (req, res) => {
//   //בדיקת רכב ומהירות
//   const spid = req.body.spid;
//   if (spid < 120) {
//     res.send("god");
//   }
//   console.log("volvo");
//   res.send("not god");
// });

app.listen(port, () => {
  console.log(`Hello ${port}`);
});