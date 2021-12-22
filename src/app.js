const express=require('express');
const app=express();
const path=require("path");
const hbs =require("hbs"); 
const bodyparser=require('body-parser'); // for partials
const port= process.env.PORT || 4000;   //process.env.PORT this means if we want to run our program then it  will run in thie port otherwise in localhost run in  7000
// mongoose.set('useFindAndModify', false);
// require("./db/conn"); 
require("./db/conn")
const Input=require("../src/modles/register");
// const Input=require("./");

const { assert } = require('console');
// console.log(path.join(__dirname,"../public"));
const views_path=path.join(__dirname,"../template/views")
const partial_path=path.join(__dirname,"../templates/partials")
app.use( express.json());  //telling that we want our data in json form it will give in post app but for localhost 
app.use(express.urlencoded({extended:false}));  //you have to write this and after this your data base ia also connected
app.set("view engine","hbs");
app.set("views", views_path);
app.use(bodyparser.urlencoded({extended:true}));
hbs.registerPartials(partial_path); //In order to use a partial, it must be registered via Handlebars.registerPartial.
app.use(express.static('public'));
app.get("/",(req,res)=>{
   res.render("index.hbs");
})
app.get("/register",(req,res)=>{
    res.render("register.hbs");
})
app.get("/login",(req,res)=>{
    res.render("login.hbs")
})
app.post("/register",async(req,res)=>{
   try{
    const adding=new Input({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    console.log(adding);
    const register=await adding.save();
    res.render("index");
    console.log("register successfully");
}catch(error){
res.status(400).send(error);
   }
});
app.post("/login",(req,res)=>{
  let usremail =req.body.email;
  let usrpassword=req.body.password;
  Input.findOne({email:usremail},(err,doc)=>{
      if(err){
          console.log(err);
      }else{
          if(doc.password==usrpassword){
             
              res.render("index.hbs")
              console.log("login successfully");
          }else{
              console.log("enter correct password");
             
          }
      }
  }) 
})
app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});