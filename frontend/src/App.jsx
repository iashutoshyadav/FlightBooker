import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './components/layouts/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import FlightSearch from './pages/FlightSearch';
import BookingPage from './pages/BookingPage';
import BookingHistory from './pages/BookingHistory';
import BookingDetails from './pages/BookingDetails';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  const { token } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route 
          path="login" 
          element={token ? <Navigate to="/search" replace /> : <Login />} 
        />
        <Route 
          path="register" 
          element={token ? <Navigate to="/search" replace /> : <Register />} 
        />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="search" element={<FlightSearch />} />
          <Route path="booking/:flightId" element={<BookingPage />} />
          <Route path="booking-details/:id" element={<BookingDetails />} />
          <Route path="history" element={<BookingHistory />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;