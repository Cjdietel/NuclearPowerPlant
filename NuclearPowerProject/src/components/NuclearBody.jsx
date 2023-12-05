import NuclearDashboard from "./NuclearDashboard";
import Reactor from "./Reactor";
import { useEffect, useState } from "react";

const NuclearBody = (props) => {
  const { ids } = props;
  const [state, setState] = useState([]);
  const [reactorView, setReactorView] = useState([])

  useEffect(() => {
    const initialReactorView = ids.map((id) => ([{
        id: id,
        viewing: false
      }]));
      
      setReactorView(initialReactorView);
    const fetchData = async () => {
       

        console.log(reactorView)
      try {
        const rawData = await fetch("https://nuclear.dacoder.io/reactors?apiKey=a42ff3098bd8736d", {
          method: "GET",
        });
        const jsonData = await rawData.json();

        const reactorData = await Promise.all(
          ids.map(async (id) => {
            const reactor = jsonData.reactors.find((reactor) => JSON.stringify(reactor.id) === id);
            const cleanedId = id.replace(/['"]+/g, "");
            const stateResponse = await fetch(
              `https://nuclear.dacoder.io/reactors/reactor-state/${cleanedId}?apiKey=a42ff3098bd8736d`,
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
    <div
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
        <NuclearDashboard />
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
            <Reactor key={index} id={state.id} name={reactor.name} state={reactor.state} setReactorView={setReactorView} reactorView={reactorView} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NuclearBody;
