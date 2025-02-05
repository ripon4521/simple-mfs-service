
export type TRecipe = {
    title: string;
    description: string;
    ingredients: [string]; // ["2 cups rice", "1 cup coconut milk"]
    instructions: [string], // ["Boil water", "Add rice"]
    category: { type: string, enum: ['Dessert', 'Main Course', 'Snacks', 'Traditional'], required: true };
    prepTime: number; // in minutes
    cookTime: number; // in minutes
    image: string; // Image URL
    price: number;

}