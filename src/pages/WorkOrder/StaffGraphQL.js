import { gql } from '@apollo/client';

const queryWKsByAssignedStaff = gql`
query workOrdersByAssignedStaff {
  workOrdersByAssignedStaff{
    uuid
    semanticId
    owner
    ownerInfo { 
      firstName
      lastName
      username
      roomNumber
    }
    workType
    priority
    status
    detail
    assignedStaff
    staffInfo {
      firstName
      lastName
      username
      roomNumber
    }
    accessInstruction
    preferredTime
    entryPermission
    images
    createTime
  }
}
`;

const workOrdersByStatus = gql`
query workOrdersByStatus($status: WorkStatus!) {
  workOrdersByStatus(status: $status){
    uuid
    semanticId
    owner
    ownerInfo { 
      firstName
      lastName
      username
    }
    workType
    priority
    status
    detail
    assignedStaff
    staffInfo {
      firstName
      lastName
      username
    }
    accessInstruction
    preferredTime
    entryPermission
    images
    createTime
  }
}
`;

const updateWorkOrderStatus = gql`
mutation updateWorkOrderStatus($uuid: String!, $status: WorkStatus!) {
  updateWorkOrderStatus(uuid: $uuid, status: $status) {
    uuid
    status
  }
}
`;

export {queryWKsByAssignedStaff, workOrdersByStatus, updateWorkOrderStatus};