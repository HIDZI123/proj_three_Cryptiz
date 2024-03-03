/* eslint-disable react/prop-types */
/* import React from 'react' */
import axios from "axios";
import { useState, useEffect } from "react";
import { server } from "../App";
import { useParams } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import Error from "./Error";
import Loader from "./Loader";
import Chart from "./Chart";

const CoinDetails = () => {
  const [coins, SetCoins] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [error, SetError] = useState(false);
  const [currency, SetCurrency] = useState("inr");
  const [days, SetDays] = useState("24h");
  const [chartArr, SetChartData] = useState([]);
  const params = useParams();

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24H", "1D", "7D", "14D", "30D", "60D", "200D", "1Yr", "MAX"];

  const SwitchChartStats = (key) => {
    switch (key) {
      case "24H":
        SetDays("24h");
        SetLoading(true);
        break;
      case "1D":
        SetDays("1d");
        SetLoading(true);
        break;
      case "7D":
        SetDays("7d");
        SetLoading(true);
        break;
      case "14D":
        SetDays("14d");
        SetLoading(true);
        break;
      case "30D":
        SetDays("30d");
        SetLoading(true);
        break;
      case "60D":
        SetDays("60d");
        SetLoading(true);
        break;
      case "200D":
        SetDays("200d");
        SetLoading(true);
        break;
      case "1Yr":
        SetDays("365d");
        SetLoading(true);
        break;
      case "MAX":
        SetDays("max");
        SetLoading(true);
        break;

      default:
        SetDays("24h");
        SetLoading(true);
        break;
    }
  };

  useEffect(() => {
    const fetchcoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id} `);
        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days} `
        );

/*         console.log(data);
        console.log(chartData); */

        SetChartData(chartData.prices);
        SetCoins(data);
        SetLoading(false);
      } catch (error) {
        SetLoading(true);
        SetError(true);
      }
    };
    fetchcoin();
  }, [currency, days, params.id]);

  if (error) {
    <Error
      message={"Error While Loading the screen, please try again in a while "}
    />;
  }

  return (
    <Container maxW={'container.xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={SetCurrency} p={"4"}>
            <HStack m={"2"}>
              <Radio mx={"8"} value={"inr"}>
                INR (₹)
              </Radio>
              <Radio mx={"8"} value={"eur"}>
                EUR (€)
              </Radio>
              <Radio mx={"8"} value={"usd"}>
                USD ($)
              </Radio>
            </HStack>
          </RadioGroup>

          <Box w={'full'} borderWidth={'1'}>
            <Chart arr={chartArr} currency={currencySymbol} days={days} />
          </Box>

          <HStack p={'4'} w={'full'} overflowX={'auto'}>
            {btns.map((i)=>(
              <Button key={i}
              disabled = {days === i}
              onClick={() => {SwitchChartStats(i)}}>
                {i}
              </Button>
            ))}
          </HStack>

           

          <Text fontSize={"small"} alignItems="center" opacity={0.7} m={'4'}>
              Last Updated On{" "}
              {Date(coins.market_data.last_updated).split("G")[0]}
            </Text>

          <Image
            borderRadius={"lg"}
            src={coins.image.large}
            w={"16"}
            h={"16"}
            objectFit={"contain"}
          />

          <Stat>
            <StatLabel> {coins.name} </StatLabel>
            <StatNumber>
              {currencySymbol}
              {coins.market_data.current_price[currency]}
            </StatNumber>

            <StatHelpText>
              <StatArrow
                type={
                  coins.market_data.market_cap_change_percentage_24h > 0
                    ? "increase"
                    : "decrease"
                }
              />
              {coins.market_data.market_cap_change_percentage_24h}%
            </StatHelpText>

            <Badge
              fontSize={"2xl"}
              p={"4"}
              borderRadius={"lg"}
              bgColor={"blackAlpha.800"}
              color={"white"}
            >
              {`#${coins.market_data.market_cap_rank}`}
            </Badge>

            <CustomBar
              low={`${currencySymbol}${coins.market_data.low_24h[currency]}`}
              high={`${currencySymbol}${coins.market_data.high_24h[currency]}`}
            />

            <Box w={"full"} p={"4"}>
              <Item title={"Max Supply"} value={coins.market_data.max_supply} />
              <Item
                title={"Circulating Supply"}
                value={coins.market_data.circulating_supply}
              />
              <Item
                title={"Market Cap"}
                value={`${currencySymbol} ${coins.market_data.market_cap[currency]}`}
              />
              <Item
                title={"All Time High"}
                value={`${currencySymbol} ${coins.market_data.ath[currency]}`}
              />
              <Item
                title={"All Time Low"}
                value={`${currencySymbol} ${coins.market_data.atl[currency]}`}
              />
            </Box>
          </Stat>
         
        </>
      )}
    </Container>
  );
};

const CustomBar = ({ low, high }) => {
  return (
    <VStack w={"full"} mt={"5"}>
      <Progress w={"full"} colorScheme={"yellow"} value={"50"} />
      <HStack justifyContent={"space-between"} w={"full"}>
        <Badge colorScheme={"red"}>{low}</Badge>
        <Text fontSize={"sm"}> 24H range </Text>
        <Badge colorScheme={"green"}>{high}</Badge>
      </HStack>
    </VStack>
  );
};

const Item = ({ title, value }) => {
  return (
    <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
      <Text fontFamily={"Roboto"} letterSpacing={"widest"} fontWeight={"500"}>
        {" "}
        {title}{" "}
      </Text>
      <Text>{value}</Text>
    </HStack>
  );
};

export default CoinDetails;
