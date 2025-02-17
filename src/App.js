import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { channels } from './shared/constants';

const { ipcRenderer } = window.require('electron');

function App() {
  const [product, setProduct] = useState('');
  const [data, setData] = useState(null);

  const getData = () => {
    // Send the event to get the data
    ipcRenderer.send(channels.GET_DATA, { product });
  };

  useEffect(() => {
    // Listen for the event
    ipcRenderer.on(channels.GET_DATA, (event, arg) => {
      setData(arg);
    });

    // Clean the listener after the component is dismounted
    return () => {
      ipcRenderer.removeAllListeners();
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} width={200} className="App-logo" alt="logo" />
        <input
          onChange={(e) => setProduct(e.target.value)}
          placeholder="Product name"
        />
        <button onClick={getData}>Search</button>
      </header>

      {data && (
        <>
          <h3>Product info</h3>
          <ul>
            <li>Name: {data.name}</li>
            <li>Price: {data.price}</li>
            <li>Color: {data.color}</li>
          </ul>
        </>
      )}
    </div>
  );
}

export default App;