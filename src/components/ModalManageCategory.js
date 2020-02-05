import React,{ useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import qs from 'qs';

import {
  useInput
} from '../hooks/useInput';

// import { requestCategories } from '../redux/actions/categories';
import ModalCreateCategory from './ModalCreateCategory';
import ModalUpdateCategory from './ModalUpdateCategory';

import {
  Button,
  Header,
  Input,
  Loader,
  Modal,
  Pagination,
  Table
} from 'semantic-ui-react';

const ModalManageCategory = (props) => {
  const {
    handleClose,
    modalIsOpen
  } = props;

  const [searchCategoryName, setSearchCategoyName] = useState('');
  const [limitCategory, setLimitCategory] = useState(5);
  const [pageCategory, setPageCategory] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [dataCategories, setDataCategories] = useState({data: [], pagination: {}});

  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);

  const {
    value:categoryId,
    setValue:setValueCategoryId,
    reset:resetCategoryId
  } = useInput('');

  const {
    value:categoryName,
    setValue:setValueCategoryName,
    bind:bindCategoryName,
    reset:resetCategoryName
  } = useInput('');

  const { token } = props.auth.data;
  const headers = {
    headers: { authorization: token }
  };

  const configGetCategories = {
    headers: { authorization: token },
    params: {
      filter: {
        name: searchCategoryName,
      },
      page: pageCategory,
      limit: limitCategory
    },
    paramsSerializer: params => {
      return qs.stringify(params);
    }
  };

  const getCategories = async () => {
    await axios.get(`${process.env.REACT_APP_API_HOST}/categories`, configGetCategories)
    .then(res => {
      setDataCategories(res.data);
    })
  };

  const handleSearchCategoryName = (event, value) => {
    event.preventDefault();
    setSearchCategoyName(value);
  };

  const handlePageCategory = (event, value) => {
    event.preventDefault();
    setPageCategory(value);
  };

  const handleModalCreateOpen = () => {
    setModalCreateOpen(true);
  };

  const handleModalCreateClose = () => {
    resetCategoryName();
    setModalCreateOpen(false);
  };

  const handleModalCreateSave = async () => {
    const body = {
      name: categoryName
    };
    await axios.post(`${process.env.REACT_APP_API_HOST}/categories`, body, headers)
    .then(() => {
      getCategories();
      setModalCreateOpen(false);
    });
    resetCategoryName();
  };

  const handleModalUpdateOpen = (data) => {
    const {
      id,
      name
    } = data;
    setValueCategoryId(id);
    setValueCategoryName(name);

    setModalUpdateOpen(true);
  };

  const handleModalUpdateClose = () => {
    resetCategoryId();
    resetCategoryName();
    setModalUpdateOpen(false);
  };

  const handleModalUpdateSave = async (id) => {
    const body = {
      name: categoryName
    };
    await axios.put(`${process.env.REACT_APP_API_HOST}/categories/${id}`, body, headers)
    .then(() => {
      getCategories();
      setModalUpdateOpen(false);
    });
    resetCategoryId();
    resetCategoryName();
  };

  const handleDeleteCategory = async (event, id) => {
    event.preventDefault();
    await axios.delete(`${process.env.REACT_APP_API_HOST}/categories/${id}`, headers)
    .then(() => {
      getCategories();
    });
  };

  useEffect(() => {
    getCategories();
  }, [
    searchCategoryName,
    limitCategory
  ]);

  return (
    <Modal
      onClose={handleClose}
      open={modalIsOpen}
      size="mini"
      closeIcon
    >
      <Header as='h5' icon="tags" content="Manage Product Category" />
      <Modal.Content>
        <Input
          fluid
          icon='search'
          size="mini"
          placeholder='Search Category Name...'
          onChange={
            (event) => handleSearchCategoryName(event, event.target.value)
          }
        />
        <Table basic='very' compact striped>
          <Table.Body>
            { isLoading ? (
              <div style={{'height': '100%', 'verticalAlign': 'middle'}}>
                <Loader active />
              </div>
            ) : (
              dataCategories.data.map(category => {
                return (
                  <Table.Row key={category.id}>
                    <Table.Cell>{category.name}</Table.Cell>
                    <Table.Cell width={5} textAlign='right'>
                      <Button.Group icon size="mini">
                        <Button
                          icon='edit'
                          color='blue'
                          onClick={() => handleModalUpdateOpen(category)}
                        />
                        <Button
                          icon='trash'
                          color='red'
                          onClick={(event) => handleDeleteCategory(event, category.id)}
                        />
                      </Button.Group>
                    </Table.Cell>
                  </Table.Row>
                )
              })
            )}
          </Table.Body>
        </Table>
        <Pagination
          size="mini"
          boundaryRange={0}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          defaultActivePage={1}
          totalPages={
            dataCategories.pagination && dataCategories.pagination.total_page
            ? dataCategories.pagination.total_page
            : 0
          }
          onPageChange={handlePageCategory}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={handleModalCreateOpen}
          icon="add"
          color="green"
          content="Create"
        />
        <Button
          onClick={handleClose}
          icon="check"
          content="Done"
        />
      </Modal.Actions>
      <ModalCreateCategory
        handleClose={handleModalCreateClose}
        modalIsOpen={modalCreateOpen}
        bindCategoryName={bindCategoryName}
        handleSave={handleModalCreateSave}
      />
      <ModalUpdateCategory
        handleClose={handleModalUpdateClose}
        modalIsOpen={modalUpdateOpen}
        bindCategoryName={bindCategoryName}
        handleSave={handleModalUpdateSave}
        categoryId={categoryId}
      />
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // requestCategories: (config) => dispatch(requestCategories(config))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalManageCategory);
