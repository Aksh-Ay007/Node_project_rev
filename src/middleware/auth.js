

  const adminAuth=(req,res,next)=>{

  let token='xyz'

  let isAdmin=token==='xyz'

  if(!isAdmin){

    res.status(401).send('boss u r not authorized bt luck')
  }

  else{

    next()
  }
}


const userAuth=(req,res,next)=>{


  let token='abc'

  const isUser=token==='abc'

  if (!isUser) {
    res.status(401).send("you are nota user goooo");
  } else {
    next();
  }
}


module.exports={adminAuth,userAuth}
