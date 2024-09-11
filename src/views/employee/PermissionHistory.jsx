// PermissionHistory.js
import EmployeeLayout from "../../layouts/EmployeeLayout";
import LeaveRequestTable from "../../components/LeaveRequestTable";

const PermissionHistory = () => {
    return (
        <EmployeeLayout>
            <LeaveRequestTable title="Permission History" filterStatus={['approved', 'rejected']} />
        </EmployeeLayout>
    );
};

export default PermissionHistory;