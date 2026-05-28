import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
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
import AudioManagement from './admin/pages/AudioManagement';
import AnnouncementManagement from './admin/pages/AnnouncementManagement';
import QuoteManagement from './admin/pages/QuoteManagement';
import DuaManagement from './admin/pages/DuaManagement';
import AdhkarManagement from './admin/pages/AdhkarManagement';
import ScholarManagement from './admin/pages/ScholarManagement';
import TagManagement from './admin/pages/TagManagement';

// New user pages
import DuaPage from './pages/DuaPage';
import AdhkarPage from './pages/AdhkarPage';
import BookmarksPage from './pages/BookmarksPage';
import AudioHadithsPage from './pages/AudioHadithsPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import IslamicQuotesPage from './pages/IslamicQuotesPage';
import ScholarsPage from './pages/ScholarsPage';
import AboutPage from './pages/AboutPage';
import VolunteerPage from './pages/VolunteerPage';
import ContactPage from './pages/ContactPage';
import HelpPage from './pages/HelpPage';
import PrivacyPage from './pages/PrivacyPage';

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
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}>
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
          <Route path="audio" element={<AudioManagement />} />
          <Route path="announcements" element={<AnnouncementManagement />} />
          <Route path="quotes" element={<QuoteManagement />} />
          <Route path="duas-admin" element={<DuaManagement />} />
          <Route path="adhkar-admin" element={<AdhkarManagement />} />
          <Route path="scholars" element={<ScholarManagement />} />
          <Route path="tags" element={<TagManagement />} />
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
          <Route path="/duas" element={<DuaPage />} />
          <Route path="/adhkar" element={<AdhkarPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/audio-hadiths" element={<AudioHadithsPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/quotes" element={<IslamicQuotesPage />} />
          <Route path="/scholars" element={<ScholarsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/volunteer" element={<VolunteerPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Route>
      </Routes>
    </div>
    </GoogleOAuthProvider>
  );
}

export default App;
