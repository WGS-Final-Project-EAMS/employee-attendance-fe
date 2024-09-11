import EmployeeLayout from "../../layouts/EmployeeLayout";
import LeaveRequestTable from "../../components/LeaveRequestTable";

const ApplicationForPermit = () => {

    return (
        <EmployeeLayout>
            <LeaveRequestTable title="Application for Permit" filterStatus={['pending']} />
        </EmployeeLayout>
    );
};

export default ApplicationForPermit;