import { NotificationModel } from "./agentNotification.model"

const getNotification =async () =>{

    const result = await NotificationModel.find().populate('agentId');
    return result;
}


export const notificationService = {
    getNotification
}