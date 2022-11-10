import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(0);
  const [itemSelected, setItemSelected] = useState(null);

  useEffect(() => {
    Axios.get('http://localhost:8080/getPosts').then(res => {
      setData(res.data);
    })
  },[]);

  const changeName = () => {
    let nameValue = document.getElementById('name').value;
    setName(nameValue);
  }

  const changePhone = () => {
    let phoneValue = document.getElementById('phone').value;
    setPhone(phoneValue);
  }

  const addNewNumber = () => {
    Axios.post('http://localhost:8080/create', {name, phone});
  }
  const onEditClick = (id) => {
    setItemSelected(id);
  };

  const onSaveClick = (id) => {
    const updatedPhone = document.getElementById(`phone_${id}`).value;
    const param = { phone: updatedPhone };
    Axios.put(`http://localhost:8080/post/${id}/update`, param);
    setItemSelected(null);
  };

  const onDeleteClick = (id) => {
    Axios.delete(`http://localhost:8080/delete/${id}`);
  };

  const mappingData = data.map((item) => {

    const shouldEditable = itemSelected !== item._id;

    return (
      <div
        className='items'
        key={item._id}
      >
        <input id={`name_${item._id}`} type='text' placeholder={item.name} disabled={shouldEditable}></input>
        <input id={`phone_${item._id}`}type='number' placeholder={item.phone} disabled={shouldEditable}></input>
        <button
          onClick={() => shouldEditable ? onEditClick(item._id) : onSaveClick(item._id)}
        >
          {shouldEditable ? "Edit" : "Save"}
        </button>
        <button
          onClick={() => onDeleteClick(item._id)}
        >
          Delete
        </button>
      </div>
    );
  });

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
      <div>{mappingData}</div>
    </div>
  );
}

export default App;
