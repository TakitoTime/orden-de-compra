import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import {useForm} from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginLeft:30,
      margin: theme.spacing(3),
      width: '25ch',
    },
  },
  alert:{
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    }
  }
}));

const ModalForm = (props) => {
  const {purshaseOrder} = props
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const {register, handleSubmit, errors, watch, setValue} = useForm({
      defaultValues:{
        purshaseOrderId:purshaseOrder.id,
        sku: null,
        name: null,
        quantity: null,
        price: null
      }
  });

  const classes = useStyles()
  
  useEffect(() => {
    register('sku', {
        required: true,
    });

    register('name', {
        required: true,
    });

    register('quantity', {
        required: true,
    });

    register('price', {
        required: true,
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    setAlert(false);

  };

  const handleClose = () => {
    setOpen(false);
    setAlert(false);
  };

  const handleSave = () => {
    setAlert(true);
  }
  
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Items
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" style={{backgroundColor:'#3f51b5', color:'#ffd'}}>{purshaseOrder.name}</DialogTitle>
        <DialogContent>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            name="sku"
            label="Sku..."
            onChange={(e) =>{
              setValue('sku', e.target.value)
            }}
            helperText={watch("sku") == "" && "Is Required"}
            variant="outlined"
          />
          <TextField
            id="outlined-error-helper-text"
            label="Name..."
            onChange={(e) =>{
              setValue('name', e.target.value)
            }}
            helperText={watch("name") == "" && "Is Required"}
            variant="outlined"
          />
          <TextField
            id="outlined-error-helper-text"
            label="Quantity..."
            type="Number"
            onChange={(e) =>{
              setValue('quantity', e.target.value)
            }}
            helperText={watch("quantity") == "" && "Is Required"}
            variant="outlined"
          />
          <TextField
            id="outlined-error-helper-text"
            label="Price..."
            onChange={(e) =>{
              setValue('price', e.target.value)
            }}
            helperText={watch("price") == "" && "Is Required"}
            variant="outlined"
          />
        </form>
        </DialogContent>
        <DialogActions style={{marginRight:50, marginBottom:20}}>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outlined" color="primary" onClick={handleSubmit(handleSave)} >
            Save
          </Button>
        </DialogActions>
        { alert &&
          <div  className={classes.alert}>
            <Alert severity="success">Item saved successfully!</Alert>
          </div>
        }
      </Dialog>

    </div>

    
  );
}
export default ModalForm