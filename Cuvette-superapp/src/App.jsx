import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import Category from './Components/Category'
import Dashboard from './Components/Dashboard'

const App = () => {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/categories" element={<Category/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
   </Router>
  //  next route is "categories"
  )
}

export default App