
import { RegisterValidation } from '../validation/register.validation.js';
import User from '../models/User.js';
import bcryptjs from 'bcryptjs';
import pkg from 'jsonwebtoken';
import { LoginValidation } from '../validation/login.validation.js';



export const Register = async (req, res) => {
    const body = req.body;


    const { error } = RegisterValidation.validate(body);
    const user = new User({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        dob: body.dob,
        password: await bcryptjs.hash(body.password, 10)
    });

    if (error) {
        return res.status(404).send(error.details);
    }

    if (await User.findOne({ phone: body.phone })) {
        return res.status(400).send({
            message: "This phone number is already used by another user"
        });
    }

    if (await User.findOne({ email: body.email })) {
        return res.status(400).send({
            message: "This email is already used by another user"
        });
    }

    try {
        user.save();
        console.log(req.body);

    } catch (err) {
        return res.status(404).send({
            message: "something went wrong"
        });
    }
    res.status(201).send({
        message: "Success"
    });



}

export const Login = async (req, res) => {
    const { error } = LoginValidation.validate(req.body);
    let password = "";
    let id = ""
    let user;
    console.log(req.body);
    if (error) {
        return res.status(404).send(error.details);
    }

    const { sign, verify } = pkg;
    await User.findOne({ email: req.body.email })
        .then((docs) => {
            // console.log("Result :", docs);
            // password = docs.password;
            if (docs) {
                password = docs.password;
                id = docs._id.toString();
                console.log(password);
                user = docs
            }

        })
        .catch((err) => {
            console.log(err);
            return res.status(404).send({
                message: "User not found"
            })
        });

    if (!await bcryptjs.compare(req.body.password, password)) {
        return res.status(400).send({
            message: "Password is incorrect"
        })
    }

    //TODO: Set private key for token
    const env = (process.env.SECRETE_KEY);

    console.log(env);
    const token = sign({
        id: id,
        email: req.body.email,
        password: req.body.password,
    }, env)


    //TODO: save token in cookie
    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 1000 //1 day
    })

    const message = {
        message: "Successful",

        id: id,
    }

    res.status(200).send(message)

}

export const AuthenticationUser = async (req, res) => {
    res.status(200).send(req.body.user)
}

export const Logout = (req, res) => {
    res.cookie("jwt", '', { maxAge: 0 });
    return res.send({
        "Message": "Success"
    })
}

export const UpdateInfo = async (req, res) => {
    const user = req.params.id;
    await User.updateMany({_id: user}, req.body.updateInfo)
        .then((data) => {
            console.log(req.body.updateInfo);
            res.status(200).send(
                data
            )
        })

        .catch((err) => {
            res.status(500).send({
                message: err.message
            })
        })




}

export const UpdatePassword = async (req, res) => {
    const user = req.body.user;
    const { sign, verify } = pkg;

    if (req.body.password != req.body.confirmPassword) {
        return res.status(403).send({
            "message": "Password does not match"
        });
    }

    await User.updateOne(user._id, {
        password: await bcryptjs.hash(req.body.password, 10)
    })


    res.status(200).send({
        "message": "Successfully changed password"
    });
}