import {BrowserRouter , Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import Post from './pages/Post';
import UpdateListing from './components/UpdateListing';
import Favorites from './pages/Favorites';
import Search from './pages/Search';
import HomeTwo from './pages/HomeTwo';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/home2" element={<HomeTwo/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/post/:id" element={<Post />} />
        <Route element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/create" element={<CreateListing/>} />
          <Route path="/update/:id" element={<UpdateListing/>} />
          <Route path="/favorites" element={<Favorites/>} />
        </Route>
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
