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
            <h4>Output: 0 GW</h4>
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
            <h4>Avg. Temp: 0 C</h4>
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