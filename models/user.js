import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    username: String,
    email: String,
    password:String
});

const user = mongoose.model('user', userSchema);
    



const userRepository = {

    


}


export  {
    user,
    userRepository,
}