import { useState, useEffect } from "react"
import { useSnackbar } from "notistack";
const NuclearDashboard = (props) => {

    const { ids, avgTemp, tempUnit, setName } = props

    const [output, setOutput] = useState(0)
    const [temp, setTemp] = useState(0)
    const [input, setInput] = useState("")
    const { enqueueSnackbar } = useSnackbar()

    const addMessage = (response) => {
        if (response.response != "400") {
            enqueueSnackbar(response.message, {variant: "success"})
            console.log("success")
        }
        else {
            enqueueSnackbar(response.message, {variant: "error"})
            console.log("failure")
        }

    }

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

    const handleChangeInput = (event) => {
        const { value } = event.target
        setInput(value)
    }

    const changeName = async () => {
        console.log(input)
        const rawData = await fetch("https://nuclear.dacoder.io/reactors/plant-name?apiKey=a42ff3098bd8736d", {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              },
            body: JSON.stringify({name: input})
        })
        setName(input)
        if (JSON.stringify(rawData.status) != "400") {

            addMessage({
                message: "Plant successfully changed to " + input,
                response: JSON.stringify(rawData.status)
            })
        }
        else {
            addMessage({
                message: "Unsuccessfully changed name",
                response: JSON.stringify(rawData.status)
            })
        }
    }

    const handleReset = async () => {
        const rawData = await fetch("https://nuclear.dacoder.io/reactors/reset?apiKey=a42ff3098bd8736d", {
            method: "POST"
        })
        if (JSON.stringify(rawData.status) != "400") {

            addMessage({
                message: "Plant successfully reset",
                response: JSON.stringify(rawData.status)
            })
        }
        else {
            addMessage({
                message: "Plant reset not successful",
                response: JSON.stringify(rawData.status)
            })
        }
    }

    const handleControlledShutdown = async () => {
        for (let id of ids) {
            const rawData = await fetch(`https://nuclear.dacoder.io/reactors/controlled-shutdown/${id}?apiKey=a42ff3098bd8736d`, {
                method: "POST"
            })
            if (JSON.stringify(rawData.status) != "400") {

                addMessage({
                    message: "Plant Controlled Shutdown Successful",
                    response: JSON.stringify(rawData.status)
                })
            }
            else {
                console.log(rawData.status)
                addMessage({
                    message: "Plant Controlled Shutdown Unsuccessful",
                    response: JSON.stringify(rawData.status)
                })
            }
        }
    }
    const handleEmergencyShutdown = async () => {
        for (let id of ids) {
            const rawData = await fetch(`https://nuclear.dacoder.io/reactors/emergency-shutdown/${id}?apiKey=a42ff3098bd8736d`, {
                method: "POST"
            })
            if (JSON.stringify(rawData.status) != "400") {

                addMessage({
                    message: "Plant Emergency Shutdown Successful",
                    response: JSON.stringify(rawData.status)
                })
            }
            else {
                console.log(rawData.status)
                addMessage({
                    message: "Plant Emergency Shutdown Unsuccessful",
                    response: JSON.stringify(rawData.status)
                })
            }
        }
    }



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
        
        <div   style={{
                height: "3em",
                width: "10%",
                background: "#E0FF4f",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
                fontWeight: "bold",
                fontSize: "1em",
                outline: "3px solid black"                
            }}>
            <label for="nameChange">Change Plant Name</label>
            <div style={{display: "flex"}}>
                <input id="nameChange" placeholder="Change Name" style={{width: "70%"}} onChange={handleChangeInput}/>
                <button onClick={() => {changeName()}}>Submit</button>
            </div>
        </div>
        <h3>Nuclear Dashboard</h3>
        <div onClick={handleReset} style={{
                height: "3em",
                width: "10%",
                background: "#E0FF4f",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "blue",
                outline: "3px solid black",
                cursor: "pointer"
                
        }}>
            <h3>RESET</h3>
        </div>
            <div onClick={handleControlledShutdown} style={{
                height: "3em",
                width: "10%",
                background: "#E0FF4f",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "green",
                outline: "3px solid black",
                cursor: "pointer"

                
        }}>
            <h5>CONTROLLED SHUTDOWN</h5>
        </div>
            <div onClick={handleEmergencyShutdown} style={{
                height: "3em",
                width: "10%",
                background: "#E0FF4f",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "red",
                outline: "3px solid black",
                cursor: "pointer"

                
        }}>
            <h5>EMERGENCY SHUTDOWN</h5>
        </div>

        </div>
    )
}

export default NuclearDashboard