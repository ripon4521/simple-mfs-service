import { IUser } from "./user.interface"
import UserModel from "./user.model"



const createUser = async (payload: IUser): Promise<IUser> => {
    //   payload.role = 'admin';
    const result = await UserModel.create(payload)
    return result
  };

  export const userServies = {
    createUser,
  }