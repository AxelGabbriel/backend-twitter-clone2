const usuario = {}
const bd = require('../database')



usuario.register = (req, res) => {
   try {
      bd.crearusuario(req, res);


   } catch (e) {

      console.log(e);
   }


}

usuario.buscarid = (req, res) => {
   try {
      bd.buscaridusuario(req, res);


   } catch (e) {

      console.log(e);
   }


}

usuario.buscarusername = (req, res) => {
   try {
      bd.buscaruser(req, res);


   } catch (e) {

      console.log(e);
   }


}

usuario.editaruser = (req, res) => {
   try {
      bd.edituser(req, res);


   } catch (e) {

      console.log(e);
   }


}

module.exports = usuario