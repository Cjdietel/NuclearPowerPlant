import { useEffect, useState } from 'react'
import './App.css'

import Nav from './components/Nav'
import NuclearBody from './components/NuclearBody'
import Graph from './components/Graph'
import SystemLogs from './components/SystemLogs'

function App() {
  const [latestIds, setLatestIds] = useState([]);

  useEffect(() => {
    const getReactor = async () => {
      try {
        const rawDataReactor = await fetch("https://nuclear.dacoder.io/reactors?apiKey=a42ff3098bd8736d", {
          method: "GET",
        });

        const jsonData = await rawDataReactor.json();
        const reactorIds = jsonData.reactors.map((reactor) => JSON.stringify(reactor.id));

        setLatestIds(reactorIds);

      } catch (error) {
        console.error("Error fetching reactor data:", error);
      }
    };

    // Fetch data when the component mounts
    getReactor();
    

    const intervalId = setInterval(() => {
      getReactor()
    }, 300);

    // cleanup interval
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Nav />
      <NuclearBody ids={latestIds}/>
      <Graph />
      <SystemLogs />
    </>
  )
}

export default App
