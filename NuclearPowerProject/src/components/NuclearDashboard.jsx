import { useState, useEffect } from "react"
const NuclearDashboard = (props) => {

    const { ids, avgTemp, tempUnit } = props

    const [output, setOutput] = useState(0)
    const [temp, setTemp] = useState(0)
    const [coolant, setCoolant] = useState(false)

    useEffect(() => {
        const getOutput = async () => {
            let tempOutput = 0
            for (let id of ids) {
                try {
                    const cleanedId = id.replace(/['"]+/g, "");
                    const rawOutputData = await fetch(`https://nuclear.dacoder.io/reactors/output/${cleanedId}?apiKey=a42ff3098bd8736d`)
                    const outputJson = await rawOutputData.json()
                    tempOutput += outputJson.output.amount
                }
                catch (error) {
                    console.error("Error fetching reactor data:", error);
                }
            }
            setOutput(tempOutput)
        }
        getOutput()

    }, [ids])


    return (
        <div style={{
            width: "100%",
            height: "5em",
            background: "#0b3954",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly"

        }}>
        
        <div style={{
                height: "3em",
                width: "10%",
                background: "#E0FF4f",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
                outline: "3px solid black"


                
        }}>
            <h4>Output: {output.toFixed(2)} GW</h4>
        </div>
        
        <div style={{
                height: "3em",
                width: "10%",
                background: "#E0FF4f",
                color: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
                outline: "3px solid black"

                
        }}>
            <h4>Avg. Temp: {avgTemp.toFixed(2)} {tempUnit == "celsius" ? "C": "F"}</h4>
        </div>
        
        <div style={{
                height: "3em",
                width: "10%",
                background: "#E0FF4f",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
                outline: "3px solid black"

                
        }}>
            <h4>Coolant (ON/OFF)</h4>
        </div>
        <h3>Nuclear Dashboard</h3>
        <div style={{
                height: "3em",
                width: "10%",
                background: "#E0FF4f",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "blue",
                outline: "3px solid black"
                
        }}>
            <h3>RESET</h3>
        </div>
            <div style={{
                height: "3em",
                width: "10%",
                background: "#E0FF4f",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "green",
                outline: "3px solid black"

                
        }}>
            <h5>CONTROLLED SHUTDOWN</h5>
        </div>
            <div style={{
                height: "3em",
                width: "10%",
                background: "#E0FF4f",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "red",
                outline: "3px solid black"

                
        }}>
            <h5>EMERGENCY SHUTDOWN</h5>
        </div>

        </div>
    )
}

export default NuclearDashboard