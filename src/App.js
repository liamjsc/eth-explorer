import * as Web3 from 'web3';
import { useState, useEffect } from 'react';
import './App.css';
import MeebitTransfers from './components/MeebitTransfers';
import AlertsSetup from './components/AlertsSetup';
import Dots from './components/Dots';
import RecentSalesContainer from './components/RecentSalesContainer';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { OpenSeaPort, Network } from 'opensea-js';

function useSeaport() {
  const [seaport, setSeaport] = useState(null);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const seaportSDK = new OpenSeaPort(window.web3.currentProvider, {
      networkName: Network.Main,
    });
    setSeaport(seaportSDK);
    setLoaded(true);
  }, []);
  return [isLoaded, seaport];
}

function LoadingApp() {
  return <div>Loading</div>;
}

function App() {
  const [seaportLoaded, seaport] = useSeaport();
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/recents">
            <RecentSalesContainer seaport={seaport} seaportLoaded={seaportLoaded}/>
          </Route>
          <Route path="/meebits">
            <AlertsSetup />
            <MeebitTransfers />
          </Route>
          <Route path="/dot">
            <Dots />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
