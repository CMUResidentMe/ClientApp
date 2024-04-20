import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Priority } from '../../data/workOrderData.js';
import { gql, useMutation } from '@apollo/client';
import styles from './WorkOrderCSS.jsx';
import ImageUpload from './ImageUpload.jsx'
import { PrivilegeType } from '../../data/userData.js';
import styled from '@emotion/styled';
import { Modal, Box, Typography } from '@mui/material';
import { queryWorkOrdersByOwner } from './ResidentGraphQL.js'


const change_mutation = gql`
  mutation changeWorkOrder($uuid: String!, $workType: String!, $priority: Priority!, $detail: String, $accessInstruction: String, $preferredTime: String, $entryPermission: EntryPermission, $images: [String!]) {
    changeWorkOrder(uuid: $uuid, workType: $workType, priority: $priority, detail: $detail, accessInstruction: $accessInstruction, preferredTime: $preferredTime, entryPermission: $entryPermission, images: $images) {
      uuid
      semanticId
      semanticId
      assignedStaff
      createTime
      owner
      workType
      priority
      status
      detail
      accessInstruction
      preferredTime
      entryPermission
      images
    }
  }
  `;

const cancel_mutation = gql`
  mutation cancelWorkOrder($uuid: String!) {
    cancelWorkOrder(uuid: $uuid){
      uuid
    }
  }
  `;

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
  padding-top: 100px;
  width: 100%;
  `;

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const WorkOrderForm = ({ currentWK, closeModal }) => {
  const [workOrderData, setWorkOrderData] = useState({
    semanticId: currentWK ? currentWK['semanticId'] : "",
    workType: currentWK ? currentWK['workType'] : "",
    priority: currentWK ? currentWK['priority'] : "",
    detail: currentWK ? currentWK['detail'] : "",
    preferredTime: (currentWK && currentWK['preferredTime'] !== null) ? currentWK['preferredTime'] : "",
    entryPermission: (currentWK && currentWK['entryPermission'] !== null) ? currentWK['entryPermission'] : "NA",
    accessInstruction: (currentWK && currentWK['accessInstruction'] !== null) ? currentWK['accessInstruction'] : "NA",
    images: (currentWK && currentWK['images'] !== null) ? currentWK['images'] : [],
  });
  const [stateError, setStateError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  //cite https://www.apollographql.com/docs/react/data/mutations/#updating-the-cache-directly
  //cite https://stackoverflow.com/questions/58431224/how-does-apollo-client-graphql-refetchqueries-works
  const [changeWorkOrder, { data, loading, error }] = useMutation(change_mutation,
    {
      refetchQueries: [
          {query: queryWorkOrdersByOwner}, 
      ],
    }
  );

  const [cancelWorkOrder, { dataCancel, loadingCancel, errorCancel }] = useMutation(cancel_mutation,
    {
      refetchQueries: [
          {query: queryWorkOrdersByOwner}, 
      ],
    }
  );

  if (!currentWK) {
    return <></>;
  }
  const isStaff = (localStorage.getItem("privilege") === PrivilegeType.staff);

  const handleChange = (e) => {
    console.log("handleChange");
    const { name, value } = e.target;
    setWorkOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = async (e) => {
    console.log("handleCancel");
    setStateError("");
    try {
      cancelWorkOrder({ variables: { uuid: currentWK.uuid } });
      if (loadingCancel) return 'Submitting...';
      if (errorCancel) return `Submission error! ${error.message}`;
      console.log(data);
    } catch (error) {
      const errorMessage =
        error?.response?.errors?.[0]?.message ||
        "An error occurred while trying to cancel work order.";
      setStateError(errorMessage);
    }
    closeModal();
  }

  const handleChangeWK = async (e) => {
    console.log("handleChangeWK");
    setStateError("");
    console.log("Sending mutation with data:", workOrderData);
    try {
      workOrderData.uuid = currentWK.uuid;
      await changeWorkOrder({ variables: workOrderData });
      if (loading) return 'Submitting...';
      if (error) return `Submission error! ${error.message}`;
      setModalOpen(true);
      setTimeout(() => {
        setModalOpen(false);
        // onSubmissionSuccess();
      }, 4000);
    } catch (error) {
      const errorMessage =
        error?.response?.errors?.[0]?.message ||
        "An error occurred while trying to change work order.";
      setStateError(errorMessage);
    }
    closeModal();
  };

  function handleFormSubmit(event){
    event.preventDefault();
    let subId = event.nativeEvent.submitter.id;
    if(subId === "cancel"){
      handleCancel(event);
    }else if(subId === "change"){
      handleChangeWK(event);
    }else{
      console.log(event);
    }
  }

  function handleUploadEvents(events) {
    let imagesTmp = [];
    events.map(e => {
      if (e.status === 'done' && 'response' in e) {
        imagesTmp.push(e.response.fileURL);
      }
    });
    setWorkOrderData((prevData) => ({
      ...prevData,
      ['images']: imagesTmp,
    }));
  }

  return (
    <ContentContainer>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2">
            Successful
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            You've successfully taken this order. The work order owner is noticed.
          </Typography>
        </Box>
      </Modal>
      <form style={styles.form} onSubmit={handleFormSubmit}>
        {stateError && <>{stateError}</>}
        <div style={styles.formColumn}>
          <div style={styles.inputGroup}>
            <label htmlFor="semanticId" style={styles.label}>Work Order Number</label>
            <input readOnly id="semanticId" name="semanticId" style={{ ...styles.input, resize: 'none' }} value={currentWK ? currentWK.semanticId : ""} />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="workType" style={styles.label}>Work Type</label>
            <input id="workType" disabled={isStaff} name="workType" type="text" value={workOrderData.workType} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="priority" style={styles.label}>Priority</label>
            <select id="priority" disabled={isStaff} name="priority" value={workOrderData.priority} onChange={handleChange} style={styles.input}>
              <option value="High">{Priority.High}</option>
              <option value="Medium">{Priority.Medium}</option>
              <option value="Low">{Priority.Low}</option>
            </select>
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="preferredTime" style={styles.label}>Preferred Time</label>
            <input id="preferredTime" disabled={isStaff} name="preferredTime" type="date" value={workOrderData.preferredTime} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="assignedStaff" style={styles.label}>Assigned Staff</label>
            <input readOnly id="assignedStaff" name="assignedStaff" style={{ ...styles.input, resize: 'none' }} value={currentWK.assignedStaff} placeholder="NA" />
          </div>
        </div>
        <div style={styles.formColumn}>
          <div style={styles.inputGroup}>
            <label htmlFor="entryPermission" style={styles.label}>Entry Permission</label>
            <select id="entryPermission" disabled={isStaff} name="entryPermission" value={workOrderData.entryPermission} onChange={handleChange} style={styles.input}>
              <option value="ALL_PERMISSIONS">All Permissions</option>
              <option value="CALLCONFIRM">Call Confirm</option>
              <option value="KNOCKDOOR">Knock Door</option>
            </select>
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="accessInstruction" style={styles.label}>Access Instruction</label>
            <input id="accessInstruction" disabled={isStaff} name="accessInstruction" type="text" value={workOrderData.accessInstruction} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="detail" style={styles.label}>Detail</label>
            <textarea id="detail" disabled={isStaff} name="detail" value={workOrderData.detail} onChange={handleChange} style={{ ...styles.inputArea, resize: 'none' }} />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="images" style={styles.label}>Images</label>
            <ImageUpload onChange={handleUploadEvents} images={currentWK.images} />
          </div>
        </div>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <button type="submit" id="cancel" name="cancel" value="Delete" disabled={isStaff} style={{ ...styles.ActionButton, marginRight: '70px' }}>Delete Order</button>
          <button type="submit" id="change" name="change" value="Change" disabled={isStaff} style={{ ...styles.ActionButton}}>Update Order</button>
        </div>
      </form>
    </ContentContainer>
  );
};

WorkOrderForm.propTypes = {
  currentWK: PropTypes.object.isRequired
};

export default WorkOrderForm;
