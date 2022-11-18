const post = {}
const bd = require('../database')

post.crear= (req,res)=>{
    try{bd.crearpost(req,res);}catch(e){console.log(e); }    
}

post.buscarpost= (req,res)=>{
    try{bd.buscarpost(req,res);}catch(e){console.log(e); }    
}

post.leerpost= (req,res)=>{
    try{bd.leerpost(req,res);}catch(e){console.log(e); }    
}

post.borrarpost= (req,res)=>{
    try{bd.borrarpost(req,res);}catch(e){console.log(e); }    
}

   module.exports= post