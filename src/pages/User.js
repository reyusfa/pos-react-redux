import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import { SemanticToastContainer } from 'react-semantic-toasts';
import { toasting } from '../helper';

import { requestUsers, requestRoles } from '../redux/actions/users';

import {
  useInput
} from '../hooks/useInput';

import ModalUpdateUser from '../components/ModalUpdateUser';
import ModalCreateUser from '../components/ModalCreateUser';

import {
  CardContainer,
  FlexItemFull,
  Layout,
  Menu,
  NavigationContainer,
  NavigationItem,
  MenuLogo,
  Toast
} from '../components/Layout';

import {
  Button,
  Input,
  Loader,
  Pagination,
  Select,
  Table
} from 'semantic-ui-react';

const Product = (props) => {
  const dispatch = useDispatch();

  const { auth, users, roles, requestUsers, requestRoles } = props;
  const [searchUserName, setSearchUserName] = useState('');
  const [filterByRole, setFilterByRole] = useState('');
  const [limitUser, setLimitUser] = useState(5);
  const [pageUser, setPageUser] = useState(1);
  const [sortUser, setSortUser] = useState('name.asc');
  const [isLoading, setIsLoading] = useState(false);

  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);

  const { token } = auth.data;
  const headers = {
    headers: { authorization: token }
  };

  const configGetUsers = {
    headers: { authorization: token },
    params: {
      filter: {
        name: searchUserName,
        role_id: filterByRole
      },
      sort: sortUser,
      page: pageUser,
      limit: limitUser
    }
  };

  const optionsInput = roles.data.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id
    }
  });

  const options = [
    {
      key: 0,
      text: 'All Roles',
      value: ''
    },
    ...roles.data.map(item => {
      return {
        key: item.id,
        text: item.name,
        value: item.id
      }
    })
  ];

  const {
    value:userId,
    setValue:setValueUserId,
    reset:resetUserId
  } = useInput('');

  const {
    value:userUsername,
    setValue:setValueUserUsername,
    bind:bindUserUsername,
    reset:resetUserUsername
  } = useInput('');

  const {
    value:userPassword,
    bind:bindUserPassword,
    reset:resetUserPassword
  } = useInput('');

  const {
    value:userName,
    setValue:setValueUserName,
    bind:bindUserName,
    reset:resetUserName
  } = useInput('');

  const {
    value:userEmail,
    setValue:setValueUserEmail,
    bind:bindUserEmail,
    reset:resetUserEmail
  } = useInput('');

  const {
    value:userRoleId,
    setValue:setValueUserRoleId,
    bindDropdown:bindDropdownUserRoleId,
    reset:resetUserRoleId
  } = useInput(null);

  const handleModalCreateOpen = () => {
    setModalCreateOpen(true);  };

  const handleModalCreateClose = () => {
    setModalCreateOpen(false);
  };

  const handleModalCreateSave = async () => {
    try {
      if(!userName || userName === '') {
        toasting('Invalid Value!', 'Invalid name!', 'error');
        throw new Error();
      }
      if(!userUsername || userUsername === '') {
        toasting('Invalid Value!', 'Invalid username!', 'error');
        throw new Error();
      }
      if(!userEmail || userEmail === '') {
        toasting('Invalid Value!', 'Invalid email!', 'error');
        throw new Error();
      }
      if(!userPassword || userPassword === '') {
        toasting('Invalid Value!', 'Invalid password!', 'error');
        throw new Error();
      }

      const body = {
        name: userName,
        username: userUsername,
        email: userEmail,
        role_id: userRoleId,
        password: userPassword
      };
      await axios.post(`${process.env.REACT_APP_API_HOST}/users`, body, headers)
      .then(() => {
        requestUsers(configGetUsers);
        setModalCreateOpen(false);

        resetUserId();
        resetUserName();
        resetUserUsername();
        resetUserEmail();
        resetUserPassword();
        resetUserRoleId();
      });
    } catch {

    }
  };

  const handleModalUpdateOpen = (data) => {
    const {
      id,
      name,
      username,
      email,
      role_id
    } = data;
    setValueUserId(id)
    setValueUserName(name);
    setValueUserUsername(username);
    setValueUserEmail(email);
    setValueUserRoleId(role_id);

    setModalUpdateOpen(true);
  };

  const handleModalUpdateClose = () => {
    resetUserId();
    resetUserName();
    resetUserUsername();
    resetUserEmail();
    resetUserPassword();
    resetUserRoleId();

    setModalUpdateOpen(false);
  };

  const handleModalUpdateSave = async (id) => {
    try {
      if(!userUsername || userUsername === '') {
        toasting('Invalid Value!', 'Invalid username!', 'error');
        throw new Error();
      }
      if(!userEmail || userEmail === '') {
        toasting('Invalid Value!', 'Invalid email!', 'error');
        throw new Error();
      }
      if(!userName || userName === '') {
        toasting('Invalid Value!', 'Invalid name!', 'error');
        throw new Error();
      }

      const body = {
        name: userName,
        username: userUsername,
        email: userEmail,
        role_id: userRoleId,
        password: userPassword
      };
      await axios.put(`${process.env.REACT_APP_API_HOST}/users/${id}`, body, headers)
      .then(() => {
        requestUsers(configGetUsers);
        setModalUpdateOpen(false);
        
        resetUserId();
        resetUserName();
        resetUserUsername();
        resetUserEmail();
        resetUserPassword();
        resetUserRoleId();
      });
    } catch {

    }
  };

  const handleDeleteUser = async (event, id) => {
    event.preventDefault();
    await axios.delete(`${process.env.REACT_APP_API_HOST}/users/${id}`, headers)
    .then(() => {
      requestUsers(configGetUsers);
    });
  };

  const handleSearchUserName = (event, value) => {
    event.preventDefault();
    setSearchUserName(value);
  };

  const handleFilterByRole = (event, value) => {
    event.preventDefault();
    setFilterByRole(value);
  };

  const handleSortUser = (event, value) => {
    event.preventDefault();
    setSortUser(value);
  };

  const handlePageUser = (event, value) => {
    event.preventDefault();
    setPageUser(value.activePage);
  };

  const handleLimitUser = (event, value) => {
    event.preventDefault();
    setLimitUser(value);
  };

  useEffect(() => {
    requestRoles(configGetUsers);
  }, []);

  useEffect(() => {
    requestUsers(configGetUsers);
  }, [
    searchUserName,
    filterByRole,
    sortUser,
    pageUser,
    limitUser
  ]);

  return (
    <Layout
      {...props}
      menu={(
        <Menu inverted borderless size="large">
          <MenuLogo>Tumbas</MenuLogo>
          <Menu.Item
            as="a"
            color="blue"
            onClick={handleModalCreateOpen}
          >
            Add User
          </Menu.Item>
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
                placeholder='Search User Name...'
                onChange={
                  (event) => handleSearchUserName(event, event.target.value)
                }
              />
            </NavigationItem>
            <NavigationItem>
              <Select
                fluid
                placeholder='Filter by Role'
                options={options}
                onChange={
                  (event, { value }) => handleFilterByRole(event, value)
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
                  (event, { value }) => handleLimitUser(event, value)
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
                  {text: 'Update date - Oldest to Newest', value: 'updated_at.asc'},
                  {text: 'Update date - Newest to Oldest', value: 'updated_at.desc'}
                ]}
                onChange={
                  (event, { value }) => handleSortUser(event, value)
                }
              />
            </NavigationItem>
          </NavigationContainer>
          <CardContainer>
            <FlexItemFull>
            <Table celled striped compact>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Username</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>Role</Table.HeaderCell>
                  <Table.HeaderCell>Created on</Table.HeaderCell>
                  <Table.HeaderCell>Last Updated on</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Action</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {
                  users.data.map(user => {
                    const {
                      id,
                      username,
                      email,
                      name,
                      role_name,
                      created_at,
                      updated_at
                    } = user;

                    return (
                      <Table.Row key={id}>
                        <Table.Cell>{name}</Table.Cell>
                        <Table.Cell>{username}</Table.Cell>
                        <Table.Cell>{email}</Table.Cell>
                        <Table.Cell>{role_name}</Table.Cell>
                        <Table.Cell>{moment(created_at).format('DD MMMM YYYY HH:MM:SS')}</Table.Cell>
                        <Table.Cell>{moment(updated_at).format('DD MMMM YYYY HH:MM:SS')}</Table.Cell>
                        <Table.Cell textAlign="center">
                          <Button.Group icon size="mini">
                            <Button
                              icon='edit'
                              color='blue'
                              onClick={() => handleModalUpdateOpen(user)}
                            />
                            <Button
                              icon='trash'
                              color='red'
                              onClick={(event) => handleDeleteUser(event, id)}
                            />
                          </Button.Group>
                        </Table.Cell>
                      </Table.Row>
                    )
                  })
                }
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan='7'>
                    <Pagination
                      size="mini"
                      boundaryRange={0}
                      ellipsisItem={null}
                      firstItem={null}
                      lastItem={null}
                      defaultActivePage={1}
                      totalPages={
                        users.pagination && users.pagination.total_page
                        ? users.pagination.total_page
                        : 0
                      }
                      onPageChange={handlePageUser}
                    />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
            
            </FlexItemFull>
          </CardContainer>
          <NavigationContainer>
            
          </NavigationContainer>
          <ModalCreateUser
            handleClose={handleModalCreateClose}
            modalIsOpen={modalCreateOpen}
            bindUserUsername={bindUserUsername}
            bindUserPassword={bindUserPassword}
            bindUserName={bindUserName}
            options={optionsInput}
            bindUserEmail={bindUserEmail}
            bindDropdownUserRoleId={bindDropdownUserRoleId}
            handleSave={handleModalCreateSave}
          />
          <ModalUpdateUser
            handleClose={handleModalUpdateClose}
            modalIsOpen={modalUpdateOpen}
            bindUserUsername={bindUserUsername}
            bindUserPassword={bindUserPassword}
            bindUserName={bindUserName}
            options={optionsInput}
            bindUserEmail={bindUserEmail}
            bindDropdownUserRoleId={bindDropdownUserRoleId}
            handleSave={handleModalUpdateSave}
            userId={userId}
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
    users: state.users,
    roles: state.roles
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestUsers: (config) => dispatch(requestUsers(config)),
    requestRoles: (config) => dispatch(requestRoles(config))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
