import { Request, Response, response } from 'express'
import Post from '../models/Posts'
import Relationship from '../models/Relationships'
import moment from 'moment'


//TODO: get all posts from the user 
export const GetPosts = (req: Request, res: Response) => {
    const user = req.body.user
    Post.find({userId: user.id})
    .then(docs => {
        // console.log(docs);
        res.status(200).send(docs)
    })
    .catch(err => {
        console.log("error: " + err);
        res.status(401).send(err)
    })

    
}

//TODO: get all posts for the new feeds
export const GetPostsNewsfeed = (req: Request, res: Response) => {
    const user = req.body.user 
    let followed: any;
    Relationship.find({followedUserId: user.id})
    .then(data => {
        if(data) {
            followed = data;
            console.log("follower:", followed);
            
        }
    })
    
    Post.find({}, [followed])
    .then(docs => {
        // console.log(docs);
        res.status(200).send(docs)
    })
    .catch(err => {
        console.log("error: " + err);
        res.status(401).send(err)
    })
    
}

//TODO: add new posts
export const AddPost = (req: Request, res: Response) => {
    const user = req.body.user;
 
    
    const newPost = new Post(
        {
            "desc": req.body.desc,
            "img": req.body.img,
            "userId": user.id,
            "createdAt": moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        }
    )

    try {
        newPost.save();
        res.status(200).send(newPost)

    } catch (err) {
        console.log(err);
        return res.status(500).send("can't create new post")
        
    }
}

export const DeletePost = (req: Request, res: Response) => {
    const postId = req.params.id;
    Post.findOneAndDelete({_id: postId})
    .then((data) => {
        console.log(data);
        res.status(200).send({
            "message": "Delete post successfully"
        })       
    })
    .catch((err) => {
        res.status(500).send({
            "message": "Cant delete post"
        })
    })
}