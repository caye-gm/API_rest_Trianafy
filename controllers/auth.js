import 'dotenv/config';
import { user, userRepository } from '../models/user';
import bcrypt from 'bcryptjs';
import { JwtService } from '../services/jwt';



const AuthController = {

    register: (req, res, next) => {
       
      
        
        userRepository.create(req.body.name,req.body.username, req.body.email, bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS)));
        
        // Devolvemos todos los datos del usuario menos la contraseña                
        res.status(201).json({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email
        });
    },


    login: (req, res, next) => {
        // Dado que la mitad del esfuerzo lo hace la función password del servicio passport
        // Aquí tan solo tenemos que preocuparnos de generar y devolver el token
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