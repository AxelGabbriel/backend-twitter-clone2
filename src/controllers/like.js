const like = {}
const bd = require('../database')

like.li = (req,res) => {
    try {bd.like(req,res);
    } catch (e) {
        console.log(e);
    }
}

like.dli = (req,res) => {
    try {bd.dlike(req,res);
    } catch (e) {
        console.log(e);
    }
}

like.getl = (req,res) => {
    try {bd.buscarl(req,res);
    } catch (e) {
        console.log(e);
    }
}

module.exports= like