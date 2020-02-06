import React from 'react';
import { connect, useDispatch } from 'react-redux';

import {
  Layout,
  Menu,
  MenuLogo,
  Flex,
  FlexItem
} from '../components/Layout';

import RecentOrder from '../components/RecentOrder';
import TotalOrderBarChart from '../components/TotalOrderBarChart';

const Home = (props) => {
  const dispatch = useDispatch();

  return (
    <Layout
      {...props}
      menu={(
        <Menu inverted borderless size="large">
          <MenuLogo>Tumbas</MenuLogo>
          <Menu.Item
            color="blue"
            name='logout'
            position='right'
            onClick={() => dispatch({type: 'LOGOUT_REQUEST'})}
          >
            Log Out
          </Menu.Item>
        </Menu>
      )}
    >
      <Flex>
        <FlexItem>
          <TotalOrderBarChart />
        </FlexItem>
        <FlexItem>
          <Flex>
            <FlexItem style={{'padding': 0}}>
              <RecentOrder />
            </FlexItem>
            <FlexItem style={{'padding': 0}}>
            </FlexItem>
          </Flex>
        </FlexItem>
      </Flex>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    products: state.products,
    categories: state.categories
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
