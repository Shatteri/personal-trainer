import React, {useEffect, useState} from 'react';
import { AgGridReact} from'ag-grid-react';
import'ag-grid-community/styles/ag-grid.css';
import'ag-grid-community/styles/ag-theme-material.css';
import dayjs from 'dayjs';
import Addtraining from './Addtraining';
import Button from'@mui/material/Button';

function Traininglist(){

    const [trainings, setTrainings] = useState([]);
    const [customer, setCustomer] = useState("");

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        const url = window.location.href;
        const urlList = url.split("/");
        fetch(`http://traineeapp.azurewebsites.net/api/customers/${urlList[4]}`)
        .then(response => response.json())
        .then(data => setCustomer(data))

        fetch('http://traineeapp.azurewebsites.net/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
    };

    const saveTraining = (training) =>{
        fetch('http://traineeapp.azurewebsites.net/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(res => fetchData())
        .catch(err => console.log(err))
    };

    const deleteTraining = (link) => {
        if (window.confirm("Are you sure?")){
            fetch(link, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.log(err))
        }
    }

    const columns = [
        {field: "activity"},
        {field: "duration"},
        {
            headerName: "Date",
            field: "date",
            cellRenderer: function(field){
                let date = dayjs(field.value).format('DD.MM.YYYY HH.mm');
                if (field.value != null){
                    return date
                } 
            },

        },     
        {
            headerName: "",
            field: "links",
            cellRenderer: function(field){
                if (field.value != null){
                    return <Button variant="outlined" color="secondary" onClick={() => deleteTraining(field.value[0].href)} >Delete</Button>
                }     
            },
        }
    ];

    return (
    <div>
        {customer && <h2>{customer.firstname + " " + customer.lastname}</h2>}
        <div className="ag-theme-material" style={{height: '900px', width: '100%'}} >
        <Addtraining saveTraining={saveTraining} customer={customer} />
            <AgGridReact rowData={trainings} columnDefs={columns}></AgGridReact>
        </div>
    </div>
    );
}
export default Traininglist;