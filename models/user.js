import mongoose from 'mongoose';
import { password } from '../services/passport';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    username: String,
    email: String,
    password:String
},{versionKey:false});

const user = mongoose.model('users', userSchema);
    



const usernameExists = (username) => {
    let result = userRepository.findByUsername(username)
    return result == null ? result : undefined;
}

const userRepository = {


    async findById(id) {
        const result = await user.findById(id).exec();
        return result != null ? result : undefined;
     },

    async findByUsername(username) {
        const result = await user.find( {username : username}).exec();
        return result != null ? result[0] : undefined;
    },

    async create(name,username,email,password) {
        
        try {
        const theUser= new user({
         name : name,
         username : username,
         email : email,
         password : password
        })
        
        return await theUser.save();
    
        } catch (error) {
            res.status(400).json({Error: error.message});
        }
    },

    toDto(user) { 
        return {
            id: user.id,
            name: user.name, 
            username: user.username,
            email: user.email
        }
    },

}



export  {
    user,
    userRepository,
    usernameExists
}