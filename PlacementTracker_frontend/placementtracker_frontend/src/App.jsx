import StudentApplyForm from './components/StudentApplyForm';
import StudentApplications from './components/StudentApplications';
import AdminApplications from './components/AdminApplications';

function App() {
  return (
    <div>
      <h1>Placement Tracker</h1>

      <h2>Student Apply</h2>
      <StudentApplyForm />

      <h2>Student Applications</h2>
      <StudentApplications />

      <h2>Admin Panel</h2>
      <AdminApplications />
    </div>
  );
}

export default App;
