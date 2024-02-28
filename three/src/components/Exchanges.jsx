/* import React from 'react' */
import axios from "axios";
import { useState, useEffect } from "react";
import { server } from "../App";
import { Container, HStack } from "@chakra-ui/react";
import Loader from "./Loader";

const Exchanges = () => {
  const [exchange, SetExchange] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [error, SetError] = useState(false);

  useEffect(() => {
    const functionCall = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        console.log(data);
        SetExchange(data);
        SetLoading(false);
      } catch (error) {
        SetError(true);
        SetLoading(false);
      }
    };

    functionCall();
  }, []);

  return (
    <Container maxw={'container.xl'} >
      { loading ? (
        <Loader/>
      ) : (
        <>
        <HStack>
          {exchange.map((i) =>(
            <ExchangeCard/>
          ))}
        </HStack>
        </>
      )}

    </Container>

  );

  const ExchangeCard = ()=>(
    yolo
  );
};

export default Exchanges;
