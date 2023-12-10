import { useEffect, useState, useRef } from "react"
import { Chart } from "chart.js/auto";
const Graph = (props) => {
    const canvasref = useRef(null)
    const { rollingTempAvg } = props

useEffect(() => {
    const chart = new Chart(canvasref.current, {
        type: 'line',
        data: {
          labels: rollingTempAvg.map((_, index) => {
            if (index % 120 == 0) {
                return 5 - (index / 120)
            }
            else {
                return ""
            }
          }),
          datasets: [{
            yAxisID: "yAxis",
            xAxisID: "xAxis",
            label: 'Avg Temp Past 5 mins',
            data: rollingTempAvg,
            borderWidth: 2,
          }]
        },
        options: {
            scales: {
                yAxis: {
                    min: 0,
                    max: 1000,
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10,
                        callback: function(value, index, ticks) {
                            return value + "°C"
                        }                  
                }

                },
                xAxis: {
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 5,
                                  
                }
                }
            },
          elements: {
            point: {
                pointStyle: false
            }
          },
          animation: false,
          maintainAspectRatio: true
        }
      })
      return () => {
        chart.destroy()
      }

},[rollingTempAvg])

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2em",
            marginBottom: "2em",
        }}>
            <div style={{
                width:"96%",
                height: "40em",
                background: "#BFD7EA",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <canvas ref={canvasref} height="100px" width="400px" style={{border: "2px solid black"}}></canvas>
            </div>
        </div>
    )
}

export default Graph