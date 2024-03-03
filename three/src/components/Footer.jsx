/* import React from "react"; */
import { Avatar, Box, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import {AiFillGithub, AiFillInstagram, AiFillMail} from "react-icons/ai";


const Footer = () => {
  return (
    <Box
      bgColor={"#03131A"}
      color={"white"}
      minH={"48"}
      px={"16"}
      py={["16", "8"]}
      fontFamily={'Roboto'}
      borderTop={'1px solid gold'}
    >
      <Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>
        <VStack w={"full"} alignItems={["center", "flex-start"]}>
          <Text fontWeight={"bold"}>About Us</Text>
          <Text
            fontSize={"sm"}
            letterSpacing={"widest"}
            textAlign={["center", "left"]}
          >
            We are the best crypto trading app in India, we provide our guidance
            at a very cheap price.
          </Text>
        </VStack>

        <VStack>
          <Avatar boxSize={"28"} mt={["4", "0"]}   />
          <Text>Our Founder</Text>
        </VStack>
      </Stack>
      <HStack w={'full'}>
        <Text fontSize={'sm'} fontWeight={'bold'} >Contact Us</Text>
        <a href="https://github.com/HIDZI123" >
          <AiFillGithub size={'2rem'} />
        </a>
        <a href="https://www.instagram.com/__mustafasarangpurwala__/">
          <AiFillInstagram size={'2rem'}/>
        </a>
      </HStack>
      <HStack>
        <AiFillMail/>
        <Text fontSize={'sm'} >yusufmustufa@gmail.com</Text>
      </HStack>
    </Box>
  );
};

export default Footer;