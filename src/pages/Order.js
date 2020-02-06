import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import axios from 'axios';

import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import { toasting } from '../helper';

import { requestProducts } from '../redux/actions/products';
import { requestCategories } from '../redux/actions/categories';

import { CardOrder } from '../components/CardOrder';

import ModalCheckout from '../components/ModalCheckout';

import {
  Card,
  CardContainer,
  Layout,
  Menu,
  NavigationContainer,
  NavigationItem,
  OrderContainer,
  OrderProductContainer,
  OrderCartContainer,
  Sticky,
  Toast,
  MenuLogo
} from '../components/Layout';

import {
  Button,
  Icon,
  Input,
  Loader,
  Pagination,
  Select
} from 'semantic-ui-react';

const Order = (props) => {
  const dispatch = useDispatch();

  const { auth, products, categories, requestProducts, requestCategories } = props;
  const [searchProductName, setSearchProductName] = useState('');
  const [filterByCategory, setFilterByCategory] = useState('');
  const [limitProduct, setLimitProduct] = useState(12);
  const [pageProduct, setPageProduct] = useState(1);
  const [sortProduct, setSortProduct] = useState('name.asc');
  const [isLoading, setIsLoading] = useState(false);

  const [cart, setCart] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const [order, setOrder] = useState([]);

  const [detailOrder, setDetailOrder] = useState({});

  const [modalCheckoutOpen, setModalCheckoutOpen] = useState(false);

  const { token } = auth.data;
  const headers = {
    headers: { authorization: token }
  };

  const configGetProducts = {
    headers: { authorization: token },
    params: {
      filter: {
        name: searchProductName,
        category_id: filterByCategory
      },
      sort: sortProduct,
      page: pageProduct,
      limit: limitProduct
    }
  };

  const options = [
    {
      key: 0,
      text: 'All Categories',
      value: ''
    },
    ...categories.data.map(item => {
      return {
        key: item.id,
        text: item.name,
        value: item.id
      }
    })
  ];

  // const handleSelectItem = (event, data) => {
  //   event.preventDefault();
  //   if(!cart.includes(data.id)) {
  //     setCart([...cart, data.id]);
  //     const newOrder = {
  //       name: data.name,
  //       price: data.price,
  //       product_id: data.id,
  //       subtotal: data.price,
  //       quantity: 1
  //     };
  //     setOrder([...order, newOrder]);
  //     const calculateTotal = order.reduce((a, b) => {
  //       return a + b['subtotal'];
  //     }, 0) + data.price;
  //     setTotalOrder(calculateTotal);
  //   } else {
  //     const newOrder = order.map(item => {
  //       if(item.product_id === data.id) {
  //         return {
  //           name: item.name,
  //           price: item.price,
  //           product_id: item.product_id,
  //           subtotal: item.price * (item.quantity + 1),
  //           quantity: item.quantity + 1
  //         };
  //       } else {
  //         return item;
  //       }
  //     });
  //     setOrder([...newOrder]);
  //     const calculateTotal = order.reduce((a, b) => {
  //       return a + b['subtotal'];
  //     }, 0) + data.price;
  //     setTotalOrder(calculateTotal);
  //   }
  // };

  const handleSelectItem = (event, data) => {
    event.preventDefault();
    // dispatch({
    //   type: 'ADD_ITEM_TO_CART',
    //   payload: data
    // })
    if(!cart.includes(data.id)) {
      setCart([...cart, data.id]);
      const newOrder = {
        name: data.name,
        price: data.price,
        product_id: data.id,
        subtotal: data.price,
        quantity: 1
      };
      setOrder([...order, newOrder]);
      const calculateTotal = order.reduce((a, b) => {
        return a + b['subtotal'];
      }, 0) + data.price;
      setTotalOrder(calculateTotal);
    } else {
      const newOrder = order.map(item => {
        if(item.product_id === data.id) {
          return {
            name: item.name,
            price: item.price,
            product_id: item.product_id,
            subtotal: item.price * (item.quantity + 1),
            quantity: item.quantity + 1
          };
        } else {
          return item;
        }
      });
      setOrder([...newOrder]);
      const calculateTotal = order.reduce((a, b) => {
        return a + b['subtotal'];
      }, 0) + data.price;
      setTotalOrder(calculateTotal);
    }
  };

  const handleReduceQuantity = (event, data) => {
    event.preventDefault();
    const newOrder = order.map(item => {
      if(item.product_id === data.product_id && data.quantity > 1) {
        return {
          name: item.name,
          price: item.price,
          product_id: item.product_id,
          subtotal: item.price * (item.quantity - 1),
          quantity: item.quantity - 1
        };
      } else {
        return item;
      }
    });
    setOrder([...newOrder]);
    const calculateTotal = order.reduce((a, b) => {
      return a + b['subtotal'];
    }, 0) - (data.quantity > 1 ? data.price : 0);
    setTotalOrder(calculateTotal);
  };

  const handleAddQuantity = (event, data) => {
    event.preventDefault();
    const newOrder = order.map(item => {
      if(item.product_id === data.product_id) {
        return {
          name: item.name,
          price: item.price,
          product_id: item.product_id,
          subtotal: item.price * (item.quantity + 1),
          quantity: item.quantity + 1
        };
      } else {
        return item;
      }
    });
    setOrder([...newOrder]);
    const calculateTotal = order.reduce((a, b) => {
      return a + b['subtotal'];
    }, 0) + data.price;
    setTotalOrder(calculateTotal);
  };

  const handleRemoveItem = (event, data) => {
    event.preventDefault();
    const newCart = cart.filter(item => {
      return item !== data.product_id;
    });
    setCart([...newCart]);
    const newOrder = order.filter(item => {
      return item.product_id !== data.product_id;
    });
    setOrder([...newOrder]);
    const calculateTotal = newOrder.reduce((a, b) => {
      return a + b['subtotal'];
    }, 0);
    setTotalOrder(calculateTotal);
  };

  const handleSearchProductName = (event, value) => {
    event.preventDefault();
    setSearchProductName(value);
  };

  const handleFilterByCategory = (event, value) => {
    event.preventDefault();
    setFilterByCategory(value);
  };

  const handleSortProduct = (event, value) => {
    event.preventDefault();
    setSortProduct(value);
  };

  const handlePageProduct = (event, value) => {
    event.preventDefault();
    setPageProduct(value.activePage);
  };

  const handleLimitProduct = (event, value) => {
    event.preventDefault();
    setLimitProduct(value);
  };

  const handleCheckout = async (event) => {
    event.preventDefault();
    if(cart.length > 0) {
      const body = {
        user_id: auth.data.id,
        orders: order.map(item => {
          return {
            product_id: item.product_id,
            quantity: item.quantity
          }
        })
      };
      await axios.post(`${process.env.REACT_APP_API_HOST}/orders`, body, headers).then(res => {
        handleModalCheckoutOpen();
        setDetailOrder(res.data.data);
        setCart([]);
        setOrder([]);
        setTotalOrder(0);
      }).catch(console.log);
    }
  };

  const handleModalCheckoutOpen = () => {
    setModalCheckoutOpen(true);
  };

  const handleModalCheckoutClose = () => {
    setModalCheckoutOpen(false);
    setDetailOrder({});
  };

  useEffect(() => {
    requestCategories(headers);
  }, []);

  useEffect(() => {
    requestProducts(configGetProducts);
  }, [
    searchProductName,
    filterByCategory,
    sortProduct,
    pageProduct,
    limitProduct
  ]);
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
      { isLoading ? (
        <div style={{'height': '100%', 'vertical-align': 'middle'}}>
          <Loader active />
        </div>
      ) : (
        <OrderContainer>
          <OrderProductContainer>
            <NavigationContainer>
              <NavigationItem>
                <Input
                  fluid
                  icon='search'
                  placeholder='Search Product Name...'
                  onChange={
                    (event) => handleSearchProductName(event, event.target.value)
                  }
                />
              </NavigationItem>
              <NavigationItem>
                <Select
                  fluid
                  placeholder='Filter by Category'
                  options={options}
                  onChange={
                    (event, { value }) => handleFilterByCategory(event, value)
                  }
                />
              </NavigationItem>
              <NavigationItem>
                <Select
                  fluid
                  placeholder='Limit'
                  options={[
                    {text: '5 items', value: 5},
                    {text: '10 items', value: 10},
                    {text: '20 items', value: 20},
                    {text: '50 items', value: 50},
                    {text: '100 items', value: 100}
                  ]}
                  onChange={
                    (event, { value }) => handleLimitProduct(event, value)
                  }
                />
              </NavigationItem>
              <NavigationItem>
                <Select
                  fluid
                  placeholder='Sort by'
                  options={[
                    {text: 'Name - A to Z', value: 'name.asc'},
                    {text: 'Name - Z to A', value: 'name.desc'},
                    {text: 'Price - Low to High', value: 'price.asc'},
                    {text: 'Price - High to Low', value: 'price.desc'},
                    {text: 'Update date - Oldest to Newest', value: 'updated_at.asc'},
                    {text: 'Update date - Newest to Oldest', value: 'updated_at.desc'}
                  ]}
                  onChange={
                    (event, { value }) => handleSortProduct(event, value)
                  }
                />
              </NavigationItem>
            </NavigationContainer>
            <CardContainer>
              {
                products.data.map(product => {
                  const {
                    id,
                    image,
                    name
                  } = product;

                  return (
                    <CardOrder
                      key={id}
                      name={name}
                      image={image}
                      handleSelectItem={handleSelectItem}
                      data={product}
                    />
                  )
                })
              }
            </CardContainer>
            <NavigationContainer>
              <Pagination
                boundaryRange={0}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                defaultActivePage={5}
                totalPages={
                  products.pagination && products.pagination.total_page
                  ? products.pagination.total_page
                  : 0
                }
                onPageChange={handlePageProduct}
              />
            </NavigationContainer>
          </OrderProductContainer>
          <OrderCartContainer>
                  <Sticky>
            <Card fluid>
              {
                (order || []).map((item, index) => {
                  return (
                    <Card.Content key={index}>
                      <Card.Description>
                        <strong>{item.name}</strong>
                        <Button
                          size="mini"
                          floated="right"
                          color="red"
                          icon='trash'
                          onClick={(event) => handleRemoveItem(event, item)}
                        />
                      </Card.Description>
                      <Card.Meta>
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumSignificantDigits: 1 }).format(item.price)}
                      </Card.Meta>
                      <Card.Description textAlign="right">
                        <strong>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.subtotal)}</strong>
                        <Button.Group size="small" floated="left">
                          <Button icon onClick={(event) => handleReduceQuantity(event, item)}>
                            <Icon name='angle left' />
                          </Button>
                          <Button basic style={{'color': 'black'}}>
                            {item.quantity}
                          </Button>
                          <Button icon onClick={(event) => handleAddQuantity(event, item)}>
                            <Icon name='angle right' />
                          </Button>
                        </Button.Group>
                      </Card.Description>
                    </Card.Content>
                  )
                })
              }
              {
                cart.length > 0 ?
                (
                  <Card.Content>
                    <Card.Header textAlign="right">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalOrder)}
                      <Button
                        color="blue"
                        floated="left"
                        size="small"
                        onClick={(event) => handleCheckout(event)}
                      >Checkout</Button>
                    </Card.Header>
                  </Card.Content>
                ) : (
                  <Card.Content>
                    <Card.Header textAlign="center">
                      Cart is Empty...
                    </Card.Header>
                  </Card.Content>
                )
              }
              <ModalCheckout
                handleClose={handleModalCheckoutClose}
                modalIsOpen={modalCheckoutOpen}
                detailOrder={detailOrder}
              />
            </Card>
                  </Sticky>
          </OrderCartContainer>
        </OrderContainer>
      )}
      <Toast><SemanticToastContainer /></Toast>
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
    requestProducts: (config) => dispatch(requestProducts(config)),
    requestCategories: (config) => dispatch(requestCategories(config))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
