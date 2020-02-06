import React from 'react';

import {
  CardItem,
  Image,
  CardPrice
} from '../components/Layout';

import {
  Card
} from 'semantic-ui-react';

const CardOrder = (props) => {
  const {
    image,
    name,
    handleSelectItem,
    data
  } = props;
  return (
    <CardItem
      onClick={(event) => {handleSelectItem(event, data)}}
    >
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
      </Card>
    </CardItem>
  );
}

export {
  CardOrder
}
