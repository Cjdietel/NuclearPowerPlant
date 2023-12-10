import { useEffect, useState } from "react"

const SystemLogs = (props) => {
    const { latestIds } = props

    const [logs, setLogs] = useState("")

    useEffect(() => {
        const getLogs = async () => {
            setLogs("")
            const rawData = await fetch("https://nuclear.dacoder.io/reactors/logs?apiKey=a42ff3098bd8736d")
            const jsonData = await rawData.json()
            for (let reactorLog of jsonData) {
                for (let id of latestIds) {
                    if (reactorLog[id] != null) {
                        let tempArray = reactorLog[id]
                        // arrLength = tempArray.length
                        for (let log of reactorLog[id]) {
                            setLogs(prevLog => {return prevLog + "\n" + log})
                        }
                    }
                }
            }
        }

        getLogs()
        // const interval = setInterval(getLogs, 500);

        // // cleanup interval
        // return () => clearInterval(interval);
    
    }, [latestIds])

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <div style={{
                width: "96%",
                height: "20em",
                background: "#BFD7EA",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <p>{logs}</p>
            </div>
        </div>
    )
}

export default SystemLogs