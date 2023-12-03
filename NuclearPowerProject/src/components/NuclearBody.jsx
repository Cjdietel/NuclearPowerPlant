import NuclearDashboard from "./NuclearDashboard"

const NuclearBody = () => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2em"
            }}>
                <div style={{
                width:"96%",
                background: "#BFD7EA",
                height: "60em"
            }}>
                <NuclearDashboard />
            </div>

        </div>
    )
}

export default NuclearBody