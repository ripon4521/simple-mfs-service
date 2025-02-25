import express from 'express';
import { notifcationControllr } from './agentnotification.controller';


const notificationrouter = express.Router();
notificationrouter.get('/', notifcationControllr.getAllNotification);

export default notificationrouter;
