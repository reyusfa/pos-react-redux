import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import { Link } from 'react-router-dom';

import {
  Icon,
} from 'semantic-ui-react';

import {
  Card as suiCard,
  Image as suiImage,
  Menu as suiMenu,
  Modal as suiModal
} from 'semantic-ui-react';

const Modal = styled(suiModal)
.attrs({
  className: ''
})``;

const Flex = styled.div`
  ${tw`
    flex flex-wrap content-start
  `}
`;

const FlexLayout = styled.div`
  ${tw`
    flex content-start
  `};
`;

const FlexLayoutMain = styled.div`
  ${tw`
    px-4
    flex-1
  `};
`;

const FlexLayoutSidebar = styled.div`
  ${tw`
  `};
`;

const FlexItem = styled.div`
  ${tw`
    w-full sm:w-1/2
    px-2 py-2
  `}
`;

const FlexItemFull = styled.div`
  ${tw`
    w-full
    px-2 py-2
  `}
`;

const Image = styled(suiImage)`
  &&& {
    ${tw`
      h-48
      block
      object-cover
      w-full
    `}
  }
`;

const Menu = styled(suiMenu)`
  &&& {
    ${tw`
      border border-gray-600
      shadow-lg
    `}
    border-radius: unset;
  }
`;

const Card = styled(suiCard)`
  &&& {
    ${tw`
      hover:shadow-lg
    `}
  }
`;

const CardContainer = styled.div`
  ${tw`
    flex flex-wrap
    w-full
  `};
`;

const CardItem = styled.div`
  ${tw`
    p-2
    w-full sm:w-1/2 md:w-1/3 lg:w-1/4
  `};
`;

const OrderContainer = styled.div`
  ${tw`
    flex flex-wrap content-start
  `};
`;

const OrderProductContainer = styled.div`
  ${tw`
    w-8/12
  `};
`;

const OrderCartContainer = styled.div`
  ${tw`
    p-2
    w-4/12
  `};
`;

const NavigationContainer = styled.div`
  ${tw`
    flex flex-wrap content-start
  `};
`;

const NavigationItem = styled.div`
  ${tw`
    w-full sm:w-1/2 md:w-1/4
    p-2
  `};
`;

const Toast = styled.div`
  ${tw`
    fixed
    left-0
    top-0
    m-5
  `};
  z-index:1111
`;

const Layout = ({ children, menu }) => {
  return (
    <div>
      {menu}
      <FlexLayout>
        <FlexLayoutSidebar>
          <Menu
            icon='labeled'
            vertical
            secondary
          >
            <Link to="/">
              <Menu.Item
                color="blue"
                name='home'
              >
                <Icon name='home' />
                Home
              </Menu.Item>
            </Link>
            <Link to="/order">
              <Menu.Item
                color="blue"
                name='order'
              >
                <Icon name='shopping cart' />
                Order
              </Menu.Item>
            </Link>
            <Link to="/product">
              <Menu.Item
                color="blue"
                name='product'
              >
                <Icon name='boxes' />
                Product
              </Menu.Item>
            </Link>
            <Link to="/user">
              <Menu.Item
                color="blue"
                name='user'
              >
                <Icon name='users' />
                User
              </Menu.Item>
            </Link>
          </Menu>
        </FlexLayoutSidebar>
        <FlexLayoutMain>
          {children}
        </FlexLayoutMain>
      </FlexLayout>
    </div>
  );
};

export {
  Card,
  Flex,
  FlexItem,
  FlexItemFull,
  FlexLayout,
  FlexLayoutMain,
  FlexLayoutSidebar,
  Image,
  Menu,
  Modal,
  CardContainer,
  CardItem,
  Layout,
  OrderContainer,
  OrderCartContainer,
  OrderProductContainer,
  NavigationContainer,
  NavigationItem,
  Toast
}
