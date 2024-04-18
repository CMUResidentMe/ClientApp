import React from 'react';
import './Notification.css'
import styled from '@emotion/styled';

const HeaderHeight = '60px';

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  height: ${HeaderHeight}; // Fixed height
  background-color: #f2efea;
  color: #746352;
  z-index: 1000; // High z-index to ensure it stays on top
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - ${HeaderHeight});
  background-color: "#f7f7f7";
  padding-top: ${HeaderHeight};
`;

const NotificationTable = (props) => {

  function AllNotifications() {
    /*
    {"msgType":"workorderCreated","workOrder":{"uuid":"661836ed9a724618afd79054","owner":"admin",
     "workType":"fix5544","priority":0,"detail":"fix 56 chair","status":"OPEN"}}
    */
    return props.notifications.map(({ msgType, workOrder }) => (
      <div className="message-bar" key="{msgType}{workOrder.uuid}">{msgType}: {workOrder.workType}</div>
    ));
  }

  return (
    <ContentContainer>
      <AllNotifications/>
    </ContentContainer>
  );
};

export default NotificationTable;

