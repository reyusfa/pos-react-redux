import { useState } from 'react';

const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(''),
    bind: {
      defaultValue: value,
      onChange: event => {
        setValue(event.target.value);
      }
    },
    bindFile: {
      onChange: event => {
        setValue(event.target.files[0]);
      }
    },
    bindDropdown: {
      defaultValue: value,
      onChange: (event, { value }) => {
        setValue(value);
      }
    }
  };
};
const useInputImage = initialValue => {
  const [value, setValue] = useState(initialValue);
  const [file, setFile] = useState(initialValue);

  return {
    value,
    file,
    setValue,
    setFile,
    reset: () => {
      setValue('');
      setFile('');
    },
    bindFile: {
      onChange: event => {
        setValue(event.target.files[0]);
        setFile(URL.createObjectURL(event.target.files[0]));
      }
    }
  };
};

export {
  useInput,
  useInputImage
};

// https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
