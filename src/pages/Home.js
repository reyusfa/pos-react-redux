import React from 'react';

import { Layout, Menu } from '../components/Layout';
import RecentOrder from '../components/RecentOrder';
import TotalOrderBarChart from '../components/TotalOrderBarChart';

const Home = () => {
  return (
    <Layout
      menu={(
        <Menu inverted borderless>
          <Menu.Item header>
            Point of Sale
          </Menu.Item>
          <Menu.Item
            color="blue"
            name='logout'
            position='right'
          >
            Log Out
          </Menu.Item>
        </Menu>
      )}
    >
      <TotalOrderBarChart />
      <RecentOrder />
    </Layout>
  );
};

export default Home;
