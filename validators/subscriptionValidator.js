import {body} from "express-validator";
export const subscriptionValidation=[
    body("name")
    .notEmpty()
    .withMessage("le nom est obligatoire"),

    body("price")
    .isFloat({gt:0})
    .withMessage("le prix doit etre superieure à 0"),

    body("billingCycle")
    .isIn(["monthly","yearly"])
    .withMessage("billingCycle doit etre monthly ou yearly")
];