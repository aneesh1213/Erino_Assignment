import { useState } from 'react'
import React from 'react';
import reactLogo from './assets/react.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import viteLogo from '/vite.svg'
import './App.css'
import Register from './ContactForm.jsx'


function App() {


  return (
      
      <Router>
          <Routes>
            <Route path="/" element={<Register />} />
          </Routes>
      </Router>

  )
}

export default App
