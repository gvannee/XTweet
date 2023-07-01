
import Comment from '../models/Comments.js';
import moment from 'moment';
import User from '../models/User.js';

export const GetComments = async (req, res) => {
    const postId = req.query.postId;

    let comments = [];
    const userId = [];
    await Comment.find({ 
        postId: postId
    })
    .then(data => {
        

        if(data) {
            for (let i = 0; i < data.length; i++) {
                comments.push({
                    comments: data[i],
                    user: {}
                })

                userId.push(data[i].comUserId)
            }
        }
    })
    .catch(err => {
        return res.status(500).send("Cant find comments")
    })

    const userInfo = [];

    await User.find({_id : { $in: userId }}) 
    .then(docs => {
        if (docs) {
            for (let i = 0; i < docs.length; i++) {
                userInfo.push(docs[i]);
            }
        }
    })

    .catch(err => {
        console.log(err);
    })

    for (let i = 0; i < comments.length; i++) {
        for (let j = 0; j < userInfo.length; j++) {
            if (comments[i].comments.comUserId == userInfo[j]._id.toString() ) {
                comments[i].user = userInfo[j]
            }

            
        }
        // console.log(posts[i].post.userId);
        
    }

    res.status(200).send(comments)
   
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