import Joi, { ValidationResult } from "joi";

export const loginUserValidation = (data: any): ValidationResult<any> => {
  const joiUserSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string(),
    username: Joi.string(),
  })
    .min(2)
    .max(2);

  return joiUserSchema.validate(data);
};
export const createUserValidation = (data: any): ValidationResult<any> => {
  const joiUserSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
  })
    .min(2)
    .max(2);

  return joiUserSchema.validate(data);
};

export const getRemarkValidation = (data: any): ValidationResult<any> => {
  const joiUserSchema = Joi.object().keys({
    userId: Joi.string().required(),
    filmId: Joi.string().required(),
  })
    .min(2)
    .max(2);

  return joiUserSchema.validate(data);
};