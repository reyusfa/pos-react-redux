import React from 'react';

import {
  CardItem,
  Image
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
        <Card.Content extra>
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
