/* eslint-disable react/prop-types */
/* import React from 'react' */
import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../App";
import Error from "./Error";
import Loader from "./Loader";
import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Coins = () => {
  const [coins, SetCoins] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [error, SetError] = useState(false);
  const [currency, SetCurrency] = useState("inr");
  const [page, SetPage] = useState(1);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    SetPage(page);
    SetLoading(true);

  }

  const btns = new Array(132).fill(1);

  useEffect(() => {
    const callCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
       /*  console.log(data); */
        SetCoins(data);
        SetLoading(false);
      } catch (error) {
        SetLoading(true);
        SetError(false);
      }
    };

    callCoins();
  }, [currency, page]);

  if (error) {
    return (
      <Error
        message={"Error While Loading the screen, please try again in a while "}
      />
    );
  }

  return (
    <Container maxW={'container.xl'} >
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup onChange={SetCurrency}  value={currency} p={'4'}>
            <HStack  m={'2'} >
              <Radio mx={'8'} value={'inr'} > INR (₹)  </Radio>
              <Radio mx={'8'} value={'eur'}> EUR (€) </Radio>
              <Radio mx={'8'} value={'usd'}> USD ($) </Radio>
            </HStack>
          </RadioGroup>


          <HStack wrap={'wrap'} justifyContent={'space-evenly'} >
            {coins.map((i) => (
              <CoinCard
                key={i.id}
                id={i.id}
                name={i.name}
                symbol={i.symbol}
                currencySymbol={currencySymbol}
                price={i.current_price}
                image={i.image}
              />
            ))}
          </HStack>

          <HStack p={'2'} w={'full'} overflowX={'auto'}>
            {btns.map((item, index)=> (
                <Button 
                key={index}
                bgColor={'blackAlpha.800'}
                _hover={{color : 'gold',
                          transform: 'scale(1.2)'}}
                color={'white'}
                onClick={() => {changePage(index+1)}}
                >
                  {index + 1}
                </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

const CoinCard = ({ id, name, symbol, currencySymbol = "₹", price, image }) => {
  return (
    <Link to={`/coin/${id}`}>
      <VStack
        w={"52"}
        shadow={"lg"}
        p={"8"}
        m={"4"}
        _hover={{ transform: "scale(1.25)" }}
        transition={"all 0.3s"}
        borderRadius={'lg'}
      >
        <Image
          h={"10"}
          w={"10"}
          objectFit={"contain"}
          src={image}
          alt={"Coins"}
        />
        <Heading size={"md"} noOfLines={1}>
          {" "}
          {symbol}{" "}
        </Heading>

        <Text noOfLines={1}>{name}</Text>
        <Text> {price ? `${currencySymbol} ${price}` : "NA"} </Text>
      </VStack>
    </Link>
  );
};

export default Coins;
