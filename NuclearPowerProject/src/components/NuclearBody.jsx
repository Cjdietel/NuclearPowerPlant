import NuclearDashboard from "./NuclearDashboard"
import Reactor from "./Reactor"
import { useEffect, useState } from "react"






const NuclearBody = (props) => {

    const { ids } = props
    const [names, setNames] = useState([])
    const [states, setStates] = useState([])

    useEffect(() => {
        const getName = async () => {
            const rawData = await fetch("https://nuclear.dacoder.io/reactors?apiKey=a42ff3098bd8736d", {
              method: "GET",
            })
            const jsonData = await rawData.json()

            for (let i = 0; i < ids.length; i++) {
                const name = jsonData.reactors[i].name
                setNames(names => [...names, name])
            }
          }
          const getState = async () => {
            for (let id of ids) {
                id = id.replace(/['"]+/g, '')
                const rawData = await fetch(`https://nuclear.dacoder.io/reactors/reactor-state/${id}?apiKey=a42ff3098bd8736d`, {
                    method: "GET",
                  })
                let state = await rawData.json()
                state = state.state

                setStates(states => [...states, state])
            }
          }
    
        getName()
        getState()
    }, [ids])

    console.log(states)
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2em",
            }}>
                <div style={{
                width:"96%",
                background: "#BFD7EA",
                paddingBottom: "2em"
            }}>
                <NuclearDashboard />
                <div style={{
                    display: "flex",
                    height: "100%",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexWrap: "wrap",
                }}>
                {names.map((name, index) => {
                    return <Reactor key={index} name={name} state={states[index]} />
                })}
                </div>
            </div>
            

        </div>
    )
}

export default NuclearBody