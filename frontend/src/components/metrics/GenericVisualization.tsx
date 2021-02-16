import React from "react";
import { Bar, Line as ChartJSLine } from "react-chartjs-2";
import styled from "styled-components";

import { customMetricsItem } from "../../actions/metrics";

const GenVisualizationWrapper = styled.div`
	height: 160px;
`;

interface GenericVisualizationsProps {
	chartType: string;
	data: customMetricsItem[];
}

const GenericVisualizations = (props: GenericVisualizationsProps) => {
	const data = {
		labels: props.data.map((s) => new Date(s.timestamp / 1000000)),
		datasets: [
			{
				data: props.data.map((s) => s.value),
				borderColor: "rgba(250,174,50,1)", // for line chart
				backgroundColor: props.chartType === "bar" ? "rgba(250,174,50,1)" : "", // for bar chart, don't assign backgroundcolor if its not a bar chart, may be relevant for area graph though
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		legend: {
			display: false,
		},
		scales: {
			yAxes: [
				{
					gridLines: {
						drawBorder: false,
					},
					ticks: {
						display: false,
					},
				},
			],
			xAxes: [
				{
					type: "time",
					// distribution: 'linear',
					//'linear': data are spread according to their time (distances can vary)
					// From https://www.chartjs.org/docs/latest/axes/cartesian/time.html
					ticks: {
						beginAtZero: false,
						fontSize: 10,
						autoSkip: true,
						maxTicksLimit: 10,
					},
					// gridLines: false, --> not a valid option
				},
			],
		},
	};

	if (props.chartType === "line") {
		return (
			<GenVisualizationWrapper>
				<ChartJSLine data={data} options={options} />
			</GenVisualizationWrapper>
		);
	} else if (props.chartType === "bar") {
		return (
			<GenVisualizationWrapper>
				<Bar data={data} options={options} />
			</GenVisualizationWrapper>
		);
	} else return null;
};

export default GenericVisualizations;