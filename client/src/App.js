import './App.css';
import LoginPage from './pages/login';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import RegisterPage from './pages/register'
import SelectedItemPage from './pages/selected_item'
import { GlobalStateProvider } from './stores/sessionStores';

function App() {
  return (
    <>
      <GlobalStateProvider>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/selected" element={<SelectedItemPage/>} />
        </Routes>
      </GlobalStateProvider>
       
    </>
  );
}

export default App;
