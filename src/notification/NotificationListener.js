import { useEffect } from 'react';
import { socketManager } from './socketManager.js';
import staticInitObject from '../config/AllStaticConfig.js';

export default function NotificationListener(workorderUpdateCB) {

    useEffect(() => {
        //after react component render
        socketManager.getIo().on(staticInitObject.workorderCreated, workorderUpdateCB);
        socketManager.getIo().on(staticInitObject.workorderChanged, workorderUpdateCB);
        socketManager.getIo().on(staticInitObject.workorderDeleted, workorderUpdateCB);
        //react component destroy
        return () => {
            socketManager.getIo().off(staticInitObject.workorderCreated, workorderUpdateCB);
            socketManager.getIo().off(staticInitObject.workorderChanged, workorderUpdateCB);
            socketManager.getIo().off(staticInitObject.workorderDeleted, workorderUpdateCB);
        };
    },);
}