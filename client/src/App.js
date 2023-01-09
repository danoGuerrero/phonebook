import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './App.css';
import PhonesList from './components/phonesList';

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(0);

  useEffect(() => {
    Axios.get('http://localhost:8080/getPosts').then(res => {
      setData(res.data);
    })
  },[]);

  const getData = () => {
  Axios.get('http://localhost:8080/getPosts').then(res => {
    setData(res.data);
  })
  }

  const changeName = () => {
    let nameValue = document.getElementById('name').value;
    setName(nameValue);
  }

  const changePhone = () => {
    let phoneValue = document.getElementById('phone').value;
    setPhone(phoneValue);
  }

  const addNewNumber = () => {
    Axios.post('http://localhost:8080/create', {name, phone}).then(() => {
      getData();
    });
  }

  return (
    <div className="container">
      <label>Name: </label>
      <input
        id="name"
        onChange={changeName}
        type="text"
        
      />

      <label>Phone: </label>
      <input
        id="phone"
        onChange={changePhone}
        type="number"
      />

      <button
        className='top'
        onClick={addNewNumber}
      >
        Add New Number
      </button>

      <h4>Existing Phones</h4>

      <PhonesList
        data={data}
        getData={() => getData()}
      />
    </div>
  );
}

export default App;
