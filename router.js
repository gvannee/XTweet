import { Login, Register, AuthenticationUser, Logout, UpdateInfo, UpdatePassword } from "./controllers/auth.controller.js";
import { AuthMiddleware } from "./middleware/auth.middleware.js";
import { FindUsersById, Users } from "./controllers/user.controller.js";

import { AddPost, DeletePost, GetPosts, GetPostsNewsfeed } from "./controllers/post.controller.js";
import { Follow,  GetFollowed, GetFollower, GetRelationship, Unfollow } from "./controllers/relationship.controller.js";
import { AddComment, GetComments } from "./controllers/comment.controller.js";
import { AddLike, GetLikes, Unlike } from "./controllers/like.controller.js";


const routes = (router) => {
    // * Authentication controller routes
    //TODO: create new account
    router.post('/register', Register);

    //TODO: login account
    router.post('/login', Login);

    //TODO: check permissions
    router.get('/user', AuthMiddleware, AuthenticationUser);

    //TODO: logout account
    router.post('/logout', AuthMiddleware, Logout);
    

    //* Users controller routes
    //TODO: Update user information
    router.put('/user/info/:id', AuthMiddleware, UpdateInfo);

    //TODO: Change password
    router.put('/user/password', AuthMiddleware, UpdatePassword);

    //TODO: Get list of users
    router.get('/allUsers', AuthMiddleware, Users);

    //TODO: find users by id
    //api for FE: /userinfo?id=<userid>
    router.get('/userInfo', AuthMiddleware, FindUsersById)


    //* Image controller routes
    // router.post('/upload', AuthMiddleware, Upload);
    // router.use('/uploads', express.static('./uploads')); 

    //* Post controller routes
    router.get('/user/:id', AuthMiddleware, GetPosts);
    

    //TODO: get posts for the newsfeed
    router.get('/newsfeed/posts', AuthMiddleware, GetPostsNewsfeed);
    router.post('/addPost', AuthMiddleware, AddPost);
    router.delete('/posts/delete/:id', AuthMiddleware, DeletePost);


    //* Relationship controller routes
    router.get('/getFollow', AuthMiddleware, GetFollower);
    router.get('/getRelationship', AuthMiddleware, GetRelationship);
    router.get('/getFollowed/:id', AuthMiddleware, GetFollowed); 
    router.post('/follow/:id', AuthMiddleware, Follow);
    router.delete('/unfollow/:id', AuthMiddleware, Unfollow) 


    //* Comments controller routes
    //api for FE:  '/comments?postId='
    router.get('/comments', AuthMiddleware, GetComments);
    router.post('/comments/add', AuthMiddleware, AddComment);
 

    //* Likes controller routes 
    router.get('/likes', AuthMiddleware, GetLikes);
    router.post('/likes/add', AuthMiddleware, AddLike); 
    router.delete('/likes/delete', AuthMiddleware, Unlike);
}
 
export default routes;  