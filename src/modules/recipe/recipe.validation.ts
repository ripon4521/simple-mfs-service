import { z } from "zod";
const CategoryEnum = z.enum(["Dessert", "Main Course", "Snacks", "Traditional"]);

const createRecipeValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    ingredients: z.array(z.string()).nonempty({ message: "At least one ingredient is required" }),
    instructions: z.array(z.string()).nonempty({ message: "At least one instruction is required" }),
    category: CategoryEnum,
    prepTime: z.number().min(1, { message: "Prep time must be at least 1 minute" }),
    cookTime: z.number().min(1, { message: "Cook time must be at least 1 minute" }),
    image: z.string().url({ message: "Invalid image URL" }),
    price: z.number().min(1, { message: "Price must be at least 1 unit" }),
 

  })
   
      
    });


const updateRecipeValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    ingredients: z.array(z.string()).nonempty({ message: "At least one ingredient is required" }),
    instructions: z.array(z.string()).nonempty({ message: "At least one instruction is required" }),
    category: CategoryEnum,
    prepTime: z.number().min(1, { message: "Prep time must be at least 1 minute" }),
    cookTime: z.number().min(1, { message: "Cook time must be at least 1 minute" }),
    image: z.string().url({ message: "Invalid image URL" }),
    price: z.number().min(1, { message: "Price must be at least 1 unit" }),
  })
   
      
    });
    
 export const receipeValidation ={
        createRecipeValidationSchema,
        updateRecipeValidationSchema,
       
    }


