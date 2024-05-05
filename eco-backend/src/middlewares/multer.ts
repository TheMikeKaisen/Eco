import multer from 'multer'
import{v4 as uuid} from 'uuid' // library used to create unique id 


const storage = multer.diskStorage({
    destination(req, file, callback){
        callback(null, "uploads")
    },
    filename(req, file, callback){
        const id = uuid() // stores unique id
        
        const extName = file.originalname.split('.').pop() // stores the extension of the image in variable
        const fileName = `${id}.${extName}` // creates a unique name for the image
        callback(null, fileName)
    }
});

export const singleUpload = multer({storage}).single("photo")