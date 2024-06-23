import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginSignupForm from '../src/Components/Login';
import SignupForm from '../src/Components/Register';
import ChatPage from './Components/Message';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginSignupForm />}></Route>
          <Route path='/register' element={<SignupForm />}></Route>
          <Route path='/chat' element={<ChatPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
