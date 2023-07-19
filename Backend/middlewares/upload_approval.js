const path = require('path')
const multer = require('multer')

var store_at = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb){
        // let ext = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer ({
    storage: store_at,
    fileFilter: function(req, file, callback){
        if(file.mimetype === "application/pdf"){
            callback(null, true)
        }
        else{
            console.log("Only pdf files supported")
            callback(null, false)
        }
    },

    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = upload