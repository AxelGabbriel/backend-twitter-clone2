const buscar = {}
const bd = require('../database')

buscar.bu = (req,res) => {
    try {bd.buser(req,res);
    } catch (e) {
        console.log(e);
    }
}

buscar.bp = (req,res) => {
    try {bd.bpost(req,res);
    } catch (e) {
        console.log(e);
    }
}


module.exports= buscar