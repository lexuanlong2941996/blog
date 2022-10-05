import ReactApexChart from "react-apexcharts"
import { ApexOptions } from "apexcharts"

const BarChart: React.FC = props => {
    const options: ApexOptions = {
        chart: {
            toolbar: {
                show: false,
            },
        },
        tooltip: {
            // style: {
            //     backgroundColor: "red",
            //     fontSize: "12px",
            //     fontFamily: undefined,
            // },
            // onDatasetHover: {
            //     style: {
            //         backgroundColor: "red",
            //         fontSize: "12px",
            //         fontFamily: undefined,
            //     },
            // },
            theme: "dark",
        },
        xaxis: {
            categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            // show: false,
            labels: {
                show: false,
                style: {
                    colors: "#fff",
                    fontSize: "12px",
                },
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: true,
            // color: "#fff",
            labels: {
                show: true,
                style: {
                    colors: "#fff",
                    fontSize: "14px",
                },
            },
        },
        grid: {
            show: false,
        },
        fill: {
            // colors: "#fff",
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            bar: {
                borderRadius: 8,
                columnWidth: "12px",
            },
        },
        responsive: [
            {
                breakpoint: 768,
                options: {
                    plotOptions: {
                        bar: {
                            borderRadius: 0,
                        },
                    },
                },
            },
        ],
    }

    const data = [
        {
            name: "Sales",
            data: [330, 250, 110, 300, 490, 350, 270, 130, 425],
        },
    ]

    return <ReactApexChart options={options} series={data} type="bar" width="100%" />
}

export default BarChart
