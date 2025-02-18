import { Radio, Select } from "antd";
import { useState } from "react";
import Chart from "react-apexcharts";

function Groups() {
  const selectData = [
    "TEAM A",
    "TEAM B",
    "TEAM C",
    "TEAM D",
    "TEAM E",
    "TEAM F",
    "TEAM G",
    "TEAM H",
    "TEAM I",
    "TEAM J",
    "TEAM K",
  ];

  const [selectedData, setSelectedData] = useState(selectData.slice(0, 4));

  const graphSeries = [
    {
      name: "TEAM A",
      type: "bar",
      data: [22, 33, 15, 23, 18, 21, 13, 20, 15, 24, 17],
    },
    {
      name: "TEAM B",
      type: "bar",
      data: [38, 45, 28, 42, 25, 36, 21, 39, 27, 46, 29],
    },
    {
      name: "TEAM C",
      type: "bar",
      data: [95, 110, 85, 105, 70, 190, 150, 175, 130, 135, 65],
    },
    {
      name: "TEAM D",
      type: "bar",
      data: [110, 125, 90, 120, 80, 210, 160, 190, 140, 145, 75],
    },
    {
      name: "TEAM E",
      type: "line",
      data: [105, 118, 92, 112, 75, 200, 155, 185, 135, 140, 70],
    },
    {
      name: "TEAM F",
      type: "bar",
      data: [80, 95, 70, 90, 60, 170, 130, 155, 110, 115, 55],
    },
    {
      name: "TEAM G",
      type: "line",
      data: [42, 58, 35, 55, 30, 48, 25, 45, 32, 50, 35],
    },
    {
      name: "TEAM H",
      type: "bar",
      data: [60, 75, 50, 70, 45, 65, 40, 60, 48, 72, 50],
    },
    {
      name: "TEAM I",
      type: "bar",
      data: [70, 85, 60, 80, 55, 75, 50, 70, 58, 82, 60],
    },
    {
      name: "TEAM J",
      type: "bar",
      data: [50, 65, 40, 60, 35, 55, 30, 50, 38, 62, 40],
    },
    {
      name: "TEAM K",
      type: "bar",
      data: [90, 105, 80, 100, 75, 180, 140, 165, 120, 125, 60],
    },
  ];

  const filteredSeries = graphSeries.filter((item) =>
    selectedData.includes(item.name)
  );

  const option = {
    series: filteredSeries,
    chart: {
      height: 900,
      type: "line",
    },
    stroke: {
      width: [0, 14],
      curve: "smooth",
    },
    title: {
      text: "Dummy Graph",
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    legend: {
      show: true,
    },
    tooltip: {
      enabled: true,
      offsetY: 0,
      style: {
        fontSize: "12px",
        fontFamily: "Arial",
      },
    },
  };


  const onRadioChange = (e) => {
    const teamMapping = {
      team_a: "TEAM A",
      team_k: "TEAM K",
    };
    // setSelectedTeam(teamMapping[e.target.value]);
    setSelectedData(teamMapping[e.target.value]);
  };

  const options = [
    { label: "TEAM A", value: "team_a" },
    { label: "TEAM k", value: "team_k" },
  ];

  return (
    <div className="h-screen w--screen">
      <Radio.Group
        block
        options={options}
        onChange={onRadioChange}
        defaultValue="team_a"
        optionType="button"
        buttonStyle="solid"
      />
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        options={selectData.map((item) => ({ label: item, value: item }))}
        placeholder="Select Item..."
        maxTagCount="responsive"
        value={selectedData}
        onChange={(e) => {
          setSelectedData(e);
        }}
      />
      <Chart options={option} series={option.series} type="bar" />
    </div>
  );
}

export default Groups;
