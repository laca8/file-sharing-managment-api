

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignInForm from './pages/auth/Sign'
import Share from './pages/file-share/Shar'
import Folder from './pages/file-share/Folder'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignInForm />}></Route>
        <Route path='/share' element={<Share />}></Route>
        <Route path='/share/:name' element={<Folder />}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
