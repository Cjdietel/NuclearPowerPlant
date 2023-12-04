import { useState } from 'react'
import './App.css'
import Nav from './components/Nav'
import NuclearBody from './components/NuclearBody'
import Graph from './components/Graph'
import SystemLogs from './components/SystemLogs'

function App() {

  return (
    <>
      <Nav />
      <NuclearBody />
      <Graph />
      <SystemLogs />
    </>
  )
}

export default App
