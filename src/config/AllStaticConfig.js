const staticInitObject = {
    NOTIFICATION_SERVER_URL: "http://localhost:2008/",
    APIGATEWAY_SERVER_URL: "http://localhost:8000/graphql/",
    // socket io's on message
    // they will be used in NotificationListener.js
    // msgType
    workorderCreated: "workorderCreated",
    workorderChanged: "workorderChanged",
    workorderDeleted: "workorderDeleted",
    // TODO: add msgType for other services, update NotificationListener.js accordingly
};
export default staticInitObject;