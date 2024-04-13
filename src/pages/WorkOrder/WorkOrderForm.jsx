import React, { useState } from "react";
import { WorkStatus, EntryPermission } from '../../data/workOrderData.js';
import { gql, useMutation, useQuery } from '@apollo/client';
import styles from './WorkOrderCSS.jsx';

const create_mutation = gql`
mutation createWorkOrder($workType: String!, $priority: Int!, $detail: String, $assignedStaff: String, $accessInstruction: String, $preferredTime: String, $entryPermission: EntryPermission) {
  createWorkOrder(workType: $workType, priority: $priority, detail: $detail, assignedStaff: $assignedStaff, accessInstruction: $accessInstruction, preferredTime: $preferredTime, entryPermission: $entryPermission){
    uuid
    owner
    workType
    priority
    status
    detail
    assignedStaff
    accessInstruction
    preferredTime
    entryPermission
  }
}
`;

const WorkOrderForm = () => {
  const [workOrderData, setWorkOrderData] = useState({
    workType: "",
    priority: 0,
    detail: "",
    preferredTime: "",
    entryPermission: EntryPermission.ALL_PERMISSIONS,
    accessInstruction: "",
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

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setWorkOrderData((prevData) => ({
      ...prevData,
      [name]: parseInt(value),
    }));
  };

  const handleCreate = async (e) => {
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

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleCreate}>
        <h3 style={styles.heading}>Work Order</h3>
        {stateError && <div style={styles.error}>{stateError}</div>}
        <div style={styles.inputGroup}>
          <label htmlFor="workType" style={styles.label}>Work Type</label>
          <input id="workType" name="workType" type="text" value={workOrderData.workType} onChange={handleChange} style={styles.input}/>
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="priority" style={styles.label}>Priority</label>
          <input id="priority" name="priority" type="number" value={workOrderData.priority} onChange={handleNumberChange} style={styles.input}/>
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="detail" style={styles.label}>Detail</label>
          <input id="detail" name="detail" type="text" value={workOrderData.detail} onChange={handleChange} style={styles.input}/>
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="preferredTime" style={styles.label}>Preferred Time</label>
          <input id="preferredTime" name="preferredTime" type="datetime-local" value={workOrderData.preferredTime} onChange={handleChange} style={styles.input}/>
        </div> 
        <div style={styles.inputGroup}>
          <label htmlFor="entryPermission" style={styles.label}>Entry Permission</label>
          <select id="entryPermission" name="entryPermission" value={workOrderData.entryPermission} onChange={handleChange} style={styles.input}>
            <option value="ALL_PERMISSIONS">{EntryPermission.ALL_PERMISSIONS}</option>
            <option value="CALLCONFIRM">{EntryPermission.CALLCONFIRM}</option>
            <option value="KNOCKDOOR">{EntryPermission.KNOCKDOOR}</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="accessInstruction" style={styles.label}>Access Instruction</label>
          <input id="accessInstruction" name="accessInstruction" type="text" value={workOrderData.accessInstruction} onChange={handleChange} style={styles.input}/>
        </div>
        <button type="submit" style={styles.ActionButton}>Submit WorkOrder</button>
      </form>
    </div>
  );
};

export default WorkOrderForm;
