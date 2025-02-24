import SystemBalance, { IsystemBalance } from "./systemBalance.model";


const getSystemBalance = async () =>{
    const systemBalance = await SystemBalance.find();
    return systemBalance;
}

const updateSystemBalance = async(_id:string,payload:IsystemBalance) => {
    const updatedSystemBalance = await SystemBalance.findOneAndUpdate({_id}, payload, {new: true});
    return updatedSystemBalance;
}

const deleteSystemBalance = async(_id:string) => {

    await SystemBalance.findOneAndDelete({_id});
    return 'System Balance deleted successfully';
}


export const systemBalanceService = {
    getSystemBalance,
    updateSystemBalance,
    deleteSystemBalance
 
}