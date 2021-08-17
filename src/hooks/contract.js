import { useState, useEffect } from 'react';
export function useContract(abi, address) {
  const web3contract = new window.web3.eth.Contract(abi, address);
  return web3contract;
}

export function useGetPastEvents(contract, options) {
  const { eventName, fromBlock = 13037922 - 10, toBlock = 'latest' } = options;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    contract
      .getPastEvents(eventName, { fromBlock, toBlock })
      .then(pastEvents => {
        console.log(pastEvents);
        const sortedPastEvents = pastEvents.reverse();
        setEvents(sortedPastEvents);
        setLoading(false);
      })
      .catch(error => console.log(error));
    setLoading(false);
  });

  return [loading, events];
}
