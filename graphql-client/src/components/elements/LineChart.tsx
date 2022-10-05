import ReactApexChart from "react-apexcharts"
import { ApexOptions } from "apexcharts"

const LineChart: React.FC = props => {
    const options: ApexOptions = {
        chart: {
            toolbar: {
                show: false,
            },
        },
        tooltip: {
            theme: "dark",
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
        },
        xaxis: {
            type: "category",
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
            labels: {

                style: {
                    colors: "#c8cfca",
                    fontSize: "12px",
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#c8cfca",
                    fontSize: "12px",
                },
            },
        },
        legend: {
            show: false,
        },
        grid: {
            strokeDashArray: 5,
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "light",
                type: "vertical",
                shadeIntensity: 0.5,
                gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
                inverseColors: true,
                opacityFrom: 0.8,
                opacityTo: 0,
                stops: [],
            },
            colors: ["#4FD1C5", "#2D3748"],
        },
        colors: ["#4FD1C5", "#2D3748"],
    }

    const data = [
        {
            name: "Mobile apps",
            data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
        },
        {
            name: "Websites",
            data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
        },
    ]

    return <ReactApexChart options={options} series={data} type="line" width="100%" />
}

export default LineChart
