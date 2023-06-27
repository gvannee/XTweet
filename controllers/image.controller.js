
import { extname } from 'path';
import multer from 'multer';


export const Upload = async (req, res) => {
    const user = req.body.user;
    let link

    const storage = multer.diskStorage({
        destination: './uploads',
        filename(_, file, callback) {
            const randomName = (Math.random().toString(20).substring(2,12));
            link = `${randomName}${extname(file.originalname)}`
            return callback(null, `${randomName}${extname(file.originalname)}`)
        },
    })
    const env  = (process.env.API_KEY );

    const upload = multer ({storage}).single("image")
   


    console.log(link);
    
    
    // await User.findOneAndUpdate({_id: user.id}, {
    //     image: `${env}/image/uploads/${link}`
    // }, { new: true, upsert: true, setDefaultsOnInsert: false })
    // .lean();

    upload(req, res, (err) => {
        res.send({
            url: `${env}/image/uploads/${req.file?.filename}`
        })
    });
    
}