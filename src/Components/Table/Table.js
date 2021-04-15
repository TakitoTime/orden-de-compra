import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ModalDetails from '../ModalDetails/ModalDetails';
import ModalForm from '../ModalForm/ModalForm';
import { Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const token= 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYwNTY0NDA0NzA1OH0.skfIY_7CAANkxmhoq37OI4jYRE8flx1ENq1v1VaRevJiroYNFQYz7Oy6hL1YZ1OJkevXSQFuLMHTqY0w6d5nPQ'

const useStyles = makeStyles((theme) => ({
  alert:{
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    }
  }
}));

const TableComponent = () => {
  const [purchaseOrders,setPurchaseOrders] = useState([])
  const [alert,setAlert] = useState(false)
  const [purshaseOrderName,setPurshaseOrderName] = useState("")

  const classes = useStyles()

  useEffect(() => {
    axios.get(
      `https://eshop-deve.herokuapp.com/api/v2/orders`, 
      {headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }})
    .then(res => {
      setPurchaseOrders(res.data.orders)
    })
    
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Number</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Details</TableCell>
              <TableCell align="center">Add</TableCell>
              <TableCell align="center">Pay</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchaseOrders.map((purchaseOrder) => (
              <TableRow key={purchaseOrder.id}>
                <TableCell align="center">{purchaseOrder.id}</TableCell>
                <TableCell align="center">{purchaseOrder.number}</TableCell>
                <TableCell align="center">{purchaseOrder.name}</TableCell>
                <TableCell align="center">{purchaseOrder.totals.total + purchaseOrder.currency}</TableCell>
                <TableCell align="center"><ModalDetails details={purchaseOrder.items}>Details</ModalDetails></TableCell>
                <TableCell align="center"><ModalForm purshaseOrder={purchaseOrder}>Add Items</ModalForm></TableCell>
                <TableCell align="center"><Button variant="outlined" color="primary" onClick={ () => {
                  setAlert(true) 
                  setPurshaseOrderName(purchaseOrder.name) 
                  }}>Pay</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      { alert &&
        <div  className={classes.alert}>
          <Alert severity="success">{ purshaseOrderName} Purshase Order payment successfully!</Alert>
        </div>
      }
    </>
  );
}

export default TableComponent;