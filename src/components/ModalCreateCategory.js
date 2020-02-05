import React from 'react';

import {
  Button,
  Dropdown,
  Form,
  Header,
  Input,
  Modal
} from 'semantic-ui-react';

const ModalCreateCategory = (props) => {
  const {
    handleClose,
    modalIsOpen,
    bindCategoryName,
    handleSave
  } = props;
  return (
    <Modal
      onClose={handleClose}
      open={modalIsOpen}
      size="mini"
      closeIcon
    >
      <Header as='h5' icon="tag" content="Add New Category" />
      <Modal.Content>
        <Form>
          <Form.Field
            control={Input}
            label="Category Name"
            placeholder="Category Name"
            {...bindCategoryName}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={() => handleSave()}
          icon="check"
          content="Save"
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ModalCreateCategory;
