import { useEffect, useState } from 'react'
import './App.css'

import Nav from './components/Nav'
import NuclearBody from './components/NuclearBody'
import Graph from './components/Graph'
import SystemLogs from './components/SystemLogs'

function App() {

const [ids, setIds] = useState([])

useEffect(() => {
  const getReactor = async () => {
    const rawDataReactor = await fetch("https://nuclear.dacoder.io/reactors?apiKey=a42ff3098bd8736d", {
      method: "GET",
    })
  
    const jsonData = await rawDataReactor.json()

    for (const x of jsonData.reactors) {
      setIds(ids => [...ids, JSON.stringify(x.id)])
    }
  }
  getReactor()
},[])




  return (
    <>
      <Nav />
      <NuclearBody ids={ids}/>
      <Graph />
      <SystemLogs />
    </>
  )
}

export default App
