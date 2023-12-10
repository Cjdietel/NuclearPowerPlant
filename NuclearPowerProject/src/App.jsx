import { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route, json} from 'react-router-dom'
import './App.css'

import Nav from './components/Nav'
import NuclearBody from './components/NuclearBody'
import Graph from './components/Graph'
import SystemLogs from './components/SystemLogs'
import ReactorView from './components/ReactorView'

function App() {
  const [latestIds, setLatestIds] = useState([]);
  const [reactorView, setReactorView] = useState(false)
  const [viewName, setViewName] = useState("")
  const [name, setName] = useState("My Nuclear Power Plant")
  const [rollingTempAvg, setRollingTempAvg] = useState(Array(600).fill(null))

  useEffect(() => {
    const getReactor = async () => {
      try {
        const rawDataReactor = await fetch("https://nuclear.dacoder.io/reactors?apiKey=a42ff3098bd8736d", {
          method: "GET",
        });

        const jsonData = await rawDataReactor.json();
        const reactorIds = jsonData.reactors.map((reactor) => reactor.id);
        setLatestIds(reactorIds)
      } catch (error) {
        console.error("Error fetching reactor data:", error);
      }
    };

    const intervalId = setInterval(getReactor, 500);

    // cleanup interval
    return () => clearInterval(intervalId);
  }, []);


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<div>
          <Nav reactorView={reactorView} setReactorView={setReactorView} viewName={viewName} name={name}/>
        <NuclearBody ids={latestIds} reactorView={reactorView} setReactorView={setReactorView} viewName={viewName} setViewName={setViewName} setName={setName} rollingTempAvg={rollingTempAvg} setRollingTempAvg={setRollingTempAvg}/>
        { !reactorView && <Graph rollingTempAvg={rollingTempAvg}/>}
        { !reactorView && <SystemLogs latestIds={latestIds}/>}
        </div>} />

          <Route path="/home" element={<div>
            <Nav reactorView={reactorView} setReactorView={setReactorView} viewName={viewName} name={name}/>
        <NuclearBody ids={latestIds} reactorView={reactorView} setReactorView={setReactorView} viewName={viewName} setViewName={setViewName} setName={setName} rollingTempAvg={rollingTempAvg} setRollingTempAvg={setRollingTempAvg}/>
        { !reactorView && <Graph rollingTempAvg={rollingTempAvg}/>}
        { !reactorView && <SystemLogs latestIds={latestIds}/>}
          </div>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
