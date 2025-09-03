const express = require("express");

const app = express();




//route handler


app.use('/user',[(req,res,next)=>{

  console.log('iam first');
  next()
},

(req,res,next)=>{

  console.log('second');
  next()
}],
(req,res,next)=>{

  console.log('3rd');

  next()
},

(req,res,next)=>{

  console.log('4th rsponse');

  next()
},

(req,res,next)=>{

  console.log('5 th response');
  res.send('iam 5 the one😌')

}



)

app.listen(3000, () => {
  console.log("server is running");
});
