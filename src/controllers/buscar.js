const buscar = {}
const bd = require('../database')

post.crear= (req,res)=>{
    try{bd.crearpost(req,res);}catch(e){console.log(e); }    
}

buscar.bu = (req,res) => {
    try {bd.buser(req,res);
    } catch (e) {
        console.log(e);
    }
}


module.exports= buscar