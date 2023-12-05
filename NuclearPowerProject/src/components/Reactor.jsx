const Reactor = (props) => {

    const { id, name, state, setReactorView, reactorView } = props
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
                }} onClick={() => {setReactorView(reactorView.map((reactor) => {
                    console.log(id)
                    if (reactor[0].id == id) {
                        reactor[0].viewing = true
                        console.log(reactor[0])
                        return reactor[0]
                    }
                    else return reactor[0]
                }))
                console.log(reactorView)}
                
                }>
                    <img src="/src/assets/npp2.png" width="100%" height="100%" alt="Reactor"/>
                </div>
                <h3 style={{
                    color: "black"
                }}>{state}</h3>
            </div>
        </div>
       
    )
}

export default Reactor