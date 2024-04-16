import React, { useState } from "react";
import { Alert } from '@mui/material';
import PropTypes from 'prop-types';
import { EntryPermission, Priority } from '../../data/workOrderData.js';
import { gql, useMutation } from '@apollo/client';
import { CheckCircleOutlineOutlined } from '@mui/icons-material';
import styles from './WorkOrderCSS.jsx';
import ImageUpload from './ImageUpload.jsx'
import { PrivilegeType } from '../../data/userData.js';

//         changeWorkOrder(uuid: String!, workType: String, priority: Priority, detail: String, accessInstruction: String, preferredTime: String, entryPermission: EntryPermission, images: [String!]): DetailedWorkOrder
const change_mutation = gql`
  mutation changeWorkOrder($uuid: String!, $workType: String!, $priority: Priority!, $detail: String, $accessInstruction: String, $preferredTime: String, $entryPermission: EntryPermission, $images: [String!]) {
    changeWorkOrder(uuid: $uuid, workType: $workType, priority: $priority, detail: $detail, accessInstruction: $accessInstruction, preferredTime: $preferredTime, entryPermission: $entryPermission, images: $images) {
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

const assignedStaff_mutation = gql`
  mutation assignedStaff($uuid: String!) {
    assignedStaff(uuid: $uuid){
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
      assignedStaff
    }
  }
  `;

const unAssignedStaff_mutation = gql`
  mutation unAssignedStaff($uuid: String!) {
    unAssignedStaff(uuid: $uuid){
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
      assignedStaff
    }
  }
  `;

const WorkOrderForm = ({ currentWK }) => {
  const [workOrderData, setWorkOrderData] = useState({
    workType: currentWK['workType'],
    priority: currentWK['priority'],
    detail: currentWK['detail'],
    preferredTime: currentWK['preferredTime'],
    entryPermission: currentWK['entryPermission'],
    accessInstruction: currentWK['accessInstruction'],
    images: currentWK['images'],
  });
  const [stateError, setStateError] = useState("");
  const [changeMutation, { data, loading, error }] = useMutation(change_mutation);
  const [assignedStaffMutation, { dataAssign, loadingAssign, errorAssign }] = useMutation(assignedStaff_mutation);
  const [unAssignedStaffMtation, { dataunAssign, loadingunAssign, errorunAssign }] = useMutation(unAssignedStaff_mutation);

  const isStaff = (localStorage.getItem("privilege") === PrivilegeType.staff);

  const handleChange = (e) => {
    console.log("handleChange");
    const { name, value } = e.target;
    setWorkOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const assignTome = (e) => {
    if(currentWK == undefined){
      return;
    }
    if(e.target.checked){
      try { 
        assignedStaffMutation({variables: {uuid: currentWK.uuid}});
        if (loadingAssign) stateError('Submitting...');
        if (errorAssign) stateError(errorAssign.message);
      } catch (error) {
        const errorMessage =
          error?.response?.errors?.[0]?.message ||
            "An error occurred while trying to create work order.";
          setStateError(errorMessage);
      }
    }else{
      try {
        unAssignedStaffMtation({variables: {uuid: currentWK.uuid}});
        if (loadingunAssign) stateError('Submitting...');
        if (errorunAssign) stateError(errorunAssign.message);
      } catch (error) {
        const errorMessage =
          error?.response?.errors?.[0]?.message ||
          "An error occurred while trying to create work order.";
          setStateError(errorMessage);
      }
    }
  };

  const handleChangeWK = async (e) => {
    console.log("handleChangeWK");
    e.preventDefault();
    setStateError("");
    try {
      workOrderData.uuid = currentWK.uuid;
      changeMutation({variables: workOrderData});
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
      <form style={styles.form} onSubmit={handleChangeWK}>
        <h3 style={styles.heading}>Work Order</h3>
        {stateError && <div style={styles.error}>{stateError}</div>}
        <div style={styles.inputGroup}>
          <label htmlFor="workType" style={styles.label}>Work Type</label>
          <input id="workType" disabled={isStaff} name="workType" type="text" 
            value={workOrderData.workType} 
            onChange={handleChange} style={styles.input}/>
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="priority" style={styles.label}>Priority</label>
          <select id="priority" disabled={isStaff} name="priority" 
            value={workOrderData.priority}
            onChange={handleChange} style={styles.input}>
            <option value="High">{Priority.High}</option>
            <option value="Medium">{Priority.Medium}</option>
            <option value="Low">{Priority.Low}</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="preferredTime" style={styles.label}>Preferred Time</label>
          <input id="preferredTime" disabled={isStaff} name="preferredTime" type="datetime-local" 
            value={workOrderData.preferredTime}
            onChange={handleChange} style={styles.input}/>
        </div> 
        <div style={styles.inputGroup}>
          <label htmlFor="entryPermission" style={styles.label}>Entry Permission</label>
          <select id="entryPermission" disabled={isStaff} name="entryPermission" 
              value={workOrderData.entryPermission}
              onChange={handleChange} style={styles.input}>
            <option value="ALL_PERMISSIONS">{EntryPermission.ALL_PERMISSIONS}</option>
            <option value="CALLCONFIRM">{EntryPermission.CALLCONFIRM}</option>
            <option value="KNOCKDOOR">{EntryPermission.KNOCKDOOR}</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="accessInstruction" style={styles.label}>Access Instruction</label>
          <input id="accessInstruction" disabled={isStaff} name="accessInstruction" type="text" 
            value={workOrderData.accessInstruction}
            onChange={handleChange} style={styles.input}/>
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="detail" disabled={isStaff} style={styles.label}>Detail</label>
          <input id="detail" disabled={isStaff} name="detail" type="textArea" 
            value={workOrderData.detail} 
            onChange={handleChange} style={styles.inputArea}/>
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="images" style={styles.label}>Images</label>
          <ImageUpload disabled={isStaff} images={workOrderData.images} onChange={handleUploadEvents} />
        </div>
          {isStaff && 
              <div style={styles.inputGroup}>
                <label htmlFor="assign" style={styles.label}>Asign to me</label>
                <input id="assign" disabled={currentWK === undefined} name="assign" type="checkBox" value={workOrderData.detail} onChange={assignTome}/>
              </div>}
        <button type="submit" disabled={isStaff} style={styles.ActionButton}>Change WorkOrder</button>
      </form>
    </div>
  );
};

WorkOrderForm.propTypes = {
  currentWK: PropTypes.object.isRequired, 
};

export default WorkOrderForm;
