import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import { Link as routerLink } from 'react-router-dom';

import {
  Icon,
} from 'semantic-ui-react';

import {
  Card as suiCard,
  Image as suiImage,
  // Menu as suiMenu,
  Menu,
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
    w-full md:w-1/2
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

// const Menu = styled(suiMenu)`
//   &&& {
//     ${tw`
//       border border-gray-600
//       shadow-lg
//     `}
//     border-radius: unset;
//   }
// `;

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

const Sticky = styled.div`
  ${tw`
    sticky
    top-0
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

const LoginPage = styled.div`
  ${tw`
    h-screen
    bg-blue-300
    pt-20
  `};
`;

const Logo = styled.div`
  ${tw`
    text-center
    text-6xl
    text-gray-900
    p-10
  `};
  font-family: 'Pacifico', cursive;
`;

const MenuLogo = styled.span`
  ${tw`
    inline
    text-white
    text-3xl
    py-3 px-3
  `}
  font-family: 'Pacifico', cursive;
`;

const CardPrice = styled.span`
  ${tw`
    absolute
    top-0
    left-0
    shadow
    bg-white
    rounded
    m-3
    px-2 py-1
    font-bold
    text-black
    border border-solid border-gray-500
  `};
`;

const Link = styled(routerLink)`
  &&& :hover {
    &:hover {
      &:hover {
        ${tw`
          text-blue-600
        `};
      }
      ${tw`
        text-blue-600
      `};
    }
    ${tw`
      text-blue-600
    `};
  }
`;

const Layout = (props) => {
  const { pathname } = props.location;
  return (
    <div>
      {props.menu}
      <FlexLayout>
        <FlexLayoutSidebar>
          <Sticky>
          {
            props.auth.data.role_id === 1 ? (
              <Menu
                icon='labeled'
                vertical
                tabular
                secondary
              >
                <Link to="/">
                  <Menu.Item
                    active={pathname === '/'}
                    name='home'
                  >
                    <Icon name='home' />
                    Home
                  </Menu.Item>
                </Link>
                <Link to="/order">
                  <Menu.Item
                    active={pathname === '/order'}
                    name='order'
                  >
                    <Icon name='shopping cart' />
                    Order
                  </Menu.Item>
                </Link>
                <Link to="/product">
                  <Menu.Item
                    active={pathname === '/product'}
                    name='product'
                  >
                    <Icon name='boxes' />
                    Product
                  </Menu.Item>
                </Link>
                <Link to="/user">
                  <Menu.Item
                    active={pathname === '/user'}
                    name='user'
                  >
                    <Icon name='users' />
                    User
                  </Menu.Item>
                </Link>
              </Menu>
            ) : (
              <Menu
                icon='labeled'
                vertical
              >
                <Link to="/order">
                  <Menu.Item
                    color="blue"
                    name='order'
                  >
                    <Icon name='shopping cart' />
                    Order
                  </Menu.Item>
                </Link>
              </Menu>
            )
          }
          </Sticky>
        </FlexLayoutSidebar>
        <FlexLayoutMain>
          {props.children}
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
  Sticky,
  Toast,
  LoginPage,
  Logo,
  MenuLogo,
  CardPrice
}
