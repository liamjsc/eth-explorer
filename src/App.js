import Web3 from 'web3';
import { useState, useEffect, useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import MeebitTransfers from './components/MeebitTransfers';
import AlertsSetup from './components/AlertsSetup';
import Pengu from './components/Pengu';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { OpenSeaPort, Network } from 'opensea-js';

function useWeb3() {
  const [isWeb3Loaded, setLoaded] = useState(false);
  useEffect(() => {
    console.log('in effect use web3');

    if (typeof window.web3 !== 'undefined') {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      window.web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider('http://localhost:8545'));
    }
    console.log('web 3 set:');
    console.log(window.web3);
    setLoaded(true);
  }, []);
  return [isWeb3Loaded, window.web3];
}

function useSeaport(isWeb3Loaded, provider) {
  const [seaport, setSeaport] = useState(null);
  console.log('before useEffect', isWeb3Loaded, provider);
  useEffect(() => {
    console.log('in effect use seaport');
    if (!isWeb3Loaded) return;
    console.log(provider);
    const seaportSDK = new OpenSeaPort(provider, {
      networkName: Network.Main,
    });
    setSeaport(seaportSDK);
    console.log('set seaport');
    console.log(seaportSDK);
  }, [isWeb3Loaded, provider]);
  console.log('return ', seaport);
  return seaport;
}

function LoadingApp() {
  return <div>Loading</div>;
}

function App() {
  console.log('render');
  const [isWeb3Loaded, provider] = useWeb3();

  console.log('useSEaport', provider);
  const seaport = useSeaport(isWeb3Loaded, provider.currentProvider);
  if (!isWeb3Loaded) return <LoadingApp />;
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/pengu">
            <Pengu seaport={seaport}/>
          </Route>
          <Route path="/">
            <AlertsSetup />
            <MeebitTransfers />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
