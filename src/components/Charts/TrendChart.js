import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class TrendChart extends Component {
  state = {
    series: [
      {
        name: 'Users',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 100]
      }
    ],
    options: {
      chart: {
        toolbar: {
          show: false
        },
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        // text: 'User Trends',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct'
        ]
      }
    }
  };

  render() {
    return (
      <div>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type='line'
          height={350}
        ></Chart>
      </div>
    );
  }
}

export default TrendChart;
