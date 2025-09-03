const express = require("express");

const app = express();

//middleware

app.use('/admin',(req,res,next)=>{

  console.log('admin auth checking middleware active');

  const token='abcs'

  const isAdmin=token==='abc'

  if (!isAdmin) {
    res.status(401).send("you are not authorized");
  }
else{
  next()
}
})

//route handler

app.get("/admin/allData", (req, res) => {
  res.send("all the data");
});

app.delete('/admin/delete',(req,res)=>{

  res.send('delete successfully!')
})

app.listen(3000, () => {
  console.log("server is running");
});
