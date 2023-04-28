import React, { useEffect, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';
import {CSVLink} from 'react-csv';

function Customerlist() {

  const [customers, setCustomers] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('http://traineeapp.azurewebsites.net/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content))

  };

  const saveCustomer = (customer) => {
    fetch('http://traineeapp.azurewebsites.net/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
      .then(res => fetchData())
      .catch(err => console.log(err))
  };

  const deleteCustomer = (link, data) => {
    if (window.confirm("Do you want to permanently delete " + data.firstname.toUpperCase() + " " + data.lastname.toUpperCase() + " from customers?")) {
      fetch(link, { method: 'DELETE' })
        .then(res => fetchData())
        .catch(err => console.log(err))
    }
  };

  const updateCustomer = (customer, link) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
      .then(res => fetchData())
      .catch(err => console.log(err))
  };

  const columns = [
    { field: "firstname", filter: 'agTextColumnFilter', },
    { field: "lastname", filter: 'agTextColumnFilter' },
    { field: "city", filter: 'agTextColumnFilter' },
    { field: "streetaddress", filter: 'agTextColumnFilter' },
    { field: "postcode", filter: 'agTextColumnFilter' },
    { field: "email", filter: 'agTextColumnFilter' },
    { field: "phone", filter: 'agTextColumnFilter' },
    {
      headerName: "",
      field: "links",
      cellRenderer: function (field) {
        const urlList = field.value[2].href.split("/");
        return <Button href={"/trainings/" + urlList[5]}>Trainings</Button>
      },
    },
    {
      headerName: "",
      cellRenderer: function (rowData) {
        return <Editcustomer updateCustomer={updateCustomer} customer={rowData.data} />
      },
      width: 120,
    },
    {
      headerName: "",
      field: "links",
      cellRenderer: function(field){  
          return <Button variant="outlined" color="secondary" onClick={() => deleteCustomer(field.value[0].href,field.data)} >delete</Button>
      },
      width: 150,
    }
  ];

  const headers = [
    { label: "First Name", key: "firstname" },
    { label: "Last Name", key: "lastname" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "City", key: "city" },
    { label: "Streetaddress", key: "streetaddress" },
    { label: "Postcode", key: "postcode" }
    ];

  return (
    <div className="ag-theme-material"
      style={{ height: '900px', width: '100%', margin: 'center' }} >
      <Addcustomer saveCustomer={saveCustomer} />
      <CSVLink headers={headers} data={customers} filename="Customers" style={{ textDecoration: 'none' }}>
        <Button variant="outlined" color="primary">
          Download Customers
        </Button>
      </CSVLink>
      <AgGridReact rowData={customers} columnDefs={columns}></AgGridReact>
    </div>
  );
}
export default Customerlist;