const express = require("express");

const app = express();




app.get("/user",(req,res)=>{

  res.send({firstName:"akki",lastName:"jyothi"})
})

app.post("/user",(req,res)=>{

  console.log('save data to databasse');

  res.send('data sucesfully saved')
})

app.delete("/user",(req,res)=>{

  res.send('delete sucesfully')
})


app.use("/test", (req, res) => {
  res.send("hello from node revison");
});





app.listen(3000, () => {
  console.log("server is running");
});
