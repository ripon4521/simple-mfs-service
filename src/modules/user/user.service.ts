import { IUser } from "./user.interface"
import UserModel from "./user.model"



const createUser = async (payload: IUser): Promise<IUser> => {
    //   payload.role = 'admin';
    const result = await UserModel.create(payload)
    return result
  };

  const getUser = async () => {
  
   const   result = await UserModel.find(); // Fetch all users
  
    return result;
  
  }

  const getSingleUser = async(_id:string) =>{
    const result = await UserModel.findOne({_id});
    return result;
  }

  const getPofile = async (mobile: string) => {
    if (!mobile) throw new Error('mobile is required to fetch profile.');
  
    const result = await UserModel.findOne({ mobile }); 
    if (!result) throw new Error('User not found.');
  
    return result;
  };


  const updateUser = async( _id:string, payload:IUser) =>{
    if(!_id) throw new Error('User ID is required to update user.');
    const result = await UserModel.findOneAndUpdate({_id}, payload, {new: true});
    return result;
  }

  const deleteUser = async (_id:string) =>{
    if(!_id) throw new Error('User ID is required to delete user.');
    const result = await UserModel.findOneAndDelete({_id});
    return result;
  }



  export const userServies = {
    createUser,
    getPofile,
    getUser,
    updateUser,
    deleteUser,
    getSingleUser
  }