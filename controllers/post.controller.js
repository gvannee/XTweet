
import { ObjectId } from 'mongodb'
import Post from '../models/Posts.js'
import Relationship from '../models/Relationships.js'
import moment from 'moment'
import User from '../models/User.js'


//TODO: get all posts from the user 
export const GetPosts = async (req, res) => {
    const user = req.params.id
    console.log(user);
    let posts = []
    await User.find({ _id: user})
    .then((docs) => {
        
        if (docs) {
            for (let i = 0; i < docs.length; i++) {
                posts.push({
                    info: docs[i],
                    post: [],
                })
            } 
        }
        
        
    }) 
    .catch((err) => {
        console.log(err);
    })

    let postArray = [];

    await Post.find({ userId: user})
        .then(docs => {
            // console.log(docs);
            if (docs) {
                for (let i = 0; i < docs.length; i++) {
                    postArray.push(docs[i]) ;
                }
            }

            console.log(postArray);

            

            
        })
        .catch(err => {
            console.log("error: " + err);
            res.status(401).send(err)
        })

        for (let i = 0; i < posts.length; i++) {

            for (let j = 0; j < postArray.length; j++) {
                posts[i].post.push(postArray[j]);
            }
            

        }
        // console.log(posts);

        
        res.status(200).send(posts)
        
    
}

//TODO: get all posts for the new feeds
export const GetPostsNewsfeed = async (req, res) => {
    const user = req.body.user
    let followed = [];
    followed.push(new ObjectId(user.id))
    await Relationship.find({ followerUserId: user.id })
        .then(data => {
            console.log(typeof data);
            if (data) {
                for (let i = data.length - 1; i >= 0 ; i--) {
                    followed.push(data[i].followedUserId)
                }


                // console.log("follower:", data)

            }
        })
        .catch(err => {
            console.log("error: " + err);

        })

    // console.log(followed);


    let posts = [];
    await Post.find({ userId: { $in: followed } })
        .then(docs => {

            // console.log(docs);
            if (docs) {
                for (let i = docs.length - 1; i >= 0 ; i--) {
                    posts.push(
                        {
                            post: docs[i],
                            user: {}
                        }
                    );
                }
            }



        })
        .catch(err => {
            console.log("error: " + err);
            res.status(401).send(err)
        })

    const userInfo = [];

    await User.find({ _id: { $in: followed } })
        .then((docs) => {
            
            if (docs) {
                for (let i = 0; i < docs.length; i++) {
                    userInfo.push(docs[i]);
                }
            }

            // console.log(userInfo);

            
        })



        .catch(err => {
            console.log(err);
        })

        


    for (let i = posts.length - 1; i >= 0 ; i--) {
        for (let j = userInfo.length - 1; j >= 0; j--) {
            if (posts[i].post.userId == userInfo[j]._id.toString() ) {
                posts[i].user = userInfo[j]
            }

            
        }
        // console.log(posts[i].post.userId);
        
    }

    res.status(200).send(posts)
    // const post = await Post.find({ userId: { $in: followed} }).populate("userId").exec();

    // console.log(post[2].userId.dob);


    // Post.find( {userId: user.id}) 
    // .then(doc => {
    //     if(doc) {
    //         for (let i = 0; i < doc.length; i++) {

    //             posts.push(doc[i]);
    //         }
    //     }



    // })







}

//TODO: add new posts
export const AddPost = (req, res) => {
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

export const DeletePost = (req, res) => {
    const postId = req.params.id;
    Post.findOneAndDelete({ _id: postId })
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