
import Relationship from '../models/Relationships.js'

export const Follow = (req, res) => {
    const user = {
        "followerUserId": req.body.user.id,
        "followedUserId": req.params.id
    }

    const follower = new Relationship(user)

    try {
        follower.save();
        console.log(req.body);

    } catch (err) {
        return res.status(404).send({
            error: "something went wrong"
        });
    }
    
    res.status(200).send(user)
}

export const GetFollower = (req, res) => {
    
    const user = req.body.user;
    const follower = []
    Relationship.find({followerUserId: user.id})
    .then((data) => {
        if(data) {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                follower.push(data[i].followedUserId)
            }
            
        }
        res.status(200).send(follower)
        
        
    })
    .catch((err) => {
        res.status(500).send({
            "message": "Something went wrong"
        })
    })

    

}

export const GetFollowed = (req, res) => {
    
    const user = req.params.id;
    const follower = []
    Relationship.find({followedUserId: user})
    .then((data) => {
        if(data) {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                follower.push(data[i].followerUserId)
            }
            
        }
        res.status(200).send(follower)
        
        
    })
    .catch((err) => {
        res.status(500).send({
            "message": "Something went wrong"
        })
    })

    

}

export const Unfollow = (req, res) => {
    const id = req.params.id;
    const user = req.body.user
    Relationship.findOneAndDelete({followerUserId: user.id, followedUserId: id})
    .then((data) => {
        console.log(data);
        res.status(200).send({
            "message": "Unnfollowed"
        })
        
    })
    .catch((err) => {
        res.status(500).send({ 
            "message": "Something went wrong"
        })
    })
}

export const NewUser = (req, res) => {
    const id = req.params.id;
    const user = req.body.user
}