import { gql } from '@apollo/client';

const queryWorkOrdersByOwner = gql`
query workOrdersByOwner {
  workOrdersByOwner{
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

export { queryWorkOrdersByOwner };