import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/scss/bootstrap.scss';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './Dashboard';
import HadithDetails from './pages/HadithDetails';
import HadithList from './pages/HadithList';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import DynamicQuiz from './pages/DynamicQuiz';
import HadithSlider from './pages/HadithSlider';
import HadithItem from './components/HadithItem';
import { HadithDb } from './data/HadithDb';
import HadithTest from './pages/HadithTest';
import SadaqahPage from './pages/SadaqahPage';
import DonorListPage from './pages/DonorListPage';

function App() {
  return (
    <div className="App">
      <div className="header">
        <Navbar />
      </div>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/" element={<Dashboard />} />
        {/* <Route path="/notes" element={<NotesApp />} /> */}
        <Route path="/quiz" element={<DynamicQuiz />} />
        <Route path="/hadith-list" element={<HadithList/>} />
        <Route path="/hadith-details" element={<HadithDetails/>} />
        <Route path="/slider" element={<HadithSlider/>} />
        <Route path="/test" element={<HadithTest/>} />
        <Route path="/donation" element={<SadaqahPage/>} />
        <Route path="/donation-list" element={<DonorListPage/>} />

        
        {/* <Route path="/learning" element={<Store />} /> */}
      </Routes>
    </div>
  );
}

export default App;
