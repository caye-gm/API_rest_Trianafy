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

    async create(user) {
        
        name=newUser.name
        username=newUser.username
        email=newUser.email
        pass = bcrypt.hashSync(newUser.password, parseInt(process.env.BCRYPT_ROUNDS));

        return await user.create( {name, username , email ,pass }).exec();;
    },


}


export  {
    user,
    userRepository,
    usernameExists
}