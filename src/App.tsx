import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListPage from './pages/ListPage'
import AddPage from './pages/AddPage'

function App () {
  return (
    <section className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ListPage />} />
          <Route path='/add' element={<AddPage />} />
        </Routes>
      </BrowserRouter>
    </section>
  )
}

export default App
