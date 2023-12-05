const Reactor = (props) => {

    const { name } = props
    return (
        <div style={{
            display: "flex",
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <h1>{name}</h1>
                <div style={{
                    height: "25em",
                    width: "20em"
                }}>
                    <img src="/src/assets/npp2.png" width="100%" height="100%" alt="Reactor"/>
                </div>
                <h1>State</h1>
            </div>
        </div>
       
    )
}

export default Reactor