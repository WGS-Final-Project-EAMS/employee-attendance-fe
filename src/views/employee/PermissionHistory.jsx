// PermissionHistory.js
import EmployeeLayout from "../../layouts/EmployeeLayout";
import LeaveRequestTable from "../../components/LeaveRequestTable";

const PermissionHistory = () => {
    const title = "Permission History";
    return (
        <EmployeeLayout title={title}>
            <LeaveRequestTable title={title} filterStatus={['approved', 'rejected']} />
        </EmployeeLayout>
    );
};

export default PermissionHistory;