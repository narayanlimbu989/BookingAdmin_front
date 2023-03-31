import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Mainlayout from "./components/Mainlayout";
import Dashboard from "./pages/Dashboard";
import { useSelector } from "react-redux";
import AddHotels from "./pages/AddHotels";
import HotelsList from "./pages/HotelsList";
import AddRooms from "./pages/AddRooms";
import Roomslist from "./pages/Roomslist";
import Reservation from "./pages/Reservation";
import Signup from "./pages/SignUpPage";
import Homepage from "./pages/Homepage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Guestarea>
              <Homepage />
            </Guestarea>
          }
        />
        <Route
          path="/signup"
          element={
            <Guestarea>
              <Signup />
            </Guestarea>
          }
        />
        <Route
          path="/signin"
          element={
            <Guestarea>
              <Login />
            </Guestarea>
          }
        />
        <Route
          path="/admin"
          element={
            <Protectedarea>
              <Mainlayout />
            </Protectedarea>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="addhotels" element={<AddHotels />} />
          <Route path="hotelslist" element={<HotelsList />} />
          <Route path="addrooms" element={<AddRooms />} />
          <Route path="roomlist" element={<Roomslist />} />
          <Route path="reservation" element={<Reservation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const Guestarea = ({ children }) => {
  const { islogin, user } = useSelector((state) => state.Auth);
  if (islogin && user !== null) {
    return <Navigate to="/admin" />;
  }
  return children;
};

const Protectedarea = ({ children }) => {
  const { user, islogin } = useSelector((state) => state.Auth);
  if (islogin && user !== null) {
    return children;
  }
  return <Navigate to="/" />;
};

export default App;
