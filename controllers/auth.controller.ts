import { Request, Response, response } from 'express'
import { RegisterValidation } from '../validation/register.validation';
import User from '../models/User';
import bcryptjs from 'bcryptjs';
import { sign } from 'jsonwebtoken';


export const Register = async (req: Request, res: Response) => {
    const body = req.body;

    const { error } = RegisterValidation.validate(body);
    const user = new User({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        username: body.username,
        gender: body.gender,
        dob: body.dob,
        password: await bcryptjs.hash(body.password, 10)
    });

    if (error) {
        return res.status(404).send(error.details);
    }

    if (await User.findOne({ phone: body.phone })) {
        return res.status(400).send("This phone number is already used by another user");
    }

    if (await User.findOne({ email: body.email })) {
        return res.status(400).send("This email is already used by another user");
    }

    try {
        user.save();
        console.log(req.body);

    } catch (err) {
        return res.status(404).send("something went wrong");
    }
    res.status(201).send(user);



}

export const Login = async (req: Request, res: Response) => {
    let password = "";
    let id = ""
    console.log(req.body);
    await User.findOne({ email: req.body.email})
        .then((docs) => {
            // console.log("Result :", docs);
            // password = docs.password;
            if(docs) {
                password = docs.password;
                id = docs._id.toString();
                console.log(password);
            }

        })
        .catch((err) => {
            console.log(err);
            return res.status(404).send("User not found")
        });

    if (!await bcryptjs.compare(req.body.password, password)) { 
        return res.status(400).send("Password is incorrect")
    }

    const payload = {
        id: id,
        email: req.body.email,
        password: req.body.password,
    }

    const token = sign(payload, "tweet")


    //TODO: save token in cookie
    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 1000 //1 day
    })

    const message = {
        type: "Successful",
        id: id,
    }

    res.status(200).send(message)
    
}