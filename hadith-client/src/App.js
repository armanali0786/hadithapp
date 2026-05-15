import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './Dashboard';
import HadithDetails from './pages/HadithDetails';
import HadithList from './pages/HadithList';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import DynamicQuiz from './pages/DynamicQuiz';
import HadithSlider from './pages/HadithSlider';
import HadithTest from './pages/HadithTest';
import SadaqahPage from './pages/SadaqahPage';
import DonorListPage from './pages/DonorListPage';

// Admin
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import PrivateRoute from './admin/PrivateRoute';
import AdminDashboard from './admin/pages/AdminDashboard';
import SliderManagement from './admin/pages/SliderManagement';
import CollectionManagement from './admin/pages/CollectionManagement';
import HadithManagement from './admin/pages/HadithManagement';
import QuizManagement from './admin/pages/QuizManagement';
import QuizSetManagement from './admin/pages/QuizSetManagement';
import OrganizationManagement from './admin/pages/OrganizationManagement';

// User layout wrapper (includes Navbar)
function UserLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Admin routes — no Navbar */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute adminOnly>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="slider" element={<SliderManagement />} />
          <Route path="collections" element={<CollectionManagement />} />
          <Route path="hadiths" element={<HadithManagement />} />
          <Route path="quiz" element={<QuizManagement />} />
          <Route path="quiz-sets" element={<QuizSetManagement />} />
          <Route path="organizations" element={<OrganizationManagement />} />
        </Route>

        {/* User routes — with Navbar */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/quiz" element={<DynamicQuiz />} />
          <Route path="/hadith-list" element={<HadithList />} />
          <Route path="/hadith-details" element={<HadithDetails />} />
          <Route path="/slider" element={<HadithSlider />} />
          <Route path="/test" element={<HadithTest />} />
          <Route path="/donation" element={<SadaqahPage />} />
          <Route path="/donation-list" element={<DonorListPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
