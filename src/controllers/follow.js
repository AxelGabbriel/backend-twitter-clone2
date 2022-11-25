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


module.exports= follow