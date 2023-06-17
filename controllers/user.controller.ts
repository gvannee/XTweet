import { Request, Response } from 'express';
import User from '../models/User';

export const Users = async (req: Request, res: Response) => {
    let users = [{}]

    await User.find()
        .then(docs => {
            if (docs) {
                for (let i = 0; i < docs.length; i++) {
                    users.push({
                        id: docs[i]._id,
                        firstName: docs[i].firstName,
                        lastName: docs[i].lastName,
                        email: docs[i].email,
                        phone: docs[i].phone,
                        username: docs[i].username,
                        password: docs[i].password,
                        dob: docs[i].dob,
                        gender: docs[i].gender,
                        profileImg: docs[i].profileImg,
                        coverImg: docs[i].coverImg
                    })
                }
            }

        })
        .catch(err => {
            return res.status(404).send({
                message: "Can't get all users"
            })
        })


    // console.log(typeof users);

    const list = users.map(user => {
        const { password, ...data }: any = user;
        return data
    })

    res.status(200).send(list)

}

export const FindUsersById = (req: Request, res: Response) => {
    const id = req.query.id
    const user = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        username: "",
        gender: "",
        dob: "",
        coverImg: "",
        profileImg: ""

    }
    User.findOne({_id: id})
        .then(data => {
            if (data) {
                // user.firstName = data.firstName,
                // user.lastName = data.lastName,
                // user.email = data.email,
                // user.phone = data.phone,
                // user.username = data.username,
                // user.gender = data.gender,
                // user.dob = data.dob
                res.status(200).send(data)
            }
        })
        .catch(err =>{
            return res.status(401).send("Cant find user")
        })

    // res.status(200).send(user)
}

