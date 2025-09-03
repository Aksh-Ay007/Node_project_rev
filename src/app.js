const express = require("express");

const app = express();






app.get('/user',(req,res)=>{

try {
    throw new Error("fdsjnds");

    res.send("hai user welcome backk");
} catch (error) {

  res.status(402).send('got an eroor try catch cathc the error')

}
})


//error handler

// app.use('/',(err,req,res,next)=>{


//   if(err){
//     res.status(402).send("one error foud");
//   }
//   else{
//     next()
//   }
// })


app.listen(3000, () => {
  console.log("server is running");
});
