
import Comment from '../models/Comments.js';
import moment from 'moment';

export const GetComments = (req, res) => {
    const postId = req.query.postId;
    Comment.find({ 
        postId: postId
    })
    .then(data => {
        res.status(200).send(data)
    })
    .catch(err => {
        return res.status(500).send("Cant find comments")
    })
   
}

export const AddComment = (req, res) => {
    const postId = req.query.postId;
 
    
    const comments = new Comment ({
        desc: req.body.desc,
    
        createAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    
        comUserId: req.body.user.id,
    
        postId: postId
    })

    try {
        comments.save();
        res.status(200).send("Comments successfully")

    } catch (err) {
        console.log(err);
        return res.status(500).send("can't add new comment")
        
    }
}

// export const createComment = (req: Request, res: Response) => {
//     const newConversation = new Conversation({
        
//     })
// }