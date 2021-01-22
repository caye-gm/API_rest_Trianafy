import mongoose from 'mongoose';
import { password } from '../services/passport';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    username: String,
    email: String,
    password:String
});

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
        return result != null ? result : undefined;
    },

    async create(name,username,email,password) {
        
        
        const theUser= new user({
         name : name,
         username : username,
         email : email,
         pass : password
        })
        
        return await theUser.save();
    },


}


export  {
    user,
    userRepository,
    usernameExists
}