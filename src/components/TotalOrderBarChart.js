import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { Doughnut, Line } from 'react-chartjs-2';

import { Card, Feed } from 'semantic-ui-react';

const _ = require('lodash');

const TotalOrderBarChart = ({ auth }) => {
  const [labelChart, setLabelChart] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  const [limitChart, setLimitChart] = useState(7);
  const { token } = auth.data;
  const headers = {
    headers: { authorization: token }
  };

  const getOrders = async () => {
    await axios.get(`${process.env.REACT_APP_API_HOST}/orders`, headers)
    .then(res => {
      return res.data.data.map(item => {
        return {
          [moment(item.created_at).format('DD-MM-YYYY')]: item.total
        }
      });
    }).then(res => {
      const data = [
        _.sumBy(res, moment().subtract(6, 'days').format('DD-MM-YYYY')) || 0,
        _.sumBy(res, moment().subtract(5, 'days').format('DD-MM-YYYY')) || 0,
        _.sumBy(res, moment().subtract(4, 'days').format('DD-MM-YYYY')) || 0,
        _.sumBy(res, moment().subtract(3, 'days').format('DD-MM-YYYY')) || 0,
        _.sumBy(res, moment().subtract(2, 'days').format('DD-MM-YYYY')) || 0,
        _.sumBy(res, moment().subtract(1, 'days').format('DD-MM-YYYY')) || 0,
        _.sumBy(res, moment().subtract(0, 'days').format('DD-MM-YYYY')) || 0,
      ]
      setDataChart(data);
      setLabelChart([
        moment().subtract(6, 'days').format('DD-MM-YYYY'),
        moment().subtract(5, 'days').format('DD-MM-YYYY'),
        moment().subtract(4, 'days').format('DD-MM-YYYY'),
        moment().subtract(3, 'days').format('DD-MM-YYYY'),
        moment().subtract(2, 'days').format('DD-MM-YYYY'),
        moment().subtract(1, 'days').format('DD-MM-YYYY'),
        moment().subtract(0, 'days').format('DD-MM-YYYY'),
      ]);
    });
  };

  useEffect(() => {
    getOrders()
  }, [])
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>Total orders per day (1 Week)</Card.Header>
      </Card.Content>
      <Card.Content>
        <Line data={
          {
            labels: labelChart,
            datasets: [
              {
                label: 'Total orders',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(65, 131, 196, 0.4)',
                borderColor: 'rgba(65, 131, 196, 1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(65, 131, 196, 1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(65, 131, 196, 1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: dataChart
              }
            ]
          }
        } />
      </Card.Content>
    </Card>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TotalOrderBarChart);
