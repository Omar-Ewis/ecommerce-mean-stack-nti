import multer from 'multer';
import path from 'path';
//file-type
const fileFilter= (req,file,cb)=>{
    const ext = path.extname(file.originalname).toLowerCase();

    const allowed = ['.png','.jpg','.jpeg','.webp'];
    if(!allowed.includes(ext)){
        return cb(new Error('only images allowed (.jpg,.png,.jpeg)'),false);
    }
    cb(null,true)
}

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'uploads');  
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}_${file.originalname}`)
    }
})

const MB = 1024 * 1024;
export const upload= multer({
    storage,
    fileFilter,
  limits:{fileSize: 2*MB} //2mb  
})
