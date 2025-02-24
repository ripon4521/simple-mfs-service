import catchAsync from "../../app/utils/catchAsync";
import sendRespone from "../../app/utils/sendResponse";
import { recipeServices } from "./recipe.service";
import httpStatus from 'http-status';


const createRecipe = catchAsync(async (req, res) => {
    const result = await recipeServices.createRecipeIntoDB(req.body);
    sendRespone(res, {
        success: true,
        message: 'Recipe is created successfully',
        data: result,
        statusCode: httpStatus.OK,
    })
})

const getAllRecipe = catchAsync(async (req, res) => {
    const result = await recipeServices.getAllRecipe();
    sendRespone(res, {
        success: true,
        message: 'All Recipes fatched successfully',
        data: result,
        statusCode: httpStatus.OK,
    })
})

const getRecipeById = catchAsync(async (req, res) => {
    const { recipeId } = req.params;
    const result = await recipeServices.getRecipeById(recipeId);

    if(!result) return sendRespone(res, {
        success: false,
        message: 'Recipe not found in database',
        data: result,
        statusCode: httpStatus.NOT_FOUND,
    })
    
    sendRespone(res, {
        success: true,
        message: 'Recipe fetched successfully',
        data: result,
        statusCode: httpStatus.OK,
    })
});

const deleteRecipe = catchAsync(async (req, res) => {
    const { recipeId } = req.params;
 const result =   await recipeServices.deleteRecipeById(recipeId);

 if(!result) return sendRespone(res, {
        success: false,
        message: 'Recipe not found in database.',
        data: result,
        statusCode: httpStatus.NOT_FOUND,
    })

    sendRespone(res, {
        success: true,
        message: 'Recipe deleted successfully',
        data:result,
        statusCode: httpStatus.OK,
    })
});

const updateRecipe = catchAsync(async (req, res) => {
    const { recipeId } = req.params;
    const updatedRecipe = req.body;
    const result = await recipeServices.updateRecipeById(recipeId, updatedRecipe);

    sendRespone(res, {
        success: true,
        message: 'Recipe Updated successfully',
        data:result,
        statusCode: httpStatus.OK,
    })
});









  

export const rcipeController ={
    createRecipe,
    getAllRecipe,
    getRecipeById,
    deleteRecipe,
    updateRecipe
}