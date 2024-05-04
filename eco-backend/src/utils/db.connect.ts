import mongoose from "mongoose"



export const connectDB = async() => {
    await mongoose.connect(`mongodb://localhost:27017`,{
        dbName:"Eco24"
    })
    .then((c) =>
        console.log(`DB Connected to ${c.connection.host}`)
    )
    .catch((e)=> console.log(e))
}