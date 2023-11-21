// In your server.js (or wherever your server setup is)
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'desem7vhd',
  api_key: '266726234995137',
  api_secret: '1S7jrPjlIJh66kBoH5FM60Sp_xc',
});

const opts = {
  overwrite:true,
  invalidate:true,
  resource_type:"auto"
}

module.exports = (image)=>{
    return new Promise ((resolve,reject)=>{
        cloudinary.uploader.upload(image,opts,(error,result)=>{
            if(result&&result.secure_url){
                console.log(result.secure_url);
                return resolve(result.secure_url);
            }
            console.log(error.message);
            return reject({message:error.message})
        })
    }) 
}