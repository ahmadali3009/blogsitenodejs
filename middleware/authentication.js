const { validationToken } = require("../services/authentication");

function cheakAuthenticationUser(cookieName)
{
    return (req , res , next) => 
    {
        let tokenCookiesValue = req.cookies[cookieName];
        if (!tokenCookiesValue)
        {
           return next()
        }
        try
        {
            let userpayload = validationToken(tokenCookiesValue);
            req.user = userpayload;
            console.log(req.user)
        }
        catch(err)
        {}
          return  next()
    }
}

module.exports = cheakAuthenticationUser;