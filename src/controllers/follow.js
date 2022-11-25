const follow = {}
const bd = require('../database')

follow.fol = (req,res) => {
    try {bd.follow(req,res);
    } catch (e) {
        console.log(e);
    }
}

follow.unfol = (req,res) => {
    try {bd.unfollow(req,res);
    } catch (e) {
        console.log(e);
    }
}

follow.getf = (req,res) => {
    try {bd.buscarf(req,res);
    } catch (e) {
        console.log(e);
    }
}

follow.getbs = (req,res) => {
    try {bd.bseguidos(req,res);
    } catch (e) {
        console.log(e);
    }
}

follow.getbsc = (req,res) => {
    try {bd.bseguidosc(req,res);
    } catch (e) {
        console.log(e);
    }
}

follow.getbsr = (req,res) => {
    try {bd.bseguidores(req,res);
    } catch (e) {
        console.log(e);
    }
}

follow.getbsrc = (req,res) => {
    try {bd.bseguidoresc(req,res);
    } catch (e) {
        console.log(e);
    }
}



module.exports= follow