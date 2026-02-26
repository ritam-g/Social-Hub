const multer = require('multer');
const crypto=require('crypto');
const path=require('path');
//diskstorage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uplodes')
                 //SECTION - HERE WE HAVE TO FILE THE FOLDER LOCATION WHERE WE WANT TO STORE THE FILE
    },
    filename: function (req, file, cb) {
                            //FILE IS THE NAME OF THE FILE WHICH USER UPLOD IN OOUR WEB SITES
      crypto.randomBytes(12,(err,name)=>{
        const fn=name.toString('hex')+path.extname(file.originalname);
                                      //SECTION - path.extname IT HELPS TO GET THE EXTENSION OF THE FILE
        cb(null,fn);
      })
      
    }
  })
  
  const upload = multer({ storage: storage })


//export upload variable

module.exports=upload;