import { Request, Response, response } from 'express'

import User from '../models/User';

import { sign, verify } from 'jsonwebtoken';
import { ObjectType } from 'typescript';


export const AuthMiddleware = async (req: Request, res: Response, next: Function) => {

    try {
        
        const jwt = req.cookies["jwt"];

        const env: string = (process.env.SECRETE_KEY as string);

        console.log(env);
        

        const token: any = verify(jwt, env);


        if (!token) {
            return res.status(401).send(
                {
                    "message": "Unaunthenticaed"
                }
            )
        }
        let user = {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            username: "",
            password: "",
            dob: "",
            gender: "",
            profileImg: "",
            coverImg: "",
        }

        await User.findOne({ _id: token.id })
            .then((docs) => {
                
                // password = docs.password;
                if (docs) {
                    user.id = token.id;
                    user.firstName = docs.firstName;
                    user.lastName = docs.lastName;
                    user.email = docs.email;
                    user.phone = docs.phone;
                    user.username = docs.username;
                    user.password = docs.password;
                    user.dob = docs.dob;
                    user.gender = docs.gender;
                    user.profileImg = docs.profileImg;
                    user.coverImg = docs.coverImg;
                }

            })
            .catch((err) => {
                console.log(err);
                return res.status(404).send("User not found");
            });



        //delete password when return user information
        const { password, ...others } = user;
        console.log(others);

        req.body.user = others;

        
        
        next();
    } catch (err) {
        return res.status(401).send(
            {
                "message": "Unaunthenticaed"
            }
        );
    }
}