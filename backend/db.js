import mongoose from 'mongoose'

const dataBase=async()=>{
    try{
        await mongoose.connect(process.env.MONGO) ;
        console.log('connected to database');

    }
    catch (error){
        console.log(error)
    }
}

export default dataBase;