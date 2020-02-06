import React from 'react';

import {
  CardItem,
  Image,
  CardPrice
} from '../components/Layout';

import {
  Card
} from 'semantic-ui-react';

const CardProduct = (props) => {
  const {
    image,
    name,
    actionButtons,
    data
  } = props;
  return (
    <CardItem>
      <Card
        color="blue"
        as="a"
      >
        <Image src={image} />
        <CardPrice>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data.price)}</CardPrice>
        <Card.Content>
          <Card.Description>
            <strong>{name}</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {actionButtons}
        </Card.Content>
      </Card>
    </CardItem>
  );
}

export {
  CardProduct
}
