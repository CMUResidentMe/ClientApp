import React, { useState, useEffect } from 'react';
import './Notification.css'

const NotificationBar = (props) => {

  function AllNotifications() {
    console.log(props.notifications);
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