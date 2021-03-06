import { useState, useEffect } from 'react';
import styled from 'styled-components';

const mbAddress = '0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7';
const mbAbi = JSON.stringify([{"inputs":[{"internalType":"address","name":"_punks","type":"address"},{"internalType":"address","name":"_glyphs","type":"address"},{"internalType":"address payable","name":"_beneficiary","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[],"name":"CommunityGrantEnds","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"index","type":"uint256"},{"indexed":true,"internalType":"address","name":"minter","type":"address"},{"indexed":false,"internalType":"uint256","name":"createdVia","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes32","name":"hash","type":"bytes32"}],"name":"OfferCancelled","type":"event"},{"anonymous":false,"inputs":[],"name":"SaleBegins","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"hash","type":"bytes32"},{"indexed":true,"internalType":"address","name":"maker","type":"address"},{"indexed":false,"internalType":"address","name":"taker","type":"address"},{"indexed":false,"internalType":"uint256","name":"makerWei","type":"uint256"},{"indexed":false,"internalType":"uint256[]","name":"makerIds","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"takerWei","type":"uint256"},{"indexed":false,"internalType":"uint256[]","name":"takerIds","type":"uint256[]"}],"name":"Trade","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"SALE_LIMIT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TOKEN_LIMIT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"maker","type":"address"},{"internalType":"address","name":"taker","type":"address"},{"internalType":"uint256","name":"makerWei","type":"uint256"},{"internalType":"uint256[]","name":"makerIds","type":"uint256[]"},{"internalType":"uint256","name":"takerWei","type":"uint256"},{"internalType":"uint256[]","name":"takerIds","type":"uint256[]"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"acceptTrade","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_approved","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"maker","type":"address"},{"internalType":"address","name":"taker","type":"address"},{"internalType":"uint256","name":"makerWei","type":"uint256"},{"internalType":"uint256[]","name":"makerIds","type":"uint256[]"},{"internalType":"uint256","name":"takerWei","type":"uint256"},{"internalType":"uint256[]","name":"takerIds","type":"uint256[]"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint256","name":"salt","type":"uint256"}],"name":"cancelOffer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"cancelledOffers","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"communityGrant","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contentHash","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractSealed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"creatorNftMints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"devMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endCommunityGrant","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"ethBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"maker","type":"address"},{"internalType":"address","name":"taker","type":"address"},{"internalType":"uint256","name":"makerWei","type":"uint256"},{"internalType":"uint256[]","name":"makerIds","type":"uint256[]"},{"internalType":"uint256","name":"takerWei","type":"uint256"},{"internalType":"uint256[]","name":"takerIds","type":"uint256[]"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint256","name":"salt","type":"uint256"}],"name":"hashToSign","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"marketPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_createVia","type":"uint256"}],"name":"mintWithPunkOrGlyph","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mintsRemaining","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"_name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"_owner","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_paused","type":"bool"}],"name":"pauseMarket","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"publicSale","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"saleDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"saleStartTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sealContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_operator","type":"address"},{"internalType":"bool","name":"_approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_price","type":"uint256"},{"internalType":"uint256","name":"_saleDuration","type":"uint256"}],"name":"startSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"_interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"_symbol","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"maker","type":"address"},{"internalType":"address","name":"taker","type":"address"},{"internalType":"uint256","name":"makerWei","type":"uint256"},{"internalType":"uint256[]","name":"makerIds","type":"uint256[]"},{"internalType":"uint256","name":"takerWei","type":"uint256"},{"internalType":"uint256[]","name":"takerIds","type":"uint256[]"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"tradeValid","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}])

const Wrapper = styled.div`
  width: 600px;
  overflow-wrap: break-word;
  border: 1px solid black;
`;
const InputRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const AllEventsList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const EventOption = styled.div`
  width: 49%;
  border: 1px solid black;
  height: 65px;
`

function AlertsSetup() {
  const [addressInput, setAddressInput] = useState(mbAddress);
  const [abiInput, setAbiInput] = useState(mbAbi);
  const [contract, setContract] = useState({ isLoading: false, isLoaded: false, data: null });
  const [error, setError] = useState(null);

  function fetchContract() {
    console.log('fetching contract', addressInput, abiInput);
    // build web3 Contract here
    let abi;
    try {
      abi = JSON.parse(abiInput);
    } catch (e) {
      console.log('error parsing contract ABI', e);
      setError(e);
      return;
    }
    const c = new window.web3.eth.Contract(abi, addressInput);
    console.log(c);
    setContract(state => ({ ...state, data: c, isLoading: false, isLoaded: true }));
    setError(null);
  }

  const { isLoading, isLoaded, data } = contract;
  const events = (data?.events && Object.keys(data.events)) || [];
  return (
    <Wrapper>
      <div>Set up alerts.</div>
      <InputRow>
        <div>Contract address: </div>
        <div>
          <input value={addressInput} onChange={e => setAddressInput(e.target.value)} />
        </div>
      </InputRow>
      <InputRow>
        <div>Contract ABI: </div>
        <div>
          <input value={abiInput} onChange={e => setAbiInput(e.target.value)} />
        </div>
      </InputRow>
      <button onClick={fetchContract}>Search</button>
      {isLoading ? 'Loading...' : error ? <div>{error}</div> : null}
      {isLoaded && <div>
        <div>Select an event to subscribe to</div>
        <AllEventsList>
          {events.map((ev, index) => <EventOption>{ev}</EventOption>)}
        </AllEventsList>
        
        </div>}
    </Wrapper>
  );
}

export default AlertsSetup;
