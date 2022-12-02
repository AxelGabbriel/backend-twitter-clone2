const express= require('express')
const router = express.Router()
const usuario = require('../controllers/usuario')
const post= require('../controllers/post')
const follow= require('../controllers/follow')
const like= require('../controllers/like')
const retweet= require('../controllers/retweet')
//const puntaje=require('../controllers/puntaje')
//const passport=require('passport')
const  {passportAuth}  = require('../middlewares')

//registro y login
router.post('/registro',usuario.register)
router.post('/login', passportAuth)
router.get('/perfil',(req,res)=>{
    res.send('perfil')
})

//Manejo de Archivos
const multer = require('multer')
const { uploadImage } = require('../controllers/uploadImage')
const buscar = require('../controllers/buscar')

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb('invalid image file', false)
    }
}
const uploads = multer({ storage, fileFilter })

router.post('/upload', uploads.single('bite'), uploadImage)

//rutas de usuario
router.get('/buscar-usuario/:id_usuario',usuario.buscarid)
router.get('/buscar-username/:username',usuario.buscarusername)
router.put('/editar-usuario', usuario.editaruser)

//rutas post
router.post('/crear-post',post.crear)
router.get('/leer-post',post.leerpost)
router.get('/buscar-post/:id_usuario',post.buscarpost)
router.delete('/borrar-post/:id_post',post.borrarpost)
router.put('/editar-post',)
router.get('/buscarunpost/:id_post',post.buscarunpost)

//rutas buscar
router.get('/buscar-userb/:username', buscar.bu)
router.get('/buscar-postb/:contenido', buscar.bp)

//rutas follow
router.post('/follow',follow.fol)
router.delete('/unfollow/:follower/:followingg',follow.unfol)
router.get('/buscar-follows',follow.getf)
router.get('/buscar-seguidos/:follower',follow.getbs)
router.get('/buscar-seguidosc/:follower',follow.getbsc)
router.get('/buscar-seguidores/:followingg',follow.getbsr)
router.get('/buscar-seguidoresc/:followingg',follow.getbsrc)

//rutas like
router.post('/like',like.li)
router.delete('/dlike/:id_user/:id_post',like.dli)
router.get('/buscar-likes',like.getl)
router.get('/contar-likes/:id_post',like.bl)

//rutas retweet
router.post('/rebite',retweet.crebite)
router.get('/buscar-rebites',retweet.brebite)



module.exports = router