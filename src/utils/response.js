
const errorMsg = (statusCode,res, message)=>{
    res.status(statusCode).json({
        message: `${error.message}, ${message}`,
  });
}

const successMsg = (statusCode,res, myData)=>{
    const {message, ...data} = myData
    res.status(statusCode).json({
        message: `Hi ${firstName.toUpperCase()}, ${message}`,
        data,
    });
}
 
module.exports = { errorMsg, successMsg }
//   return res.status(201).json({
//     message: `Hi ${firstName.toUpperCase()}, Your account has been created successfully. Please check your email for verification.`,
//     newKwiloxUser,
//   });