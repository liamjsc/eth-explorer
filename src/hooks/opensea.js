import { useState, useEffect } from 'react';
import qs from 'qs';
export function useGetOpenseaEvents(eventType = 'transfer', options) {
  const { assetContractAddress: asset_contract_address } = options;

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = {
    event_type: eventType,
    asset_contract_address,
    only_opensea: false,
    limit: 40,
  };
  
  useEffect(() => {
    window
      .fetch(`https://api.opensea.io/api/v1/events?${qs.stringify(params)}`)
      .then(data => data.json())
      .then(e => {
        setEvents(e?.asset_events || []);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, [asset_contract_address, eventType]);
  return [loading, events];
}

export function useFetchMetadataMap(events, getMetadataUrl) {
  const [metadataMap, setMetadataMap] = useState(null);
  const metadataStore = {};
  useEffect(() => {
    const promises = events.map(e => {
      const url = getMetadataUrl(e);
      console.log('url', url);
      return window
        .fetch(url)
        .then(data => data.json())
        .then(data => {
          console.log('setting tempData', data);
          metadataStore[e.asset.token_id] = data; // attributes[{trait_type, value}], description, image, name
        })
        .catch(error => console.log('promise error', error));
    });
    Promise.all(promises).then(() => {
      setMetadataMap(metadataStore);
    });
  }, [events]);
  return metadataMap;
}
