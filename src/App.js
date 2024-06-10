import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './AUTH/Login';
import Main from './Pages/Main';
import Home from './Pages/Home';
import Search from './Pages/About'; // Assuming About is meant to be Search
import Contact from './Pages/Contact';
import { ConnectedComponent } from './store/store'; // Assuming this is a component
import { UserProvider } from './AUTH/userContext'; // Import UserProvider

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/main' element={<Main />}>
              <Route path='home' element={<Home />} />
              <Route path='search' element={<Search />} /> {/* Assuming About is meant to be Search */}
              <Route path='contact' element={<Contact />} />
              <Route path='count' element={<ConnectedComponent />} />
            </Route>
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
