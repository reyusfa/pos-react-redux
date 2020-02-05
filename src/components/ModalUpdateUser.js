import React from 'react';

import {
  Button,
  Dropdown,
  Form,
  Header,
  Input,
  Modal
} from 'semantic-ui-react';

const ModalUpdateUser = (props) => {
  const {
    handleClose,
    modalIsOpen,
    bindUserUsername,
    bindUserPassword,
    bindUserName,
    options,
    bindUserEmail,
    bindDropdownUserRoleId,
    handleSave,
    userId
  } = props;
  return (
    <Modal
      onClose={handleClose}
      open={modalIsOpen}
      size="mini"
      closeIcon
    >
      <Header as='h4' icon="edit outline" content="Update Data User" />
      <Modal.Content>
        <Form>
          <Form.Field
            control={Input}
            label="Username"
            placeholder="Username"
            {...bindUserUsername}
          />
          <Form.Field
            control={Input}
            type="password"
            label="Password"
            placeholder="Password"
            {...bindUserPassword}
          />
          <Form.Field
            control={Input}
            label="Name"
            placeholder="Name"
            {...bindUserName}
          />
          <Form.Field
            control={Input}
            label="Email"
            placeholder="Email"
            {...bindUserEmail}
          />
          <Form.Field>
            <label>Role</label>
            <Dropdown
              search
              selection
              placeholder="Role"
              options={options}
              {...bindDropdownUserRoleId}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={() => handleSave(userId)}
          icon="check"
          content="Save"
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ModalUpdateUser;
