import { Router } from "express";
import { Login, Register, AuthenticationUser, Logout, UpdateInfo, UpdatePassword } from "./controllers/auth.controller";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { FindUsersById, Users } from "./controllers/user.controller";
import { Upload } from "./controllers/image.controller";
import express from 'express';
import { AddPost, DeletePost, GetPosts, GetPostsNewsfeed } from "./controllers/post.controller";
import { Follow, GetFollow, Unfollow } from "./controllers/relationship.controller";
import { AddComment, GetComments } from "./controllers/comment.controller";
import { AddLike, GetLikes, Unlike } from "./controllers/like.controller";


export const routes = (router: Router) => {
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
    router.put('/user/info', AuthMiddleware, UpdateInfo);

    //TODO: Change password
    router.put('/user/password', AuthMiddleware, UpdatePassword);

    //TODO: Get list of users
    router.get('/allUsers', AuthMiddleware, Users);

    //TODO: find users by id
    //api for FE: /userinfo?id=<userid>
    router.get('/userInfo', AuthMiddleware, FindUsersById)


    //* Image controller routes
    router.post('/image/upload', AuthMiddleware, Upload);
    router.use('/image/uploads', express.static('./uploads'));

    //* Post controller routes
    router.get('/user/posts', AuthMiddleware, GetPosts);
    

    //TODO: get posts for the newsfeed
    router.get('/newsfeed/posts', AuthMiddleware, GetPostsNewsfeed);
    router.post('/addPost', AuthMiddleware, AddPost);
    router.delete('/posts/delete/:id', AuthMiddleware, DeletePost);


    //* Relationship controller routes
    router.get('/getFollow', AuthMiddleware, GetFollow);
    router.post('/follow', AuthMiddleware, Follow);
    router.delete('/unfollow', AuthMiddleware, Unfollow)


    //* Comments controller routes
    //api for FE:  '/comments?postId='
    router.get('/comments', AuthMiddleware, GetComments);
    router.post('/comments/add', AuthMiddleware, AddComment);


    //* Likes controller routes
    router.get('/likes', AuthMiddleware, GetLikes);
    router.post('/likes/add', AuthMiddleware, AddLike);
    router.delete('/likes/delete', AuthMiddleware, Unlike);
}