// import EmployeeLayout from "../../layouts/EmployeeLayout";
import LeaveRequestTable from "../../components/LeaveRequestTable";

const ApplicationForPermit = () => {
    const title = "Application for Permit";

    return (
        <LeaveRequestTable title={title} filterStatus={['pending']} />
        // <EmployeeLayout title={title}>
        // </EmployeeLayout>
    );
};

export default ApplicationForPermit;