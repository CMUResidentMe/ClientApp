import React, { useState } from "react";
import { EntryPermission, Priority } from '../../data/workOrderData.js';
import { gql, useMutation } from '@apollo/client';
import styles from './WorkOrderCSS.jsx';
import ImageUpload from './ImageUpload.jsx'
import styled from '@emotion/styled';
import { Modal, Box, Typography, Button } from '@mui/material';
import { queryWorkOrdersByOwner } from './ResidentGraphQL.js';

const HeaderHeight = '60px';

const ContentContainer = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - ${HeaderHeight});
  background-color: "#f7f7f7";
  width: 70%;
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


const create_mutation = gql`
  mutation createWorkOrder($workType: String!, $priority: Priority!, $detail: String, $accessInstruction: String, $preferredTime: String, $entryPermission: EntryPermission, $images: [String!]) {
    createWorkOrder(workType: $workType, priority: $priority, detail: $detail, accessInstruction: $accessInstruction, preferredTime: $preferredTime, entryPermission: $entryPermission, images: $images){
      uuid
      semanticId
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

const WorkOrderNewForm = ({ onSubmissionSuccess }) => {
  document.body.style.overflow = 'hidden';
  const [workOrderData, setWorkOrderData] = useState({
    workType: "",
    priority: Priority.Low,
    detail: "",
    preferredTime: "",
    entryPermission: EntryPermission.ALL_PERMISSIONS,
    accessInstruction: "",
    images: [],
  });

  const [createMutation, { data, loading, error }] = useMutation(create_mutation, 
    {
      refetchQueries: [
          {query: queryWorkOrdersByOwner}, 
      ],
    }
  );
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreate = async (e) => {
    console.log("handleCreate");
    e.preventDefault();
    try {
      createMutation({ variables: workOrderData });
      if (loading) return 'Submitting...';
      if (error) return `Submission error! ${error.message}`;
      console.log(data);
      setModalOpen(true);
      setTimeout(() => {
        setModalOpen(false);
        onSubmissionSuccess();
      }, 4000);
      /*
      await createMutation({
        variables: workOrderData,
        onCompleted: (data) => {
          console.log("Submission successful", data);
          setModalOpen(true);
          setTimeout(() => {
            setModalOpen(false);
            onSubmissionSuccess();
          }, 4000);
        },
        onError: (error) => {
          console.error("Submission error", error);
        }
      });*/
    } catch (error) {
      console.error("Error in submission", error);
    }
  };

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
            Submission Successful
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Your work order has been submitted successfully. You will be redirected shortly.
          </Typography>
        </Box>
      </Modal>
      <form style={styles.form} onSubmit={handleCreate}>
        {/* First Column */}
        <div style={styles.formColumn}>
          <div style={styles.inputGroup}>
            <label htmlFor="workType" style={styles.label}>Work Type</label>
            <input id="workType" name="workType" type="text" value={workOrderData.workType} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="priority" style={styles.label}>Priority</label>
            <select id="priority" name="priority"
              value={workOrderData.priority}
              onChange={handleChange} style={styles.input}>
              <option value="High">{Priority.High}</option>
              <option value="Medium">{Priority.Medium}</option>
              <option value="Low">{Priority.Low}</option>

            </select>
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="preferredTime" style={styles.label}>Preferred Time</label>
            <input id="preferredTime" name="preferredTime" type="date" value={workOrderData.preferredTime} onChange={handleChange} style={styles.input} />
          </div>
        </div>

        {/* Second Column */}
        <div style={styles.formColumn}>
          <div style={styles.inputGroup}>
            <label htmlFor="entryPermission" style={styles.label}>Entry Permission</label>
            <select id="entryPermission" name="entryPermission"
              value={workOrderData.entryPermission}
              onChange={handleChange} style={styles.input}>
              <option value="ALL_PERMISSIONS">All Permissions</option>
              <option value="CALLCONFIRM">Call Confirm</option>
              <option value="KNOCKDOOR">Knock Door</option>
            </select>
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="accessInstruction" style={styles.label}>Access Instruction</label>
            <input id="accessInstruction" name="accessInstruction" type="text" value={workOrderData.accessInstruction} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="detail" style={styles.label}>Detail</label>
            <textarea id="detail" name="detail" value={workOrderData.detail} onChange={handleChange} style={styles.inputArea} />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="images" style={styles.label}>Images</label>
            <ImageUpload onChange={handleUploadEvents} />
          </div>
        </div>

        {/* Submit Button */}
        <div style={{ width: '100%', textAlign: 'center' }}> {/* This div ensures the button aligns with the form columns above */}
          <button type="submit" style={styles.ActionButton}>Submit Work Order</button>
        </div>
      </form>
    </ContentContainer>
  );
};

export default WorkOrderNewForm;
