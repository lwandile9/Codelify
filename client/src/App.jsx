import { Routes, Route } from 'react-router-dom';

// Importing Main Page Components
import './App.css';

import Home from './pages/home';
import Services from './pages/services';
import Blog from './pages/blog';
import Contact from './pages/contact';
import AdminPage from './pages/AdminPage';
import PageNotFound from './pages/PageNotFound';
import NavBar from './components/nav';
import AboutPage from './pages/about';
import Login  from './components/Login';
import Post from './components/post';

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path='/about' element={<AboutPage />} />
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<Services />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/post' element={<Post />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
