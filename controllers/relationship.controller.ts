import { Request, Response} from 'express'
import Relationship from '../models/Relationships'

export const Follow = (req: Request, res: Response) => {
    const user = {
        "followerUserId": req.body.followerUserId,
        "followedUserId": req.body.followedUserId
    }

    const follower = new Relationship(user)

    try {
        follower.save();
        console.log(req.body);

    } catch (err) {
        return res.status(404).send("something went wrong");
    }
    
    res.status(200).send(user)
}

export const GetFollow = (req: Request, res: Response) => {
    const followerId = req.query.followerId;
    const user = req.body.user
    Relationship.find({followedUserId: user.id, followerUserId: followerId})
    .then((data) => {
        console.log(data);
        res.status(200).send({
            "message": "You have followed this user"
        })
        
    })
    .catch((err) => {
        res.status(500).send({
            "message": "Something went wrong"
        })
    })
}

export const Unfollow = (req: Request, res: Response) => {
    const id = req.query.followerId;
    const user = req.body.user
    Relationship.findOneAndDelete({followedUserId: user.id, followerUserId: id})
    .then((data) => {
        console.log(data);
        res.status(200).send({
            "message": "You have unfollowed this user"
        })
        
    })
    .catch((err) => {
        res.status(500).send({
            "message": "Something went wrong"
        })
    })
}