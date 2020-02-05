import React from 'react';

import {
  Flex,
  FlexItem,
  FlexItemFull,
  Image
} from '../components/Layout';

import {
  Button,
  Dropdown,
  Form,
  Header,
  Input,
  Modal,
  TextArea
} from 'semantic-ui-react';

const ModalCreateProduct = (props) => {
  const {
    handleClose,
    modalIsOpen,
    productImage,
    bindProductName,
    bindProductPrice,
    options,
    bindDropdownProductCategoryId,
    bindProductDescription,
    bindFileProductImage,
    handleSave
  } = props;
  return (
    <Modal
      onClose={handleClose}
      open={modalIsOpen}
      size="small"
      closeIcon
    >
      <Header as='h4' icon="box" content="Add New Product" />
      <Modal.Content>
        <Form>
          <Flex>
            <FlexItem>
              <Form.Field>
              <label>Image</label>
                <Image
                  bordered
                  fluid
                  rounded
                  src={productImage}
                />
                <input
                  type="file"
                  {...bindFileProductImage}
                />
              </Form.Field>
            </FlexItem>
            <FlexItem>
              <Form.Field
                control={Input}
                label="Name"
                placeholder="Name..."
                {...bindProductName}
              />
              <Form.Field>
                <label>Price</label>
                <Input
                  label='Rp.'
                  placeholder="Price..."
                  {...bindProductPrice}
                />
              </Form.Field>
              <Form.Field>
                <label>Category</label>
                <Dropdown
                  search
                  selection
                  placeholder="Category..."
                  options={options}
                  {...bindDropdownProductCategoryId}
                />
              </Form.Field>
            </FlexItem>
            <FlexItemFull>
              <Form.Field
                control={TextArea}
                label="Description"
                placeholder="Description..."
                {...bindProductDescription}
              />
            </FlexItemFull>
          </Flex>
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

export default ModalCreateProduct;
