import jwt from'jsonwebtoken';

export const generateToken= async(userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'7d'})

    //send cookie in browser
    res.cookie('jwt',token,{
        maxAge: 7*24*60*60*1000,
        httpOnly: true, //prevents XSS attacks and cross site scripting
        sameSite:"strict", //prevents CSRF attacks
        secure:process.env.NODE_ENV !== "development"  //secure when in production
    })

    return token;
}