import { Router } from "express";
import bcrypt from "bcryptjs"
import User from "../userSchema/userSchema.js";
import upload from "../multer.js"

 
import cloudinary from "../cloud.js";       
import Image from "../userSchema/imageSchema.js"; 


const route=Router();
route.post('/singin',async(req,res)=>{
    const {name , password, email}=req.body;

    try{
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({ message: "User with this email already exists" });

        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const data=new User({name,password:hashedPassword,email});
        await data.save();
        return res.status(201).json({message:"successful"});
    }

    catch(error){
        console.log(error)
    }

    
})


route.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        console.log(user);

        if (!user) {
           
            return res.status(404).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid);

        if (!isPasswordValid) {
            
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        req.session.userId=user._id;
        console.log("sessoin"+JSON.stringify(req.session, null, 2))

       
        return res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});



const requireAuth = (req, res, next) => {
    console.log("auth"+ req.session)
    console.log("cookies"+req.headers.cookies)
    if ( req.session.userId) {
        next(); // User is authenticated, continue to next middleware
    } else {
        console.log("unatuhorisez") // User is not authenticated, redirect to login page
    }
}



route.post('/images', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const userId= req.session.userId;
    console.log(userId)

    const newImage = new Image({ imageUrl: result.secure_url,user:userId });
    await newImage.save();

    res.status(200).json({ message: 'Image uploaded successfully', data: newImage });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

  route.get('/all_images',async(req,res)=>{
    try{
        const result=await cloudinary.api.resources({ type: 'upload'})
        const imageUrls = result.resources.map(image => image.url);
        res.status(200).json({images:imageUrls})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"internal"})
    }

  })



  route.post('/images/:imageId/view', async (req, res) => {
  try {
    const imageId = req.params.imageId;
    const image = await Image.findById(imageId);
  
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    image.views += 1;
    await image.save();
    console.log(image)

    res.status(200).json({ message: 'View count updated successfully' });
  } catch (error) {
    console.error('Error updating view count:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



route.get('/images-with-views', async (req, res) => {
  try {
    const images = await Image.find({}, 'name views'); 
    console.log(images)
    res.status(200).json({ images });
  } catch (error) {
    console.error('Error fetching images with views:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

  
route.get('/protected', requireAuth, (req, res) => {
    console.log(req.session);  // Log session information
    res.json({ message: 'Access granted to protected route', user: req.session.user });
});



export default route