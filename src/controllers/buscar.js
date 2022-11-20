const buscar = {}
const bd = require('../database')

buscar.bu = (req,res) => {
    try {bd.buser(req,res);
    } catch (e) {
        console.log(e);
    }
}


module.exports= buscar