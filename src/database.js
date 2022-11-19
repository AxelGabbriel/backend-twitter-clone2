const {Pool}= require('pg');
const helpers= require('./helpers')
const config={
    
  connectionString: process.env.DATABASE_URL,
  max:500,
  min:100,
  ssl:{rejectUnauthorized:false}

  
};

const pool = new Pool(config);

//funcion de crear usuario para registro
const crearusuario= async(req,res)=>{
    
const  { 
     username,
     correo,
     nombre, 
     apellido,
     cumpleaños,
     bio,
     direccion,                            
     contraseña,
     verificarclave

      }= req.body;
      
      if(contraseña===verificarclave){

     const passwordencriptado = await helpers.encryptPassword(contraseña)
     const result= await pool.query('INSERT INTO usuario(username,correo,nombre,apellido,cumpleaños,bio,direccion,contraseña) VALUES($1,$2,$3,$4,$5,$6,$7,$8)', [
     username,correo,nombre,apellido,cumpleaños,bio,direccion,passwordencriptado ])
      console.log(result)
      res.json(result.rows)

      }else{
        res.json('contraseñas no compatibles')
      }
    }


    const crearpost= async(req,res)=>{
    
      const  { 
           id_usuario,
           contenido,
           fecha                            
           
      
            }= req.body;
            
           const result= await pool.query('INSERT INTO post(id_usuario,contenido,fecha) VALUES($1,$2,$3)', [
           id_usuario,contenido,fecha ])
            console.log(result)
            res.json(result.rows)
      
          
          }
          //rutas usuario busquedas y delete


          //buscando usuario por id
const buscaridusuario= async(req,res)=>{
  const id_usuario =req.params.id_usuario
  const response=await pool.query('SELECT* FROM usuario WHERE  id_usuario=$1',[id_usuario])
  console.log(response);
  res.json(response.rows)
} 

const buscaruser= async(req,res)=>{
  const username =req.params.username
  const response=await pool.query('SELECT* FROM usuario WHERE  username=$1',[username])
  console.log(response);
  res.json(response.rows)
} 


//mostrar todos los post
const leerpost=async(req,res)=>{
  const result= await pool.query('SELECT*FROM post Inner Join usuario On post.id_usuario = usuario.id_usuario')
  res.json(result.rows);
}
//borrar post
const borrarpost= async(req,res)=>{
  const id_post =req.params.id_post
  const response=await pool.query('DELETE FROM post WHERE id_post=$1',[id_post])
  console.log(response);
  res.json(response.rows)

} 

const buscarpost= async(req,res)=>{
  const id_usuario =req.params.id_usuario
  const response=await pool.query('SELECT* FROM post WHERE  id_usuario=$1',[id_usuario])
  console.log(response);
  res.json(response.rows)
 }   




    module.exports={
         crearusuario,buscaridusuario,
        crearpost,leerpost,borrarpost,buscarpost, buscaruser
        
     }