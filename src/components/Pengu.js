import { useState, useEffect } from 'react';
import styled from 'styled-components';
import CountAtPrice from './CountAtPrice';
import RecentSales from './RecentSales';
import { opensea as abi, meebits as mbAbi } from '../abi/opensea.js';
import { useContract, useGetPastEvents } from '../hooks/contract';
import { useGetOpenseaEvents, useFetchMetadataMap } from '../hooks/opensea';
import numeral from 'numeral';
import { Chart } from 'react-google-charts';

const penguinAddress = '0xbd3531da5cf5857e7cfaa92426877b022e612cf8';
const openseaAddress = '0x7be8076f4ea4a4ad08075c2508e481d6c946d12b';
const mbAddress = '0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7';

function findTokenMetadataUrl(event) {
  console.log('drill', event);
  return event.asset.token_metadata;
}

function formatPrice(event) {
  const { total_price } = event;
  const price = numeral(total_price).value();
  return numeral(price * Math.pow(10, -1 * event.payment_token.decimals)).format('0.00');
}

// fetch recent sale/transfer events
// store them in local state
// set up listener for new events
// push those to state
// render the state
function Pengu() {
  const [isLoading, events] = useGetOpenseaEvents('successful', { assetContractAddress: penguinAddress });
  console.log(isLoading, events, '--isloading');
  const assetMetadataMap = useFetchMetadataMap(events, findTokenMetadataUrl);

  if (!events.map) console.log('error in events.map', events);
  if (isLoading) return <div> loading </div>;
  const chartData = [
    ['Time', 'Price'],
    ...events.map((e, index) => {
      const price = parseFloat(formatPrice(e));
      return [index, price];
    }),
  ];

  return (
    <Wrapper>
      <Title>Pudgy Penguins</Title>
      <div style={{ display: 'flex' }}>
        <RecentSales events={events} idMap={assetMetadataMap} />

        <div style={{ display: 'flex', maxWidth: 900, paddingLeft: '3rem' }}>
          <Chart
            width={500}
            height={600}
            chartType="ScatterChart"
            loader={<div>Loading Chart</div>}
            data={chartData}
            options={{
              title: 'Price over time',
              chartArea: { width: '90%' },
              hAxis: {
                title: '',
                minValue: 0,
              },
              vAxis: {
                title: 'Price (ETH)',
              },
            }}
            legendToggle
          />
        </div>
        <CountAtPrice />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-wieght: bold;
  font-size: 18px;
`;

export default Pengu;
