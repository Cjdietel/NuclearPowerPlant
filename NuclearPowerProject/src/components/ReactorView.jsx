import { useState, useEffect, useRef } from "react"
import { Chart } from "chart.js/auto";
import Button from '@mui/material/Button';
const ReactorView = (props) => {
    const { reactorViewID, state, viewName, setViewName } = props

    const canvasref = useRef(null)
    const [reactorState, setReactorState] = useState("")
    const [coolantState, setCoolantState] = useState(true)
    const [coolant, setCoolant] = useState(coolantState)
    const [loweredRods, setLoweredRods] = useState(0)
    const [raisedRods, setRaisedRods] = useState(0)
    const [temp, setTemp] = useState(0)
    const [tempStatus, setTempStatus] = useState("")
    const [fuel, setFuel] = useState(0)
    const [output, setOutput] = useState(0)
    const [maintenanceMode, setMaintenanceMode] = useState(false)
    const [tempArray, setTempArray] = useState(Array(600).fill(null))

    useEffect(() => {
        for (let value of state) {
            if (value.id == reactorViewID) {
                setViewName(value.name)
                setReactorState(value.state)
            }
        }
        const getCoolantState = async () => {
            for (let value of state) {
                if (value.id == reactorViewID) {
                    const rawData = await fetch(`https://nuclear.dacoder.io/reactors/coolant/${value.id}?apiKey=a42ff3098bd8736d`)
                    const jsonData = await rawData.json()
                    setCoolantState(jsonData.coolant)
                }
            }
            }
            const getRodState = async () => {
                for (let value of state) {
                    if (value.id == reactorViewID) {
                        const rawData = await fetch(`https://nuclear.dacoder.io/reactors/rod-state/${value.id}?apiKey=a42ff3098bd8736d`)
                        const jsonData = await rawData.json()
                        setLoweredRods(jsonData.control_rods.in)
                        setRaisedRods(jsonData.control_rods.out)
                    }
                }
                }
                const getTemp = async () => {
                    for (let value of state) {
                        if (value.id == reactorViewID) {
                            const rawData = await fetch(`https://nuclear.dacoder.io/reactors/temperature/${value.id}?apiKey=a42ff3098bd8736d`)
                            const jsonData = await rawData.json()
                            setTemp(jsonData.temperature.amount)
                            setTempStatus(jsonData.temperature.status)
                        }
                    }
                }
                const getAvgTemp = async () => {
                    for (let value of state) {
                        if (value.id == reactorViewID) {
                            const rawData = await fetch(`https://nuclear.dacoder.io/reactors/temperature/${value.id}?apiKey=a42ff3098bd8736d`)
                            const jsonData = await rawData.json()
                            setTempArray(prevTemp => {if (tempArray.length >= 20) {
                                prevTemp.shift()
                                return [...prevTemp, jsonData.temperature.amount]
                            }
                            else {
                            return  [...prevTemp, jsonData.temperature.amount]

                            }})
                        }
                    }
                }
                    const getFuel = async () => {
                for (let value of state) {
                    if (value.id == reactorViewID) {
                        const rawData = await fetch(`https://nuclear.dacoder.io/reactors/fuel-level/${value.id}?apiKey=a42ff3098bd8736d`, {
                            method: "GET"
                        })
                        const jsonData = await rawData.json()
                        setFuel(jsonData.fuel.percentage)
                    }
                }
            }
            
            const getOutput = async () => {
                for (let value of state) {
                    if (value.id == reactorViewID) {
                        const rawData = await fetch(`https://nuclear.dacoder.io/reactors/output/${value.id}?apiKey=a42ff3098bd8736d`, {
                            method: "GET"
                        })
                        const jsonData = await rawData.json()
                        setOutput(jsonData.output.amount)
                    }
                }
            }
            getTemp()
            getRodState()
            getCoolantState()
            getFuel()
            getOutput()
            getAvgTemp()
            const chart = new Chart(canvasref.current, {
                type: 'line',
                data: {
                  labels: tempArray.map((_, index) => index),
                  datasets: [{
                    yAxisID: "yAxis",
                    label: 'Avg Temp',
                    data: tempArray,
                    borderWidth: 2,
                  }]
                },
                options: {
                    scales: {
                        yAxis: {
                            min: 0,
                            max: 1000
                        }
                    },
                  elements: {
                    point: {
                        pointStyle: false
                    }
                  },
                  animation: false,
                  maintainAspectRatio: true
                }
              })
          
              return () => {
                chart.destroy()
              }
              
    },[state])

    const handleLowerRod = async () => {
        for (let value of state) {
            if (value.id == reactorViewID) {
                const rawData = await fetch(`https://nuclear.dacoder.io/reactors/drop-rod/${value.id}?apiKey=a42ff3098bd8736d`, {
                    method: "POST"
                })
            }
        }
    }
    const handleRaiseRod = async () => {
        for (let value of state) {
            if (value.id == reactorViewID) {
                const rawData = await fetch(`https://nuclear.dacoder.io/reactors/raise-rod/${value.id}?apiKey=a42ff3098bd8736d`, {
                    method: "POST"
                })
            }
        }
    }
    const handleCoolant = async () => {
        for (let value of state) {
            if (value.id == reactorViewID) {
                const rawData = await fetch(`https://nuclear.dacoder.io/reactors/coolant/${value.id}?apiKey=a42ff3098bd8736d`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                      },
                    body: JSON.stringify({coolant: coolant ? "off" : "on"})
                })
            }
        }
        setCoolant(!coolant)
    }
    const handleControlledShutdown = async () => {
        for (let value of state) {
            if (value.id == reactorViewID) {
                const rawData = await fetch(`https://nuclear.dacoder.io/reactors/controlled-shutdown/${value.id}?apiKey=a42ff3098bd8736d`, {
                    method: "POST"
                })
            }
        }
    }
    const handleEmergencyShutdown = async () => {
        for (let value of state) {
            if (value.id == reactorViewID) {
                const rawData = await fetch(`https://nuclear.dacoder.io/reactors/emergency-shutdown/${value.id}?apiKey=a42ff3098bd8736d`, {
                    method: "POST"
                })
            }
        }
    }
    const handleStartReactor = async () => {
        for (let value of state) {
            if (value.id == reactorViewID) {
                const rawData = await fetch(`https://nuclear.dacoder.io/reactors/start-reactor/${value.id}?apiKey=a42ff3098bd8736d`, {
                    method: "POST"
                })
            }
        }
        if (maintenanceMode) {
            setMaintenanceMode(false)
        }
    }
    const handleRefuel = async () => {
        for (let value of state) {
            if (value.id == reactorViewID) {
                const rawData = await fetch(`https://nuclear.dacoder.io/reactors/refuel/${value.id}?apiKey=a42ff3098bd8736d`, {
                    method: "POST"
                })
            }
        }
    }
    const handleMaintenance = async () => {
        for (let value of state) {
            if (value.id == reactorViewID) {
                const rawData = await fetch(`https://nuclear.dacoder.io/reactors/maintenance/${value.id}?apiKey=a42ff3098bd8736d`, {
                    method: "POST"
                })
                setMaintenanceMode(!maintenanceMode)
            }
        }
    }
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
                        <div style={{display: "flex",flexDirection:"column", alignItems: "center"}}>
                        <h2 style={{color: "black"}}>{tempStatus}</h2>
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
                            <Button variant="contained"  className="controlButton" onClick={handleLowerRod}>Lower Rod</Button>
                            <Button variant="contained"  className="controlButton" onClick={handleRaiseRod}>Raise Rod</Button>
                            <Button variant="contained"  className="controlButton" onClick={handleCoolant}>{coolant ? "Turn Coolant Off" : "Turn Coolant On"}</Button>
                            <Button variant="contained"  className="controlButton" onClick={handleEmergencyShutdown}>Emergency Shutdown</Button>
                            <Button variant="contained"  className="controlButton" onClick={handleControlledShutdown}>Controlled Shutdown</Button>
                            <Button variant="contained"  className="controlButton" onClick={handleRefuel}>REFUEL</Button>
                            <Button variant="contained"  className="controlButton" onClick={handleMaintenance}>{maintenanceMode ? "Turn Maintenance Mode Off" : "Turn Maintenance Mode On"}</Button>
                            <Button variant="contained"  className="controlButton" onClick={handleStartReactor}>START REACTOR</Button>
                        </div>
                        <div style={{
                            width: "90%",
                            height: "15em",
                            background: "white",
                            marginTop: "2em",
                            marginRight: "5em",
                            marginLeft: "5em",
                            display: "flex"
                        }}>
                            <div style={{
                                width: "50%",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                color: "black",
                                alignItems: "center",

                            }}>
                                <h2>Rods Raised: {raisedRods}</h2>
                                <h2>Rods Lowered: {loweredRods}</h2>
                                <h2>Temp: {temp.toFixed(2)}°C</h2>

                            </div>
                            <div style={{
                                width: "50%",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                color: "black"

                            }}>
                                <h2>Liquid Coolant State: {coolantState}</h2>
                                <h2>Fuel Level: {fuel.toFixed(2)}%</h2>
                                <h2>Output: {output}MW</h2>

                            </div>
                        </div>
                        <canvas ref={canvasref} height="100px" width="400px" style={{border: "2px solid black"}}></canvas>

                    </div>
            </div>


        </div>
    )
}

export default ReactorView