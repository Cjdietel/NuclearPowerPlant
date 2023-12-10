import { useEffect, useState } from 'react'
import './App.css'

import Nav from './components/Nav'
import NuclearBody from './components/NuclearBody'
import Graph from './components/Graph'
import SystemLogs from './components/SystemLogs'

function App() {
  const [latestIds, setLatestIds] = useState([]);
  const [reactorView, setReactorView] = useState(false)
  const [viewName, setViewName] = useState("")
  const [name, setName] = useState("My Nuclear Power Plant")


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
      <Nav reactorView={reactorView} setReactorView={setReactorView} viewName={viewName} name={name}/>
      <NuclearBody ids={latestIds} reactorView={reactorView} setReactorView={setReactorView} viewName={viewName} setViewName={setViewName} setName={setName}/>
      { !reactorView && <Graph />}
      { !reactorView && <SystemLogs />}
    </>
  )
}

export default App
