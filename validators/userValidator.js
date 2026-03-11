import {body} from "express-validator";
export const registerValidation=[
    body("name")
    .notEmpty()
    .withMessage("le nom est obligatoire"),
    body("email")
    .isEmail()
    .withMessage("email invalide"),
    body("password")
    .isLength({min:6})
    .withMessage("le mot de passe doit contenir au moins 6 caractéres")

];