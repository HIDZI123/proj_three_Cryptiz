/* import React from 'react' */
import { Button, Container, HStack } from "@chakra-ui/react";
import { color } from "framer-motion";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <HStack
        w={"full"}
        h={"4rem"}
        bgColor={"blackAlpha.800"}
        shadow={"base"}
        justifyContent={"space-evenly"}
        borderBottom={"1px solid gold"}
        p={"4"}
      >
        <Button _hover={{ color: "gold" }} color={"white"} variant={"link"}>
          <Link to="/"> Home</Link>
        </Button>

        <Button _hover={{ color: "gold" }} color={"white"} variant={"link"}>
          <Link to="/"> Coins</Link>
        </Button>

        <Button _hover={{ color: "gold" }} color={"white"} variant={"link"}>
          <Link to="/exchanges"> Exchange</Link>
        </Button>
      </HStack>
    </>
  );
};

export default Header;
