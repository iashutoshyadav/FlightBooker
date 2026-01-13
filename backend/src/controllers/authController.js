import authService from '../services/authService.js';
import { validateEmail,validatePassword,validateName} from '../utils/validators.js';

export const register = async (req,res,next) => {
    try{
        const {email,password,name} = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({
                success: false,
                message: 'Email, password, and name are required',
            });
        }

        if(!validateEmail(email)){
            return res.status(400).json({
                success:false,
                message:'Invalid email format',
            });
        }
        if(!validatePassword(password)){
            return res.status(400).json({
                success:false,
                message:'Password must be at least 6 characters',
            });
        }
        if(!validateName(name)){
            return res.status(400).json({
                success:false,
                message:'Name must be at least 2 characters',
            });
        }
        const result = await authService.register({email,password,name});
        res.status(201).json({
            success:true,
            message:'User registered successfully',
            data:result,
        });
    }catch(error){
         if (error.message === 'User already exists') {
            return res.status(409).json({
                success: false,
                message: error.message,
            });
        }
        next(error);
    }
};
export const login = async(req,res,next) => {
    try{
        const{email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'Email and password are required',
            });
        }
        const result = await authService.login({email,password});
        res.status(200).json({
            success:true,
            message:'Login successful',
            data:result,
        });
    }catch(error){
            if(error.message === 'Invalid credentials' || error.message === 'User not found'){
                return res.status(401).json({
                    success:false,
                    message:'Invalid email or password',
                });
            }
            next(error);
    }
};
export const getProfile = async(req,res,next)=>{
    try{
        const user = await authService.getUserProfile(req.user.id);
        res.status(200).json({
            success:true,
            data:{user},
        });
    }catch(error){
          if (error.message === 'User not found') {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }
        next(error);
    }
};