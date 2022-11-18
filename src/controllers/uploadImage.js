const sharp = require('sharp')
const cloudinary = require('../helpers/imageUpload')
const { Pool } = require('pg');
const config = {

  connectionString: process.env.DATABASE_URL,
  max: 500,
  min: 100,
  ssl: { rejectUnauthorized: false }
};

const pool = new Pool(config);

exports.uploadImage = async (req, res) => {

    //console.log(req.body)
    //console.log(req.file)

    const { id_usuario, contenido, fecha} = req.body

    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            public_id: `${new Date().getTime()}`,
            crop: 'fill'
        })
        console.log('url: ' + result.url + ', username: ' + id_usuario + ', contenido: ' + contenido + ', fecha: ' + fecha + ', id_cloud: ' + result.public_id)
        /*const resultdb = await pool.query('INSERT INTO foto(url,manga,autor,capitulo,image_id,pagina) VALUES($1,$2,$3,$4,$5,$6)', [
            result.url, nombre, autor, capitulo, result.public_id, pagina])*/
            const resultdb= await pool.query('INSERT INTO post(id_usuario,contenido,foto_url,fecha) VALUES($1,$2,$3,$4)', [
                id_usuario,contenido,result.url,fecha])
        console.log('registro exitoso')
        res.json('registro exitoso')



        //res.status(201).json({ success: true, message: 'Foto Cargada' })

    } catch (error) {
        res.status(500).json({ success: false, message: 'Foto no Cargada' })
        console.log('Error con la imagen', error.message)
    }





}