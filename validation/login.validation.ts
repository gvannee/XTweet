import { Joi } from "express-validation";

export const LoginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required()
})