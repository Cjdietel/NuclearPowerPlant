const Nav = (props) => {

    const { reactorView, setReactorView } = props
    return (
        <div style={{
            width:"100%",
            height: "100%",
            background: "#0b3954",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"

        }}>
            {reactorView && <button style={{justifyContent: "left"}} onClick={() => {setReactorView(false)}}>Return</button>}
            <h1 style={{
                fontFamily: "sans-serif"
            }}>{reactorView ? "Reactor Manager" : "NucleaRazzle Power Palace"}</h1>

        </div>
    )
}

export default Nav