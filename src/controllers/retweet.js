const retweet = {}
const bd = require('../database')

retweet.crebite= (req,res)=>{
    try{bd.crearrebite(req,res);}catch(e){console.log(e); }    
}

   module.exports= retweet