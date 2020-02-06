import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import { Card, Feed } from 'semantic-ui-react';

const RecentOrder = ({ auth }) => {
  const [latestOrder, setLatestOrder] = useState([]);

  const { token } = auth.data;
  const headers = {
    headers: { authorization: token }
  };

  const getOrders = async () => {
    await axios.get(`${process.env.REACT_APP_API_HOST}/orders`, {
      ...headers,
      params: {
        limit: 5,
        sort: 'created_at.desc'
      }
    })
    .then(res => {
      setLatestOrder(res.data.data);
    });
  };

  useEffect(() => {
    getOrders()
  }, [])
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>Recent Order</Card.Header>
      </Card.Content>
      <Card.Content>
        <Feed>
          {
            latestOrder.map(order => {
              return (
                <Feed.Event key={order.id}>
                  <Feed.Label icon="clipboard list"></Feed.Label>
                  <Feed.Content>
                    <Feed.Date>
                      {moment(order.created_at).format('DD-MM-YYYY HH:MM:SS')}
                    </Feed.Date>
                    <Feed.Summary>
                      [#{order.reference}] {order.user_name}
                    </Feed.Summary>
                    <Feed.Meta>
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(order.total)}
                    </Feed.Meta>
                  </Feed.Content>
                </Feed.Event>
              )
            })
          }
        </Feed>
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

export default connect(mapStateToProps, mapDispatchToProps)(RecentOrder);
