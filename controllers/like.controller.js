import Likes from '../models/Likes.js'

export const GetLikes = (req, res) => {
    const postId = req.query.postId;
    Likes.find({}, [postId])
        .then(data => {
            console.log(data);
            res.status(200).send(data);

        })
        .catch(err => {
            console.log(err);

        })
}

export const AddLike = (req, res) => {
    const postId = req.query.postId;

    const like = new Likes({
        likeUserId: req.body.user.id,
        likePostId: postId
    })

    try {
        like.save();
        res.status(200).send("Liked");
    } catch (err) {
        res.status(500).send("Cant like")
    }
}

export const Unlike = (req, res) => {
    const postId = req.query.postId;

    Likes.findOneAndDelete({
        likeUserId: req.body.user.id,
        likePostId: postId
    })
        .then((data) => res.status(200).send("Unlike"))
        .catch((err) => res.status(500).send("Cant unlike"))

}