/* import React from 'react' */
import { Button, HStack } from "@chakra-ui/react";
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
          <Link to="/coins"> Coins</Link>
        </Button>

        <Button _hover={{ color: "gold" }} color={"white"} variant={"link"}>
          <Link to="/exchanges"> Exchange</Link>
        </Button>
      </HStack>
    </>
  );
};

export default Header;
