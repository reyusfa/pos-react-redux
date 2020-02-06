import React from 'react';
import moment from 'moment';

import {
  List,
  Modal
} from 'semantic-ui-react';

const ModalCheckout = (props) => {
  const {
    handleClose,
    modalIsOpen,
    detailOrder
  } = props;
  return (
    <Modal
      onClose={handleClose}
      open={modalIsOpen}
      size="tiny"
      closeIcon
    >
      <Modal.Content>
        <List divided relaxed size="large">
          <List.Item>
            <List.Content>
              <List.Header>{detailOrder.user_name}</List.Header>
              <List.Header>Order #{detailOrder.reference}</List.Header>
            </List.Content>
            <List.Content floated="right">
              <List.Description>{moment(detailOrder.created_at).format('DD-MM-YYYY HH:MM:SS')}</List.Description>
            </List.Content>
          </List.Item>
        </List>
        <List divided relaxed size="large">
          {
            (detailOrder.orders || []).map(item => {
              return (
                <List.Item key={item.product_id}>
                  <List.Content>
                    <List.Header>{item.product_name}</List.Header>
                    <List.Description>
                      {`${item.quantity} x ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}`}
                    </List.Description>
                  </List.Content>
                  <List.Content floated="right">
                    <List.Header>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.subtotal)}</List.Header>
                  </List.Content>
                </List.Item>
              )
            })
          }
          <List.Item>
            <List.Content>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>Total:</List.Header>
            </List.Content>
            <List.Content floated="right">
              <List.Header>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(detailOrder.total)}</List.Header>
            </List.Content>
          </List.Item>
        </List>
      </Modal.Content>
      {/*<Modal.Actions>
        <Button
          onClick={handleClose}
          icon="check"
          content="Done"
        />
      </Modal.Actions>*/}
    </Modal>
  );
};

export default ModalCheckout;
