import { model, Schema } from 'mongoose';
import { TRecipe } from './receipe.interface';
import AppError from '../../app/error/AppError';
import httpStatus from 'http-status';
import { number } from 'zod';

const receipeSchema = new Schema<TRecipe>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    ingredients: {
      type: [String],
      required: [true, 'Ingredients are required'],
      validate: [
        (val: string[]) => val.length > 0,
        'Must have at least one ingredient',
      ],
    },
    instructions: {
      type: [String],
      required: [true, 'Instructions are required'],
      validate: [
        (val: string[]) => val.length > 0,
        'Must have at least one instruction',
      ],
    },
    category: {
      type: String,
      required: true,
      enum: ['Dessert', 'Main Course', 'Snacks', 'Traditional'],
    },
    prepTime: {
      type: Number,
      required: [true, 'Preparation time is required'],
      min: [1, 'Prep time must be at least 1 minute'],
    },
    cookTime: {
      type: Number,
      required: [true, 'Cook time is required'],
      min: [1, 'Cook time must be at least 1 minute'],
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) =>
          /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg)$/.test(v),
        message: 'Invalid image URL',
      },
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [1, 'Price must be at least 1 unit'],
    },
  },
  {
    timestamps: true,
  },
);

receipeSchema.pre('save', async function (next) {
  const isRecipeExists = await recipeModel.findOne({
    title: this.title,
  });
  if (isRecipeExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This recipe is already exists');
  }
  next();
});

receipeSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isRecipeExists = await recipeModel.findOne(query);
  if (!isRecipeExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe not found');
  }
  next();
});

export const recipeModel = model<TRecipe>('Recipes', receipeSchema);
