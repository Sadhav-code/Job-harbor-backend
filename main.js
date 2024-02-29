import mongoose from "mongoose";
import express from 'express';
import cors from 'cors';
import { User } from './model/register.js'
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
let a = await mongoose.connect('mongodb://localhost:27017/JobHarborDB')
console.log("DB Connected")
const port = 3000

// app.post('/Login', (req, res) => {
//   // res.send('My API')
//   const {email,password}= req.body;
//   console.log(req.body)
//   User.findOne({email: email},(err,user)=>{
//     if(user){
//       if(password===user.password){
//         res.send({masssage:"Login Successfull",user:user})
//       }
//       else{
//         res.send({massage:"Password did't match"})
//       }
//     }else{
//       res.send({massage:"User not registered"})
//     }
//   })

// })
app.post('/Login', async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);

  try {

    const user = await User.findOne({ Email: email });

    if (user) {

      if (password === user.Password) { 
        res.send({ message: "Login Successful", user: user });
        console.log("Login Successful")
      } else {
        res.send({ message: "Password doesn't match" });
        console.log("Password doesn't match")
      }
    } else {
      res.send({ message: "User not registered" });
      console.log("User not registered")
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send({ message: "An error occurred while logging in" });
  }
});


app.post('/register', async (req, res) => {

  const { fname, lname, email, dob, tel, profession, cneu, password } = req.body;

  try {
    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ Email: email });

    if (existingUser) {
      console.log("User already registered")
      return res.status(400).send({ message: "User already registered" });
    }

    const newUser = new User({
      Fname: fname,
      Lname: lname,
      Email: email,
      Dob: dob,
      phoneNo: tel,
      profession: profession,
      CompanyOrInsitiute: cneu,
      Password: password,
      admin: 0
    });

    // Save the new user to the database
    await newUser.save();
    console.log("Registered");
    return res.status(200).send({ message: "Successfully registered"});
  } catch (error) {

    console.error("Error registering user:", error);
    return res.status(500).send({ message: "Failed to register user" });
  }
});


app.listen(port, () => {
  console.log(`Job Harbor app listening on port ${port}`)
}) 