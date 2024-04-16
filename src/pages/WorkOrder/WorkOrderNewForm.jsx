import React, { useState } from "react";
import { Alert } from '@mui/material';
import PropTypes from 'prop-types';
import { EntryPermission, Priority } from '../../data/workOrderData.js';
import { gql, useMutation } from '@apollo/client';
import { CheckCircleOutlineOutlined } from '@mui/icons-material';
import styles from './WorkOrderCSS.jsx';
import ImageUpload from './ImageUpload.jsx'
import { PrivilegeType } from '../../data/userData.js';

const create_mutation = gql`
  mutation createWorkOrder($workType: String!, $priority: Priority!, $detail: String, $accessInstruction: String, $preferredTime: String, $entryPermission: EntryPermission, $images: [String!]) {
    createWorkOrder(workType: $workType, priority: $priority, detail: $detail, accessInstruction: $accessInstruction, preferredTime: $preferredTime, entryPermission: $entryPermission, images: $images){
      uuid
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

const WorkOrderNewForm = () => {
  const [workOrderData, setWorkOrderData] = useState({
    workType: "",
    priority: Priority.Low,
    detail: "",
    preferredTime: "",
    entryPermission: EntryPermission.ALL_PERMISSIONS,
    accessInstruction: "",
    images: [],
  });
  const [stateError, setStateError] = useState("");
  const [createMutation, { data, loading, error }] = useMutation(create_mutation);

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
    setStateError("");
    try {
      createMutation({variables: workOrderData});
      if (loading) return 'Submitting...';
      if (error) return `Submission error! ${error.message}`;
    } catch (error) {
      // Log the full error
      const errorMessage =
        error?.response?.errors?.[0]?.message ||
        "An error occurred while trying to create work order.";
        setStateError(errorMessage);
    }
  };

  function handleUploadEvents(events) {
    let imagesTmp = []; 
    events.map( e => {
      if(e.status === 'done' && 'response' in e){
        imagesTmp.push(e.response.fileURL);
      }
    });
    setWorkOrderData((prevData) => ({
      ...prevData,
      ['images']: imagesTmp,
    }));
  }

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleCreate}>
        <h3 style={styles.heading}>Work Order</h3>
        {stateError && <div style={styles.error}>{stateError}</div>}
        <div style={styles.inputGroup}>
          <label htmlFor="workType" style={styles.label}>Work Type</label>
          <input id="workType" name="workType" type="text" 
            value={workOrderData.workType} 
            onChange={handleChange} style={styles.input}/>
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
          <input id="preferredTime" name="preferredTime" type="datetime-local" 
            value={workOrderData.preferredTime}
            onChange={handleChange} style={styles.input}/>
        </div> 
        <div style={styles.inputGroup}>
          <label htmlFor="entryPermission" style={styles.label}>Entry Permission</label>
          <select id="entryPermission" name="entryPermission" 
              value={workOrderData.entryPermission}
              onChange={handleChange} style={styles.input}>
            <option value="ALL_PERMISSIONS">{EntryPermission.ALL_PERMISSIONS}</option>
            <option value="CALLCONFIRM">{EntryPermission.CALLCONFIRM}</option>
            <option value="KNOCKDOOR">{EntryPermission.KNOCKDOOR}</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="accessInstruction" style={styles.label}>Access Instruction</label>
          <input id="accessInstruction" name="accessInstruction" type="text" 
            value={workOrderData.accessInstruction}
            onChange={handleChange} style={styles.input}/>
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="detail" style={styles.label}>Detail</label>
          <input id="detail" name="detail" type="textArea" 
            value={workOrderData.detail} 
            onChange={handleChange} style={styles.inputArea}/>
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="images" style={styles.label}>Images</label>
          <ImageUpload onChange={handleUploadEvents} />
        </div>
        <button type="submit" style={styles.ActionButton}>Submit WorkOrder</button>
      </form>
    </div>
  );
};

export default WorkOrderNewForm;
