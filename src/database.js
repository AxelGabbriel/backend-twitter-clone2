const { Pool } = require('pg');
const helpers = require('./helpers')
const config = {

  connectionString: process.env.DATABASE_URL,
  max: 500,
  min: 100,
  ssl: { rejectUnauthorized: false }


};

const pool = new Pool(config);

//funcion de crear usuario para registro
const crearusuario = async (req, res) => {

  const {
    username,
    correo,
    nombre,
    apellido,
    cumpleaños,
    bio,
    direccion,
    contraseña,
    verificarclave

  } = req.body;

  if (contraseña === verificarclave) {

    const passwordencriptado = await helpers.encryptPassword(contraseña)
    const result = await pool.query('INSERT INTO usuario(username,correo,nombre,apellido,cumpleaños,bio,direccion,contraseña) VALUES($1,$2,$3,$4,$5,$6,$7,$8)', [
      username, correo, nombre, apellido, cumpleaños, bio, direccion, passwordencriptado])
    console.log(result)
    res.json(result.rows)

  } else {
    res.json('contraseñas no compatibles')
  }
}


const crearpost = async (req, res) => {

  const {
    id_usuario,
    contenido,
    fecha


  } = req.body;

  const result = await pool.query('INSERT INTO post(id_usuario,contenido,fecha) VALUES($1,$2,$3)', [
    id_usuario, contenido, fecha])
  console.log(result)
  res.json(result.rows)


}
//rutas usuario busquedas y delete


//buscando usuario por id
const buscaridusuario = async (req, res) => {
  const id_usuario = req.params.id_usuario
  const response = await pool.query('SELECT* FROM usuario WHERE  id_usuario=$1', [id_usuario])
  console.log(response);
  res.json(response.rows)
}

const buscaruser = async (req, res) => {
  const username = req.params.username
  const response = await pool.query('SELECT* FROM usuario WHERE  username=$1', [username])
  console.log(response);
  res.json(response.rows)
}


//mostrar todos los post
const leerpost = async (req, res) => {
  const result = await pool.query(`
  SELECT*FROM post 
  Inner Join usuario 
  On post.id_usuario = usuario.id_usuario 
  order by id_post desc
  `)
  res.json(result.rows);
}

/*
SELECT post.id_post, post.id_usuario, post.contenido, post.foto_url, post.fecha, u.username, u.nombre, u.apellido, 
count(l.id_like)
FROM post
Join usuario as u
On post.id_usuario::integer = u.id_usuario::integer 
Join liked as l
On post.id_post::integer = l.id_post::integer
group by post.id_post, post.id_usuario, post.contenido, post.foto_url, post.fecha, u.username, u.nombre, u.apellido
WHERE id_post=$1
*/

//borrar post
const borrarpost = async (req, res) => {
  const id_post = req.params.id_post
  const response = await pool.query('DELETE FROM post WHERE id_post=$1', [id_post])
  console.log(response);
  res.json(response.rows)

}

const buscarpost = async (req, res) => {
  const id_usuario = req.params.id_usuario
  const response = await pool.query('SELECT* FROM post Inner Join usuario On post.id_usuario = usuario.id_usuario WHERE post.id_usuario=$1 order by id_post desc ', [id_usuario])
  console.log(response);
  res.json(response.rows)
}

const buscarunpost = async (req, res) => {
  const id_post = req.params.id_post
  const response = await pool.query(`
  SELECT post.id_post, post.id_usuario, post.contenido, post.foto_url, post.fecha, u.username, u.nombre, u.apellido 
  FROM post
  Join usuario as u
  On post.id_usuario::integer = u.id_usuario::integer 
  WHERE id_post=$1
  `, [id_post])
  console.log(response);
  res.json(response.rows)

}

const buser = async (req, res) => {
  const username = req.params.username
  const f = '%' + username + '%'
  const response = await pool.query('SELECT* FROM usuario where username like $1', [f])
  console.log(response);
  res.json(response.rows)
}

const bpost = async (req, res) => {
  const contenido = req.params.contenido
  const f = '%' + contenido + '%'
  const response = await pool.query('SELECT* FROM post Inner Join usuario On post.id_usuario = usuario.id_usuario where contenido like $1 order by id_post desc', [f])
  console.log(response);
  res.json(response.rows)
}


// rutas para follow

//seguir usuario
const follow = async (req, res) => {

  const {
    follower,
    followingg

  } = req.body;

  const result = await pool.query('INSERT INTO follows(follower,followingg) VALUES($1,$2)', [
    follower, followingg])
  console.log(result)
  res.json(result.rows)
}

//dejar de seguir
const unfollow = async (req, res) => {
  const id_follow = req.params.id_follow
  const response = await pool.query('DELETE FROM follows WHERE id_follow=$1', [id_follow])
  console.log(response);
  res.json(response.rows)

}

//buscar follows
const buscarf = async (req, res) => {
  const response = await pool.query('SELECT* FROM follows')
  console.log(response);
  res.json(response.rows)
}

//buscar seguidos de un usuario
const bseguidos = async (req, res) => {
  const follower = req.params.follower
  const response = await pool.query('select * from follows inner join usuario on follows.followingg::integer = usuario.id_usuario::integer where follows.follower=$1', [follower])
  console.log(response);
  res.json(response.rows)
}

//buscar seguidores de un usuario
const bseguidores = async (req, res) => {
  const followingg = req.params.followingg
  const response = await pool.query('select * from follows inner join usuario on follows.follower::integer = usuario.id_usuario::integer where follows.followingg=$1', [followingg])
  console.log(response);
  res.json(response.rows)
}

//buscar cantidad de seguidos de un usuario
const bseguidosc = async (req, res) => {
  const follower = req.params.follower
  const response = await pool.query('select count(followingg) from follows where follower=$1', [follower])
  console.log(response);
  res.json(response.rows)
}

//buscar cantidad de seguidores de un usuario
const bseguidoresc = async (req, res) => {
  const followingg = req.params.followingg
  const response = await pool.query('select count(follower) from follows where followingg=$1', [followingg])
  console.log(response);
  res.json(response.rows)
}




//rutas para likes

//seguir usuario
const like = async (req, res) => {

  const {
    id_user,
    id_post
  } = req.body;

  const result = await pool.query('INSERT INTO liked(id_user,id_post) VALUES($1,$2)', [
    id_user, id_post])
  console.log(result)
  res.json(result.rows)
}

//dejar de seguir
const dlike = async (req, res) => {
  const id_like = req.params.id_like
  const response = await pool.query('DELETE FROM liked WHERE id_like=$1', [id_like])
  console.log(response);
  res.json(response.rows)

}

//buscar follows
const buscarl = async (req, res) => {
  const response = await pool.query('SELECT* FROM liked')
  console.log(response);
  res.json(response.rows)
}

//buscar cantidad de likes de un post
const blikes = async (req, res) => {
  const id_post = req.params.id_post
  const response = await pool.query(`
  select count(id_like) from liked
  where id_post=$1
  `, [id_post])
  console.log(response);
  res.json(response.rows)

}






module.exports = {
  crearusuario, buscaridusuario,
  crearpost, leerpost, borrarpost, buscarpost, buscaruser, buscarunpost,
  buser, bpost,
  follow, unfollow, buscarf, bseguidos, bseguidosc, bseguidores, bseguidoresc,
  like, dlike, buscarl, blikes


}