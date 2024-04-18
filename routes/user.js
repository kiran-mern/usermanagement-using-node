// var express = require("express");
// var router = express.Router();
// var session = require("express-session");
// var User = require("../Models/mongodb");
// var products = require("../Models/products");
// const { userLogin, userRegister } = require('../middleware/userAuth');


// router.get('/',function(req,res){
//     if(req.session.loggedIn){
//         res.redirect('/home')
//     }else{
//         res.render('login')
//     }
// });


// router.get('/home',async(req,res)=>{
//     if(req.session.loggedIn){
//         const data=await products.find({})

//         res.render('home',{items:data})

//     }else{
//         res.redirect('/')
//     }
    
// })

// //core login

// router.post('/signin',userLogin, (req,res)=>{
//     try{
//         req.session.user=req.user;
//         req.session.admin=req.admin;
//         req.session.loggedIn=true;
//         if(req.session.user){
//             res.redirect('/home')
//             console.log('user logged');
//         }else if(req.session.admin){
//             res.redirect('/admin')
//         }
//       }catch(err){
//         console.log(err);
//       }
   
    
// });

// router.get('/signup',(req,res)=>{
//     res.render('signup')

// })

// //register

// router.post('/register',userRegister,async (req,res)=>{
//     // try{
//     //     req.session.user=req.user;
//     //     req.session.admin=req.admin;
//     //     req.session.loggedIn=true;
//     // }catch(err){
//     //     console.log(err);

//     // }
//     try {
//         const name = req.body.name;
//         const email = req.body.email;
//         const password = req.body.password;
//         const gender = req.body.gender;
//         await User.create({ name, email, password, gender });
//         req.session.user = req.body;
//         req.session.loggedIn = true;
//         res.redirect('/home');
//       } catch (error) {
//         console.log(error);
//         res.render("signup", { invalid: "invalid" });
//       }
// })

// //logout destroy

// router.get('/signout',(req,res)=>{
//     req.session.destroy();
//     res.redirect('/')
// })

// module.exports=router;