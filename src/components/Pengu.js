import { useState, useEffect } from 'react';
import styled from 'styled-components';
import CountAtPrice from './CountAtPrice';
import abi from '../abi/opensea.js';
const contractAddress = '0x7be8076f4ea4a4ad08075c2508e481d6c946d12b';

function setupListeners() {
  console.info('setup listeners');
  const web3Contract = new window.web3.eth.Contract(abi, contractAddress);

  const options = {};
  web3Contract.events['OwnershipTransferred'](
    {
      fromBlock: 0,
    },
    function (error, event) {
      console.log(event);
    },
  )
    .on('connected', function (subscriptionId) {
      console.log('connected');
      console.log(subscriptionId);
    })
    .on('data', function (event) {
      console.log('data');
      console.log(event); // same results as the optional callback above
    })
    .on('changed', function (event) {
      // remove event from local database
    })
    .on('error', function (error, receipt) {
      // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
    });

  // OwnershipTransferred
}

function Pengu() {
  // fetch recent sale/transfer events
  // store them in local state
  // set up listener for new events
  // push those to state
  // render the state
  useEffect(setupListeners, []);
  return (
    <div>
      <CountAtPrice />
    </div>
  );
}

export default Pengu;
