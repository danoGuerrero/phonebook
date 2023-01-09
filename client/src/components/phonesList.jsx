import { useState } from "react";
import Axios from 'axios';

export default function PhonesList({data, getData}) {
    const [itemSelected, setItemSelected] = useState(null);

    const onEditClick = (id) => {
        setItemSelected(id);
    }; 

    const onSaveClick = (id) => {
        const updatedPhone = document.getElementById(`phone_${id}`).value;
        const param = { phone: updatedPhone };
        Axios.put(`http://localhost:8080/post/${id}/update`, param).then(() => {
            getData();
        });
        setItemSelected(null);
      };
    
    const onDeleteClick = (id) => {
        Axios.delete(`http://localhost:8080/delete/${id}`).then(() => {
            getData();
        });
    };

    const mappingData = data?.map((item) => {

        const shouldEditable = itemSelected !== item._id;

        return (
            <div
                className='items'
                key={item._id}
            >
                <input id={`name_${item._id}`} type='text' placeholder={item.name} disabled={shouldEditable}></input>
                <input id={`phone_${item._id}`} type='number' placeholder={item.phone} disabled={shouldEditable}></input>
                <button
                    onClick={() => shouldEditable ? onEditClick(item._id) : onSaveClick(item._id)}
                    variant="primary"
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
        <div>{mappingData}</div>
    );
}