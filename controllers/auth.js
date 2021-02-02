import 'dotenv/config';
import { user, userRepository } from '../models/user';
import bcrypt from 'bcryptjs';
import { JwtService } from '../services/jwt';



const AuthController = {

    register: async(req, res, next) => {
       
      
        try {
            await userRepository.create(req.body.name,req.body.username, req.body.email, bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS)));
                      
        res.status(201).json({
            
            name: req.body.name,
            username: req.body.username,
            email: req.body.email
        });
    } catch (err) {
        res.status(404).json({message:"error , usuario o email en uso"});
    }
    },


    login: (req, res, next) => {
     
        const token = JwtService.sign(req.user);
        res.status(201).json({
            user: req.user,
          
            token: token
        });
    }


}

export {
    AuthController
}