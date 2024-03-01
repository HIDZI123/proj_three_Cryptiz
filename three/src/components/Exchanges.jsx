/* eslint-disable react/prop-types */
/* import React from 'react' */
import axios from "axios";
import { useState, useEffect } from "react";
import { server } from "../App";
import {
  Container,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Loader from "./Loader";
import Error from "./Error";

const Exchanges = () => {
  const [exchange, SetExchange] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [error, SetError] = useState(false);

  useEffect(() => {
    const functionCall = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
       /*  console.log(data); */
        SetExchange(data);
        SetLoading(false);
      } 
      catch (error) {
        SetError(true);
        SetLoading(false);
      }
    };

    functionCall();
  }, []);

  if (error) {
    return (
      <Error
        message={"Error While Loading the screen, please try again in a while "}
      />
    );
  }

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchange.map((i) => (
              <ExchangeCard
                key={i.id}
                url={i.url}
                name={i.name}
                image={i.image}
                rank={i.trust_score_rank}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

const ExchangeCard = ({ url, name, image, rank }) => {
  return (
    <a href={url} target="blank">
      <VStack
        w={"52"}
        p={"8"}
        margin={"4"}
        shadow={"lg"}
        transition={"all 0.3s"}
        css={{
          "&:hover": {
            transform: "scale(1.25)",
          },
        }}
      >
        <Image
          src={image}
          objectFit={"contain"}
          w={"10"}
          h={"10"}
          alt={"Exchange"}
        />
        <Heading size={"md"} noOfLines={1}>
          {rank}
        </Heading>
        <Text>{name}</Text>
      </VStack>
    </a>
  );
};

export default Exchanges;
