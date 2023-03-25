import mongoose from 'mongoose'

const connectDb = handler => async(req,res) =>{
    if(mongoose.connections[0].readyState){
        return handler(req,res)
    }
    // await mongoose.connect('mongodb+srv://aditya:aditya@cluster0.ypoa7js.mongodb.net/styleswearretryWrites=true&w=majority')
    await mongoose.connect('mongodb+srv://aditya:aditya@cluster0.ypoa7js.mongodb.net/ecommerceretryWrites=true&w=majority')
    return handler(req,res)
}

export default connectDb;