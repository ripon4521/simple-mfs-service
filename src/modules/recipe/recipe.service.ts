import { TRecipe } from "./receipe.interface";
import { recipeModel } from "./recipe.model";

const createRecipeIntoDB = async(payload:TRecipe) =>{
    const result = await recipeModel.create(payload);
    return result;

}

const getAllRecipe = async()=>{
    const result = await recipeModel.find();
    return result;
}

const getRecipeById = async(_id:string) =>{
    const result = await recipeModel.findOne({_id});
    return result;
}

const deleteRecipeById = async(_id:string) =>{
    const result = await recipeModel.findOneAndDelete({_id});
    return result;
}

const updateRecipeById = async(_id:string, payload:TRecipe) =>{
    const result = await recipeModel.findOneAndUpdate({_id}, payload, {new: true});
    return result;
}

export const recipeServices = {
    createRecipeIntoDB,
    getAllRecipe,
    getRecipeById,
    deleteRecipeById,
    updateRecipeById
 
}