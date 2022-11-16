const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'df1snpo88', 
    api_key: '826468944813153', 
    api_secret: 'SFFG3vShYMJQ0FRsSIVWexu47lA' 
  });

module.exports = cloudinary
