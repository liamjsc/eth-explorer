import { useState, useEffect } from 'react';
import { EventType } from 'opensea-js';
import styled from 'styled-components';
import CountAtPrice from './CountAtPrice';
import RecentSales from './RecentSales';
import { useGetOpenseaEvents, useFetchMetadataMap } from '../hooks/opensea';
import numeral from 'numeral';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, MarkSeries } from 'react-vis';
import opensea from '../abi/opensea';

const penguinAddress = '0xbd3531da5cf5857e7cfaa92426877b022e612cf8';
const bganAddress = '0x31385d3520bced94f77aae104b406994d8f2168c';
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
function RecentSalesContainer({ seaportLoaded, seaport }) {
  const [input, setInput] = useState('0xbd3531da5cf5857e7cfaa92426877b022e612cf8');
  const [currentAddress, setCurrentAddress] = useState('0xbd3531da5cf5857e7cfaa92426877b022e612cf8');
  const [isLoading, events] = useGetOpenseaEvents('successful', { assetContractAddress: currentAddress });
  const [onDisplay, setOnDisplay] = useState(null);

  function submit() {
    setCurrentAddress(input);
    setInput('');
  }

  console.log(EventType);
  // add listener on new events for the currentAddress
  useEffect(() => {
    console.log('use add listener', seaportLoaded)
    if (!seaportLoaded) return;
    seaport.addListener(EventType.MatchOrders, data => {
      console.info({ data });
    });
    return function(){
      seaport.removeAllListeners(EventType.MatchOrders)
    };
    // MatchOrders
    // PurchaseAssets
  }, [seaportLoaded]);

  const assetMetadataMap = useFetchMetadataMap(events, findTokenMetadataUrl);

  if (isLoading) return <div> loading </div>;
  const chartData = events.map((e, index) => {
    const price = parseFloat(formatPrice(e));
    return {
      x: parseInt(e.transaction.block_number),
      y: price,
      ...e,
    };
  });

  return (
    <Wrapper>
      {/* <Title>Pudgy Penguins</Title> */}
      <InputArea>
        <input value={input} onChange={e => setInput(e.target.value)} />
        <button onClick={submit}>Search</button>
        <div>
          <button onClick={() => setCurrentAddress(mbAddress)}>Meebits</button>
          <button onClick={() => setCurrentAddress(penguinAddress)}>Pudgy Penguins</button>
          <button onClick={() => setCurrentAddress(bganAddress)}>BGAN Punks</button>
        </div>
      </InputArea>

      <div style={{ display: 'flex' }}>
        <RecentSales events={events} idMap={assetMetadataMap} />
        <div style={{ display: 'flex', maxWidth: 900, paddingLeft: '3rem', flexDirection: 'column' }}>
          <XYPlot width={900} height={300}>
            <HorizontalGridLines />
            <MarkSeries
              data={chartData}
              onNearestX={value => {
                if (onDisplay?.id !== value.id) {
                  setOnDisplay(value);
                }
              }}
            />
            <XAxis />
            <YAxis />
          </XYPlot>
          {onDisplay && (
            <OnDisplay>
              <ListItem>
                <img src={onDisplay.asset.image_thumbnail_url} />
                <ListItemData>
                  <a href={onDisplay.asset.permalink} target="_blank" rel="noopener noreferrer">
                    {onDisplay.asset.name}
                  </a>
                  <div>{onDisplay.y} ETH</div>
                </ListItemData>
              </ListItem>{' '}
            </OnDisplay>
          )}
        </div>
        <CountAtPrice />
      </div>
    </Wrapper>
  );
}

const OnDisplay = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-wieght: bold;
  font-size: 18px;
`;

const InputArea = styled.div`
  width: 25%;
`;
const ListItem = styled.div`
  padding: 0.2rem;
  height: 7rem;
  width: 10value.rem;
  display: flex;
`;
const ListItemData = styled.div`
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
export default RecentSalesContainer;
