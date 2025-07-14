import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import DashboardMock from './DashboardMock'
import DashboardAllTiles from './DashboardAllTiles.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/TestPreview">
      <Routes>
        <Route path="/" element={<DashboardMock />} />
        <Route path="/dashboard" element={<DashboardAllTiles />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
