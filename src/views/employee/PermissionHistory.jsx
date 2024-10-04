// PermissionHistory.js
// import EmployeeLayout from "../../layouts/EmployeeLayout";
import LeaveRequestTable from "../../components/LeaveRequestTable";

const PermissionHistory = () => {
    const title = "Permission History";
    return (
        <LeaveRequestTable title={title} filterStatus={['approved', 'rejected']} />
        // <EmployeeLayout title={title}>
        // </EmployeeLayout>
    );
};

export default PermissionHistory;