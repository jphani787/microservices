import Joi from "joi";

export const updateProfileSchema = Joi.object({
  firstName: Joi.string().min(1).max(50).messages({
    "string.min": "First name must be at least 1 characters long",
    "string.max": "First name must be at most 50 characters long",
  }),
  lastName: Joi.string().min(1).max(50).messages({
    "string.min": "Last name must be at least 1 characters long",
    "string.max": "Last name must be at most 50 characters long",
  }),
  bio: Joi.string().max(500).messages({
    "string.max": "Bio must be at most 500 characters long",
  }),
  avatarUrl: Joi.string().uri().messages({
    "string.uri": "Avatar URL must be a valid URI",
  }),
  preferences: Joi.object().optional().messages({
    "object.base": "Preferences must be an object",
  }),
});

export const createProfileSchema = Joi.object({
  firstName: Joi.string().min(1).max(50).messages({
    "string.min": "First name must be at least 1 characters long",
    "string.max": "First name must be at most 50 characters long",
  }),
  lastName: Joi.string().min(1).max(50).messages({
    "string.min": "Last name must be at least 1 characters long",
    "string.max": "Last name must be at most 50 characters long",
  }),
  bio: Joi.string().max(500).messages({
    "string.max": "Bio must be at most 500 characters long",
  }),
  avatarUrl: Joi.string().uri().messages({
    "string.uri": "Avatar URL must be a valid URI",
  }),
  preferences: Joi.object().optional().messages({
    "object.base": "Preferences must be an object",
  }),
});
