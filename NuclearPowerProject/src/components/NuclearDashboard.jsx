const NuclearDashboard = () => {
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
            <h2>Output: 0 GW</h2>
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
            <h2>Avg. Temp: 0 C</h2>
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
            <h2>Coolant (ON/OFF)</h2>
        </div>
        <h1>Nuclear Dashboard</h1>
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
            <h1>RESET</h1>
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
            <h3>CONTROLLED SHUTDOWN</h3>
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
            <h3>EMERGENCY SHUTDOWN</h3>
        </div>

        </div>
    )
}

export default NuclearDashboard