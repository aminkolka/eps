import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { H2, H2Span, ChartWrapper, InfoLabel } from './ellipsis.styles';

const API = "miso.one";

const Chart = () => {
  const [error, setError] = useState<null | { message: string }>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const options = {
    chart: { backgroundColor: null },
    tooltip: {
      backgroundColor: "#e2e2e2",
      borderColor: "#fff",
      style: { color: "#2f2f2f" },
      pointFormat: "Locked EPS APY: <b>{point.y}%</b>",
    },
    title: { text: "" },
    credits: { enabled: false },
    exporting: { enabled: false },
    navigator: { enabled: false },
    legend: { enabled: false },
    xAxis: {
      type: "datetime",
      gridLineWidth: 1,
      gridLineColor: "#fff",
      labels: { style: { color: "#9aa2a9", fill: "#9aa2a9" } },
    },
    yAxis: {
      //type: 'logarithmic',
      title: { text: "" },
      gridLineWidth: 1,
      gridLineColor: "#fff",
      labels: {
        style: { color: "#9aa2a9", fill: "#9aa2a9" },
        formatter: function (
          this: Highcharts.AxisLabelsFormatterContextObject
        ): string {
          return this.value + "%";
        },
      },
    },
    series: [
      {
        name: "EPS staking APY",
        data: items,
        type: "spline",
        color: {
          linearGradient: { x1: 0, x2: 1, y1: 0, y2: 1 },
          stops: [
            [0, "#c762da"],
            [1, "#4c96e2"],
          ],
        },
        lineWidth: 2,
        tooltip: { valueDecimals: 0 },
        marker: { enabled: false },
        states: { hover: { lineWidth: 2 } },
      },
    ],
  };

  
  const init = () => {
    (async () => {
      try {
        const response = await fetch(`https://${API}/eps/eps-apy`);
        const { apy_eps } = await response.json();
        setItems(apy_eps);
      } catch (e) {
        setIsLoaded(true);
        setError(error);
      } finally {
        setIsLoaded(true);
        setError(error);
      }
    })();
  }

  useEffect(init, [error]);

  if (error) {
    return <InfoLabel className="info-label">Error: {error.message}</InfoLabel>;
  } else if (!isLoaded) {
    return <InfoLabel className="info-label">Loading...</InfoLabel>;
  } else {
    return (
      <ChartWrapper>
        <H2>
          Locked EPS <H2Span>APY chart</H2Span>
        </H2>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </ChartWrapper>
    );
  }
}

export default Chart;
