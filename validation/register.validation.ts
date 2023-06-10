import { Joi } from "express-validation";

export const RegisterValidation = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(11).required(),
    username: Joi.string().max(30).required(),
    gender: Joi.string().required(),
    dob: Joi.string().required(),
    password: Joi.string().min(5).required(),
}
)