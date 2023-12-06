import { useState, useEffect } from "react"
const ReactorView = (props) => {
    const { ReactorView, setReactorView, reactorViewID, state } = props

    const [viewName, setViewName] = useState("")
    const [reactorState, setReactorState] = useState("")

    useEffect(() => {
        for (let value of state) {
            if (value.id == reactorViewID) {
                setViewName(value.name)
                setReactorState(value.state)
            }
        }
        console.log(viewName)
    
    },[state])
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2em"
            }}>
            <div style={{
                width: "96%",
                height: "100%",
                background: "#BFD7EA"
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "40em",
                        height: "100%",
                        paddingBottom: "2em",
                        paddingTop: "2em"
                    }}>
                        <h2 style={{color:"black"}}>{viewName}</h2>
                        <div style={{
                            width: "25em",
                            height: "32em"
                        }}>
                            <img src="/src/assets/npp2.png" width="100%" height="100%"/>
                        </div>
                        <div>
                            <h2 style={{color:"black"}}>{reactorState}</h2>
                        </div>

                    </div>
            </div>


        </div>
    )
}

export default ReactorView