const express = require('express')

const routes = express.Router();
const user = [{
    id: 1,
    name:'favan',
    email:"pifavan@gmail.com",
    password:"12345"
      
}];

routes.post('/login',(req,res)=>{
    const {email,password} = req.body;

    const users = user.find(user => user.email == email &&  user.password == password);
    if(users){
       return res.status(200).json(user);
    }
    return res.status(401).json('Invalid Email or Password');
});

module.exports = routes;