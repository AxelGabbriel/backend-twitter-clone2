const comentario = {}
const bd = require('../database')

comentario.ccomentario= (req,res)=>{
    try{bd.crearcomentario(req,res);}catch(e){console.log(e); }    
}

comentario.mcomentario= (req,res)=>{
    try{bd.mostrarcomentarios(req,res);}catch(e){console.log(e); }    
}

   module.exports= comentario