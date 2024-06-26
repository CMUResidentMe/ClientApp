import React, { useState } from "react";
import PropTypes from 'prop-types';
import { EntryPermission, Priority } from '../../data/workOrderData.js';
import { gql, useMutation } from '@apollo/client';
import styles from './WorkOrderCSS.jsx';
import ImageUpload from './ImageUpload.jsx'
import { PrivilegeType } from '../../data/userData.js';
import styled from '@emotion/styled';
import { Modal, Box, Typography, Button } from '@mui/material';
import { queryWKsByAssignedStaff, workOrdersByStatus } from './StaffGraphQL.js'

const assignedStaff_mutation = gql`
  mutation assignWorkOrderStaff($uuid: String!) {
    assignWorkOrderStaff(uuid: $uuid){
      uuid
      semanticId
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
      createTime
    }
  }
  `;

const unAssignedStaff_mutation = gql`
  mutation unassignWorkOrderStaff($uuid: String!) {
    unassignWorkOrderStaff(uuid: $uuid){
      uuid
      semanticId
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
      createTime
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

const WorkOrderFormStaff = ({ currentWK, isAssign, closeModal }) => {
    const [workOrderData, setWorkOrderData] = useState({
        workType: currentWK ? currentWK['workType'] : "",
        priority: currentWK ? currentWK['priority'] : "",
        detail: currentWK ? currentWK['detail'] : "",
        preferredTime: (currentWK && currentWK['preferredTime'] !== null) ? currentWK['preferredTime'] : "",
        entryPermission: (currentWK && currentWK['entryPermission'] !== null) ? currentWK['entryPermission'] : "NA",
        accessInstruction: (currentWK && currentWK['accessInstruction'] !== null) ? currentWK['accessInstruction'] : "NA",
        images: (currentWK && currentWK['images'] !== null) ? currentWK['images'] : [],
        assignedStaff: (currentWK && currentWK['assignedStaff'] !== null) ? currentWK['assignedStaff'] : "NA",
    });

    const [stateError, setStateError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [assignedStaffMutation, { dataAssign, loadingAssign, errorAssign }] = useMutation(assignedStaff_mutation,
        {
            refetchQueries: [
                {query: queryWKsByAssignedStaff}, // DocumentNode object parsed with gql 
                {
                    query: workOrdersByStatus,
                    variables: { 
                        status: "OPEN"
                    },
                },
            ],
        }
    );
    const [unAssignedStaffMtation, { dataunAssign, loadingunAssign, errorunAssign }] = useMutation(unAssignedStaff_mutation,
        {
            refetchQueries: [
                {query: queryWKsByAssignedStaff}, // DocumentNode object parsed with gql 
                {
                    query: workOrdersByStatus,
                    variables: { 
                        status: "OPEN"
                    },
                },
            ],
        }
    );

    if (!currentWK) {
        return <></>;
    }

    const isStaff = (localStorage.getItem("privilege") === PrivilegeType.staff);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWorkOrderData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleTakeWK = async (e) => {
        e.preventDefault();
        setStateError("");
        console.log("handleTakeWK called")
        if (isAssign) {
            try {
                assignedStaffMutation({ variables: { uuid: currentWK.uuid } });
                if (loadingAssign) stateError('Submitting...');
                if (errorAssign) stateError(errorAssign.message);
                setModalOpen(true);
                setTimeout(() => {
                    setModalOpen(false);
                    // onSubmissionSuccess();
                }, 4000);
            } catch (error) {
                const errorMessage =
                    error?.response?.errors?.[0]?.message ||
                    "An error occurred while trying to create work order.";
                setStateError(errorMessage);
            }
        } else {
            try {
                unAssignedStaffMtation({ variables: { uuid: currentWK.uuid } });
                if (loadingunAssign) stateError('Submitting...');
                if (errorunAssign) stateError(errorunAssign.message);
                setModalOpen(true);
                setTimeout(() => {
                    setModalOpen(false);
                    // onSubmissionSuccess();
                }, 4000);
            } catch (error) {
                const errorMessage =
                    error?.response?.errors?.[0]?.message ||
                    "An error occurred while trying to create work order.";
                setStateError(errorMessage);
            }
        }
        closeModal();
    };

    return (
        <ContentContainer>
            {isAssign &&
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
            }
            {!isAssign &&
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
                            You are not taking this work order anymore. The work order owner is noticed.
                        </Typography>
                    </Box>
                </Modal>
            }
            <form style={styles.form} onSubmit={handleTakeWK}>
                <div style={styles.formColumn}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="semanticId" style={styles.label}>Work Order Number</label>
                        <input readOnly id="semanticId" name="semanticId" style={{ ...styles.input, resize: 'none' }} value={currentWK && currentWK.semanticId} />
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
                        <input 
                            readOnly 
                            id="assignedStaff" 
                            name="assignedStaff" 
                            style={{ ...styles.input, resize: 'none' }} 
                            value={currentWK.staffInfo ? `${currentWK.staffInfo.firstName || ''} ${currentWK.staffInfo.lastName || ''}`.trim() : 'NA'}  
                        />
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
                        <ImageUpload images={currentWK && currentWK.images} freezeForStaff={isStaff} />
                    </div>
                </div>
                {isAssign &&
                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <button type="submit" style={styles.ActionButton}>Take this work order</button>
                    </div>
                }
                {!isAssign &&
                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <button type="submit" style={styles.ActionButton}>I am not taking this order</button>
                    </div>
                }
            </form>
        </ContentContainer>
    );
};

WorkOrderFormStaff.propTypes = {
    currentWK: PropTypes.object.isRequired
};

export default WorkOrderFormStaff;
