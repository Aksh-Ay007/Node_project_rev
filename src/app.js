const express = require("express");

const app = express();


app.use("/abc",(req,res)=>{

  res.send('iam abcccc')
})

app.use("/test", (req, res) => {
  res.send("hello from node revison");
});

app.listen(3000, () => {
  console.log("server is running");
});
