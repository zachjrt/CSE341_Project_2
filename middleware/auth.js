const isLoggedIn = (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.status(401).send('<body style="background: linear-gradient(0deg, rgb(84, 80, 211) 0%, rgb(2, 35, 58) 100%);"><div style="text-align:center;font-size:24pt;font-family:sans-serif; background-color:white; width: 40%; margin:auto; margin-top:150px; padding:40px; border-radius:15px;line-height:2;" > Not Logged In <br> Access Denied <br> <a href="../" style="background-color:#aaf;color:white;padding:10px;border-radius:15px;margin:10px;text-decoration:none;"> Click to return to Log in Page </a> </div>');
     
    }
  }
  module.exports = isLoggedIn