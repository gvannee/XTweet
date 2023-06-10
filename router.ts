import { Router } from "express";
import { Login, Register } from "./controllers/auth.controller";

export const routes = (router: Router) => {
    //TODO: create new account
    router.post('/register', Register);

    //TODO: login account
    router.post('/login', Login);

    
}