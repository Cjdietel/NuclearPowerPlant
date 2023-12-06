const Reactor = (props) => {

    const { name, state, setReactorView, reactorView, setReactorViewID } = props
    return (
        <div style={{
            display: "flex",
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <h2 style={{
                    color: "black"
                }}>{name}</h2>
                <div style={{
                    height: "25em",
                    width: "20em"
                }} onClick={() => {
                    setReactorViewID(state.id)
                    setReactorView(!reactorView)
                }

                }>
                    <img src="/src/assets/npp2.png" width="100%" height="100%" alt="Reactor"/>
                </div>
                <h3 style={{
                    color: "black"
                }}>{state.state}</h3>
            </div>
        </div>
       
    )
}

export default Reactor