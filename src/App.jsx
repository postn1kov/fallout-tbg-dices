import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Table } from './Table/Table'
import { ResultsList } from './ResultsList/ResultsList'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Table />} />
        <Route path='/results' element={<ResultsList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
