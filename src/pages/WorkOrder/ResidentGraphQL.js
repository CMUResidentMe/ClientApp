import { gql } from '@apollo/client';

const queryWorkOrdersByOwner = gql`
query workOrdersByOwner {
  workOrdersByOwner{
    uuid
    semanticId
    owner
    workType
    priority
    status
    detail
    assignedStaff
    accessInstruction
    preferredTime
    entryPermission
    images
    createTime
  }
}
`;

export { queryWorkOrdersByOwner };