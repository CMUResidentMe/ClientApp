import { useEffect } from 'react';
import { socketManager } from './socketManager.js';
import staticInitObject from '../config/AllStaticConfig.js';

export default function WorkOrderListen(workorderUpdateCB) {

    useEffect(() => {
        //after react component render
        socketManager.getIo().on(staticInitObject.workorderCreated, workorderUpdateCB);
        socketManager.getIo().on(staticInitObject.workorderChanged, workorderUpdateCB);
        // TODO: add delete workorder
        //react component destry
        return () => {
            socketManager.getIo().off(staticInitObject.workorderCreated, workorderUpdateCB);
            socketManager.getIo().off(staticInitObject.workorderChanged, workorderUpdateCB);
            // TODO: add delete workorder
        };
    },); 
}