import { useState, useEffect } from "react"
const ReactorView = (props) => {
    const { reactorViewID, state, viewName, setViewName } = props

    const [reactorState, setReactorState] = useState("")

    useEffect(() => {
        for (let value of state) {
            if (value.id == reactorViewID) {
                setViewName(value.name)
                setReactorState(value.state)
            }
        }
    
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
                background: "#BFD7EA",
                display: "flex"
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
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                        height: "100%"
                    }}>
                        <div id="wrapDiv" style={{
                            display: "flex",
                            flexWrap: "wrap",
                            
                        }}>
                            <button className="controlButton" style={{
                                color: "black",
                            }}>Lower Rod</button>
                            <button className="controlButton" style={{
                                color: "black",
                            }}>Raise Rod</button>
                            <button className="controlButton" style={{
                                color: "black",
                            }}>Coolant ON/OFF</button>
                            <button className="controlButton" style={{
                                color: "black",
                            }}>Emergency Shutdown</button>
                            <button className="controlButton" style={{
                                color: "black",
                            }}>Controlled Shutdown</button>
                            <button className="controlButton" style={{
                                color: "black",
                            }}>REFUEL</button>
                        </div>
                        <div style={{
                            width: "90%",
                            height: "15em",
                            background: "white",
                            marginTop: "2em",
                            marginRight: "5em",
                            marginLeft: "5em"
                        }}></div>

                    </div>
            </div>


        </div>
    )
}

export default ReactorView