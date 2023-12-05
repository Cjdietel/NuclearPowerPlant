import NuclearDashboard from "./NuclearDashboard"
import Reactor from "./Reactor"
import { useEffect, useState } from "react"






const NuclearBody = (props) => {

    const { ids } = props
    const [names, setNames] = useState([])

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
    
        getName()
    }, [ids])

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2em",
            }}>
                <div style={{
                width:"96%",
                background: "#BFD7EA",
                height: "60em"
            }}>
                <NuclearDashboard />
                <div style={{
                    display: "flex",
                    height: "100%",
                    gap: "10em",
                    alignItems: "center",
                    overflowX: "scroll"
                }}>
                {names.map((name, index) => {
                    return <Reactor key={index} name={name} />
                })}
                </div>
            </div>
            

        </div>
    )
}

export default NuclearBody