import { useState, useEffect } from 'react';
import styled from 'styled-components';
import numeral from 'numeral';

function RecentSales({ events = [], idMap = {} }) {
  return (
    <Wrapper>
      <Title>Recent sales</Title>
      <List>
        {events.map((event, index) => {
          console.log(event);
          const { total_price, asset } = event;
          const metadata = idMap[event.asset.token_id];
          const price = numeral(total_price).value();
          const readablePrice = numeral(price * Math.pow(10, -1 * event.payment_token.decimals)).format('0.00');
          return (
            <ListItem key={index}>
              <img src={asset.image_thumbnail_url} />
              <ListItemData>
                <a href={asset.permalink} target="_blank" rel="noopener noreferrer">{asset.name}</a>
                <div>{readablePrice}</div>
              </ListItemData>
            </ListItem>
          );
        })}
      </List>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 22rem;
  border: 1px solid black;
  max-height: 40rem;
  overflow: scroll;
`;

const Title = styled.div`
  padding: 0.5rem 0;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;
const ListItem = styled.div`
  padding: 0.2rem;
  height: 7rem;
  display: flex;
`;
const ListItemData = styled.div`
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export default RecentSales;
