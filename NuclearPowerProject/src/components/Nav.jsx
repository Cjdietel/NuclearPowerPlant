import { Button } from "@mui/material"
const Nav = (props) => {

    const { reactorView, setReactorView, viewName, name } = props

    return (
        <div style={{
            width:"100%",
            height: "100%",
            background: "#0b3954",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"

        }}>
            {reactorView && <Button variant="contained" style={{justifyContent: "left"}} onClick={() => {setReactorView(false)}}>Return</Button>}
            <h1 style={{
                fontFamily: "sans-serif"
            }}>{reactorView ? "Nuclear Manager"  : name}</h1>

        </div>
    )
}

export default Nav