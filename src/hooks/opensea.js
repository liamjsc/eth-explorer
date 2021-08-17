import { useState, useEffect } from 'react';

export function useGetOpenseaEvents(eventType = 'transfer', options) {
  const { assetContractAddress: asset_contract_address } = options;

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window
      .fetch(`https://api.opensea.io/api/v1/events?event_type=${eventType}&asset_contract_address=${asset_contract_address}&only_opensea=false&offset=0&limit=20`)
      .then(data => data.json())
      .then(e => {
        console.log('setEvents');
        console.log(e);
        setEvents(e?.asset_events || []);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  });
  return [loading, events];
}

export function useFetchMetadataMap(events, getMetadataUrl) {
  console.log('fetching all metadata', events);
  const [metadataMap, setMetadataMap] = useState(null);
  const tempMeta = {};
  const promises = events.map(e => {
      return new Promise.resolve();
    // return window
    //   .fetch(getMetadataUrl(e))
    //   .then(data => data.json())
    //   .then(data => {
    //     tempMeta[e.asset.token_id] = data; // attributes[{trait_type, value}], description, image, name
    //   });
  });
  Promise.all(promises).then(() => {
    console.log('promises done');
    setMetadataMap(tempMeta);
  });

  return metadataMap;
}
