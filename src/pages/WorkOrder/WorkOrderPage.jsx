import { PrivilegeType } from '../../data/userData.js';
import StaffWKPage from './StaffWKPage.jsx'
import ResidentWKPage from './ResidentWKPage.jsx';
import styles from './WorkOrderCSS.jsx';

const WorkOrderPage = () => {
  const isStaff = (localStorage.getItem("privilege") === PrivilegeType.staff);

  return (
    <div style={styles.container}>
      {isStaff && <StaffWKPage />}
      {!isStaff && <ResidentWKPage />}
    </div>
  );
};

export default WorkOrderPage;