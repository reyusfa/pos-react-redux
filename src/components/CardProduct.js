import React from 'react';

import {
  CardItem,
  Image
} from '../components/Layout';

import {
  Card
} from 'semantic-ui-react';

const CardProduct = (props) => {
  const {
    image,
    name,
    actionButtons
  } = props;
  return (
    <CardItem>
      <Card
        color="blue"
        as="a"
      >
        <Image src={image} />
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
