import { model } from 'mongoose';
import multer from 'multer';

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      if(file.mimetype==='image/jpeg' || file.mimetype==='image/png' || file.mimetype==='image/jpg'){
            cb(null,path.join(__dirname,"./public/images"));
        }
    }
  });
  
  const upload = multer({ storage: storage });

  export default upload