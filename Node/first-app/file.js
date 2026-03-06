
const fs  = require("fs");

const files = fs.readdirSync("./");


// Async call handled with callbacks 
// fs.readdir("./",(err,file)=>{
// if(err){
//     console.log("Error : "+err);
// }else{
//     console.log(file)
// }
// });

module.exports= { files }






// module.exports = {
//     file
// }