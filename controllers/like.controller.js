import Likes from '../models/Likes.js'

export const GetLikes = async (req, res) => {
    const postId = req.query.postId;
    const userId = [];
    await Likes.find({ likePostId: postId })
        .then(data => {

            if (data) {
                for (let i = 0; i < data.length; i++) {
                    userId.push(data[i].likeUserId);
                }
            }
            console.log(data);


        })
        .catch(err => {
            console.log(err); 

        }
        )

    res.status(200).send(userId);
}

export const AddLike = async (req, res) => {
    const postId = req.query.postId;

    const like = new Likes({
        likeUserId: req.body.user.id,
        likePostId: postId
    })

    try {
        await like.save();
        res.status(200).send("Liked");
    } catch (err) {
        res.status(500).send("Cant like")
    }
}

export const Unlike = async (req, res) => {
    const postId = req.query.postId;

    await Likes.findOneAndDelete({
        likeUserId: req.body.user.id,
        likePostId: postId
    })
        .then((data) => res.status(200).send("Unlike"))
        .catch((err) => res.status(500).send("Cant unlike"))

}