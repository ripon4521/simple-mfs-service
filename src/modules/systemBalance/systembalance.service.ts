import SystemBalance from "./systemBalance.model";


const getSystemBalance = async () =>{
    const systemBalance = await SystemBalance.find();
    return systemBalance;
}


export const systemBalanceService = {
    getSystemBalance
}