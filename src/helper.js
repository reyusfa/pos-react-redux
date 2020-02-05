import React from 'react';
import { toast } from 'react-semantic-toasts';

const toasting = (title = '', description = '', type = 'success') => {
  return setTimeout(() => {
    toast(
      {
        time: 3000,
        title: title,
        type: type,
        description: (<p>{description}</p>)
      }
    );
  }, 100);
};

export {
  toasting
};
