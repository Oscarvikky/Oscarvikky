
const ErrorHandler = (err, req, res, next) =>{
 const statusCode = res.statusCode? res.statusCode : 500

 switch (statusCode) {
    case 400:
        res.send({message: err.message, status: false, title:"Validation Error"})
        break;
       case 401:
        res.send({message: err.message, status: false, title:"unauthorised access"})
        case 404:
            res.send({message: err.message, status: false, title:"not found"})   
            case 500:
                res.send({message: err.message, status: false, title:"server error"})
    default:
        console.log("no errors working tree clean")
        break;
 }
}
module.exports=ErrorHandler