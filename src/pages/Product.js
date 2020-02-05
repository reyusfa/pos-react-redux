import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { SemanticToastContainer } from 'react-semantic-toasts';
import { toasting } from '../helper';

import { requestProducts } from '../redux/actions/products';
import { requestCategories } from '../redux/actions/categories';

import {
  useInput,
  useInputImage
} from '../hooks/useInput';

import ModalUpdateProduct from '../components/ModalUpdateProduct';
import ModalCreateProduct from '../components/ModalCreateProduct';
import ModalManageCategory from '../components/ModalManageCategory';
import { CardProduct } from '../components/CardProduct';

import {
  CardContainer,
  Layout,
  Menu,
  NavigationContainer,
  NavigationItem,
  Toast
} from '../components/Layout';

import {
  Button,
  Input,
  Loader,
  Pagination,
  Select
} from 'semantic-ui-react';

const Product = ({ auth, products, categories, requestProducts, requestCategories }) => {
  const [searchProductName, setSearchProductName] = useState('');
  const [filterByCategory, setFilterByCategory] = useState('');
  const [limitProduct, setLimitProduct] = useState(12);
  const [pageProduct, setPageProduct] = useState(1);
  const [sortProduct, setSortProduct] = useState('name.asc');
  const [isLoading, setIsLoading] = useState(false);

  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalManageOpen, setModalManageOpen] = useState(false);

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

  const options = categories.data.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id
    }
  });

  const {
    value:productId,
    setValue:setValueProductId,
    reset:resetProductId
  } = useInput('');

  const {
    value:productName,
    setValue:setValueProductName,
    bind:bindProductName,
    reset:resetProductName
  } = useInput('');

  const {
    value:productPrice,
    setValue:setValueProductPrice,
    bind:bindProductPrice,
    reset:resetProductPrice
  } = useInput(0);

  const {
    value:productCategoryId,
    setValue:setValueProductCategoryId,
    bindDropdown:bindDropdownProductCategoryId,
    reset:resetProductCategoryId
  } = useInput(null);

  const {
    value:productDescription,
    setValue:setValueProductDescription,
    bind:bindProductDescription,
    reset:resetProductDescription
  } = useInput('');

  const {
    value:valueProductImage,
    file:fileProductImage,
    setValue:setValueProductImage,
    setFile:setFileProductImage,
    bindFile:bindFileProductImage,
    reset:resetProductImage
  } = useInputImage('');

  const handleModalCreateOpen = () => {
    setModalCreateOpen(true);
    setFileProductImage(`${process.env.REACT_APP_API_HOST}/public/images/image-placeholder.jpg`);
  };

  const handleModalCreateClose = () => {
    resetProductId();
    resetProductName();
    resetProductPrice();
    resetProductCategoryId();
    resetProductDescription();
    resetProductImage();

    setModalCreateOpen(false);
  };

  const handleModalCreateSave = async () => {
    const body = new FormData();
    body.append('name', productName);
    body.append('price', productPrice);
    body.append('category_id', productCategoryId);
    body.append('description', productDescription);
    if(valueProductImage && valueProductImage !== '') {
      body.append('image', valueProductImage);
    }
    await axios.post(`${process.env.REACT_APP_API_HOST}/products`, body, headers)
    .then(() => {
      requestProducts(configGetProducts);
      setModalCreateOpen(false);
    });
  };

  const handleModalUpdateOpen = (data) => {
    const {
      id,
      name,
      price,
      category_id,
      description,
      image
    } = data;

    setValueProductId(id);
    setValueProductName(name);
    setValueProductPrice(price);
    setValueProductCategoryId(category_id);
    setValueProductDescription(description);
    setValueProductImage('');
    setFileProductImage(image);

    setModalUpdateOpen(true);
  };

  const handleModalUpdateClose = () => {
    resetProductId();
    resetProductName();
    resetProductPrice();
    resetProductCategoryId();
    resetProductDescription();
    resetProductImage();

    setModalUpdateOpen(false);
  };

  const handleModalUpdateSave = async (id) => {
    const body = new FormData();
    body.append('name', productName);
    body.append('price', productPrice);
    body.append('category_id', productCategoryId);
    body.append('description', productDescription);
    if(valueProductImage && valueProductImage !== '') {
      body.append('image', valueProductImage);
    }
    await axios.put(`${process.env.REACT_APP_API_HOST}/products/${id}`, body, headers)
    .then(() => {
      requestProducts(configGetProducts);
      setModalUpdateOpen(false);
      toasting('Update Success!', 'Data product update success!');
    });
  };

  const handleModalManageOpen = () => {
    setModalManageOpen(true);
  };

  const handleModalManageClose = () => {
    setModalManageOpen(false);
  };

  const handleDeleteProduct = async (event, id) => {
    event.preventDefault();
    await axios.delete(`${process.env.REACT_APP_API_HOST}/products/${id}`, headers)
    .then(() => {
      requestProducts(configGetProducts);
    });
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
      menu={(
        <Menu inverted borderless>
          <Menu.Item header>
            Point of Sale
          </Menu.Item>
          <Menu.Item
            as="a"
            color="blue"
            onClick={handleModalCreateOpen}
          >
            Add Product
          </Menu.Item>
          <Menu.Item
            as="a"
            color="blue"
            onClick={handleModalManageOpen}
          >
            Category
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
      { isLoading ? (
        <div style={{'height': '100%', 'verticalAlign': 'middle'}}>
          <Loader active />
        </div>
      ) : (
        <div>
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
                  <CardProduct
                    key={id}
                    name={name}
                    image={image}
                    actionButtons={
                      <div style={{'display': 'flex', 'justifyContent': 'space-around' }}>
                        <div>
                          <Button.Group icon size="mini">
                            <Button
                              icon='edit'
                              color='blue'
                              label="Edit"
                              onClick={() => handleModalUpdateOpen(product)}
                            ></Button>
                          </Button.Group>
                        </div>
                        <div>
                          <Button.Group icon size="mini">
                            <Button
                              icon='trash'
                              color='red'
                              label="Delete"
                              onClick={(event) => handleDeleteProduct(event, id)}
                            ></Button>
                          </Button.Group>
                        </div>
                      </div>
                    }
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
              defaultActivePage={1}
              totalPages={
                products.pagination && products.pagination.total_page
                ? products.pagination.total_page
                : 0
              }
              onPageChange={handlePageProduct}
            />
          </NavigationContainer>
          <ModalCreateProduct
            handleClose={handleModalCreateClose}
            modalIsOpen={modalCreateOpen}
            productImage={fileProductImage}
            bindProductName={bindProductName}
            bindProductPrice={bindProductPrice}
            options={options}
            bindDropdownProductCategoryId={bindDropdownProductCategoryId}
            bindProductDescription={bindProductDescription}
            bindFileProductImage={bindFileProductImage}
            handleSave={handleModalCreateSave}
          />
          <ModalUpdateProduct
            handleClose={handleModalUpdateClose}
            modalIsOpen={modalUpdateOpen}
            productImage={fileProductImage}
            bindProductName={bindProductName}
            bindProductPrice={bindProductPrice}
            options={options}
            bindDropdownProductCategoryId={bindDropdownProductCategoryId}
            bindProductDescription={bindProductDescription}
            bindFileProductImage={bindFileProductImage}
            handleSave={handleModalUpdateSave}
            productId={productId}
          />
          <ModalManageCategory
            handleClose={handleModalManageClose}
            modalIsOpen={modalManageOpen}
          />
        </div>
      )}
      <Toast><SemanticToastContainer position="top-left" /></Toast>
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

export default connect(mapStateToProps, mapDispatchToProps)(Product);

// https://www.robinwieruch.de/react-hooks-fetch-data
