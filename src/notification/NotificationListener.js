import { useEffect } from "react";
import { socketManager } from "./socketManager.js";
import staticInitObject from "../config/AllStaticConfig.js";

export default function useNotificationListener(workorderUpdateCB) {
  useEffect(() => {
    const handleNotification = (notification) => {
      console.log("Notification received:", notification);
      workorderUpdateCB(notification); // This triggers whatever function pass in.
    };

    socketManager
      .getIo()
      .on(staticInitObject.workorderCreated, handleNotification);
    socketManager
      .getIo()
      .on(staticInitObject.workorderChanged, handleNotification);
    socketManager
      .getIo()
      .on(staticInitObject.workorderDeleted, handleNotification);
    socketManager
      .getIo()
      .on(staticInitObject.threadDeleted, handleNotification);
    socketManager.getIo().on(staticInitObject.postCreated, handleNotification);
    socketManager.getIo().on(staticInitObject.postDeleted, handleNotification);
    socketManager.getIo().on(staticInitObject.replyCreated, handleNotification);
    socketManager.getIo().on(staticInitObject.replyDeleted, handleNotification);
    socketManager
      .getIo()
      .on(staticInitObject.BookingApproved, handleNotification);
    socketManager
      .getIo()
      .on(staticInitObject.BookingDeclined, handleNotification);
    // TODO: add more events to listen to.

    return () => {
      socketManager
        .getIo()
        .off(staticInitObject.workorderCreated, handleNotification);
      socketManager
        .getIo()
        .off(staticInitObject.workorderChanged, handleNotification);
      socketManager
        .getIo()
        .off(staticInitObject.workorderDeleted, handleNotification);
      socketManager
        .getIo()
        .off(staticInitObject.threadDeleted, handleNotification);
      socketManager
        .getIo()
        .off(staticInitObject.postCreated, handleNotification);
      socketManager
        .getIo()
        .off(staticInitObject.postDeleted, handleNotification);
      socketManager
        .getIo()
        .off(staticInitObject.replyCreated, handleNotification);
      socketManager
        .getIo()
        .off(staticInitObject.replyDeleted, handleNotification);
      socketManager
        .getIo()
        .off(staticInitObject.BookingApproved, handleNotification);
      socketManager
        .getIo()
        .off(staticInitObject.BookingDeclined, handleNotification);
    };
  }, [workorderUpdateCB]);
}
