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

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/post/:id" element={<Post />} />
        <Route element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/create" element={<CreateListing/>} />
          <Route path="/update/:id" element={<UpdateListing/>} />
        </Route>
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
