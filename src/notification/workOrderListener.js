import { useEffect } from 'react';
import { socketManager } from './socketManager.js';
import staticInitObject from '../config/AllStaticConfig.js';

export default function WorkOrderListen(workorderUpdateCB, workorderimageChangedCB) {

    useEffect(() => {

        socketManager.getIo().on(staticInitObject.workorderCreated, workorderUpdateCB);
        socketManager.getIo().on(staticInitObject.workorderChanged, workorderUpdateCB);
        socketManager.getIo().on(staticInitObject.workorderimageChanged, workorderimageChangedCB);

        return () => {
            socketManager.getIo().off(staticInitObject.workorderCreated, workorderUpdateCB);
            socketManager.getIo().off(staticInitObject.workorderChanged, workorderUpdateCB);
            socketManager.getIo().off(staticInitObject.workorderimageChanged, workorderimageChangedCB);
        };
    });
}