import NuclearDashboard from "./NuclearDashboard";
import ReactorView from "./ReactorView";
import Reactor from "./Reactor";
import { useEffect, useState } from "react";

const NuclearBody = (props) => {
  const { ids, reactorView, setReactorView, viewName, setViewName} = props;

  const [state, setState] = useState([]);
  const [reactorViewID, setReactorViewID] = useState("")
  const [tempArray, setTempArray] = useState([])
  const [avgTemp, setAvgTemp] = useState(0)
  const [tempUnit, setTempUnit] = useState("")


  useEffect(() => {
    const fetchData = async () => {
        setTempArray([])
        try {
        const rawData = await fetch("https://nuclear.dacoder.io/reactors?apiKey=a42ff3098bd8736d", {
          method: "GET",
        });
        const jsonData = await rawData.json();
        const tempData = await Promise.all(ids.map(async (id) => {
            const reactor = jsonData.reactors.find((reactor) => reactor.id === id);
            const tempResponse = await fetch(
              `https://nuclear.dacoder.io/reactors/temperature/${reactor.id}?apiKey=a42ff3098bd8736d`,
              {
                method: "GET",
              }
            );
            const tempData = await tempResponse.json();
            setTempArray(prevArray => [...prevArray, tempData])
          })
          
          
          )
          setTempUnit(tempArray[0].temperature.unit)
          setAvgTemp(tempArray.reduce((prev, curr) => {
            return prev + curr.temperature.amount
        }, 0))

        const reactorData = await Promise.all(
          ids.map(async (id) => {
            const reactor = jsonData.reactors.find((reactor) => reactor.id === id);
            const stateResponse = await fetch(
              `https://nuclear.dacoder.io/reactors/reactor-state/${reactor.id}?apiKey=a42ff3098bd8736d`,
              {
                method: "GET",
              }
            );
            const stateData = await stateResponse.json();

            return {
              id,
              name: reactor ? reactor.name : null,
              state: stateData.state,
            };
          })
        );
        setState(reactorData);
      } catch (error) {
        console.error("Error fetching reactor data:", error);
      }

    };
    fetchData();
  }, [ids]);


  return (
    (!reactorView ? <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "2em",
      }}
    >
      <div
        style={{
          width: "96%",
          background: "#BFD7EA",
          paddingBottom: "3em",
        }}
      >
        <NuclearDashboard ids={ids} avgTemp={avgTemp} tempUnit={tempUnit} />
        <div
          style={{
            display: "flex",
            height: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {state.map((reactor, index) => (
            <Reactor key={index} name={reactor.name} state={reactor} setReactorView={setReactorView} reactorView={reactorView} setReactorViewID={setReactorViewID}/>
          ))}
        </div>
      </div>
    </div>
    : 
    <ReactorView reactorViewID={reactorViewID} state={state} viewName={viewName} setViewName={setViewName} />
  ));
};

export default NuclearBody;
