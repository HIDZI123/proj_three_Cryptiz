/* eslint-disable react/prop-types */
import { Text } from "@chakra-ui/react";

/* import React from 'react' */
const Error = ({ message }) => {
  return (
    <>
      <Text
        textDecorationStyle={"wavy"}
        fontSize={"md"}
        fontFamily={"cursive"}
        textAlign={"center"}
        mt={'5rem'}
      >
        {message}
      </Text>
    </>
  );
};

export default Error;
