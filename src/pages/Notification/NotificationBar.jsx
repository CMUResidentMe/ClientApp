import React, { useState, useEffect } from 'react';
import './Notification.css'

const NotificationBar = (props) => {

  function AllNotifications() {
    /*
    {"msgType":"workorderCreated","workOrder":{"uuid":"661836ed9a724618afd79054","owner":"admin",
     "workType":"fix5544","priority":0,"detail":"fix 56 chair","status":"OPEN"}}
    */
    return props.notifications.map(({ msgType, workOrder }) => (
      <div className="message-bar">{msgType}: {workOrder.workType}</div>
    ));
  }

  return (
    <div>
      <AllNotifications/>
    </div>
  );
};

export default NotificationBar;