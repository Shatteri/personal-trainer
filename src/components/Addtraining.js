import React, {useState} from 'react';
import Button from'@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider, DateTimePicker} from '@mui/x-date-pickers';
import fiLocale from 'dayjs/locale/fi';

export default function Addtraining(props){

    const [open, setOpen] = useState(false);

    const [training, setTraining] = useState({
        activity:'',
        duration:'',
        customer:'',
        date: null
    });

    const handleOpen = () => {
        if (props.customer && props.customer.links) {
            setTraining({...training, customer: props.customer.links[0].href});
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value});
    };

    const handleDateChange = (date) => {
        setTraining({...training, date});
    };

    const addTraining = () => {
        props.saveTraining(training);
        handleClose();
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleOpen}>Add training</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Training</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={e => handleInputChange(e)}
                        label="Activity"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={e => handleInputChange(e)}
                        label="Duration"
                        fullWidth
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs} locale={fiLocale}>
                        <DateTimePicker
                            label="Date and Time"
                            inputFormat="DD:MM:YY HH:mm"
                            value={training.date}
                            onChange={handleDateChange}
                            renderInput={(props) => <TextField {...props} margin="dense" />}
                        />
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={addTraining} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
