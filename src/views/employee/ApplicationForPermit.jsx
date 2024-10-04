import EmployeeLayout from "../../layouts/EmployeeLayout";
import LeaveRequestTable from "../../components/LeaveRequestTable";

const ApplicationForPermit = () => {
    const title = "Application for Permit";

    return (
        <EmployeeLayout title={title}>
            <LeaveRequestTable title={title} filterStatus={['pending']} />
        </EmployeeLayout>
    );
};

export default ApplicationForPermit;