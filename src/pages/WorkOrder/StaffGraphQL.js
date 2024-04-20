import { gql } from '@apollo/client';

const queryWKsByAssignedStaff = gql`
query workOrdersByAssignedStaff {
  workOrdersByAssignedStaff{
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

const workOrdersByStatus = gql`
query workOrdersByStatus($status: WorkStatus!) {
  workOrdersByStatus(status: $status){
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

export {queryWKsByAssignedStaff, workOrdersByStatus};