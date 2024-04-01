import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import Post from "./pages/Post";
import UpdateListing from "./components/UpdateListing";
import Favorites from "./pages/Favorites";
import Search from "./pages/Search";
import HomeTwo from "./pages/HomeTwo";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state: any) => state.user.currentUser);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeTwo />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/post/:id" element={<Post />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<CreateListing />} />
          <Route path="/update/:id" element={<UpdateListing />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
        <Route path="/signin" element={user ? <Navigate to="/" /> : <SignIn /> } />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp /> } />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
