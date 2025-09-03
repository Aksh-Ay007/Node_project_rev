const express = require("express");
const {adminAuth, userAuth}=require('./middleware/auth.js')

const app = express();

//middleware

app.use("/admin", adminAuth);

//route handler

app.get("/admin/allData", (req, res) => {
  res.send("all the data");
});

app.delete('/admin/delete',(req,res)=>{

  res.send('delete successfully!')
})


app.get('/user',userAuth,(req,res)=>{

  res.send('hai user welcome backk')
})


app.delete("/user/delete",userAuth, (req, res) => {
  res.send("hey user delete successfully");
});

app.post('/user/login',(req,res)=>{

  res.send('u r login successfully')
})

app.listen(3000, () => {
  console.log("server is running");
});
