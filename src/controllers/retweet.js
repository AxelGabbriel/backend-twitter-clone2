const retweet = {}
const bd = require('../database')

retweet.crebite= (req,res)=>{
    try{bd.crearrebite(req,res);}catch(e){console.log(e); }    
}
retweet.brebite= (req,res)=>{
    try{bd.buscarrebites(req,res);}catch(e){console.log(e); }    
}
retweet.brebiteu= (req,res)=>{
    try{bd.buscarrebitesuser(req,res);}catch(e){console.log(e); }    
}

   module.exports= retweet