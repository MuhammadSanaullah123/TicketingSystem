import React from 'react'
//components
import BookingTabs from './BookingTabs'
//mui
import Grid from '@mui/material/Grid'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
//icons
import CloseIcon from '@mui/icons-material/Close';

//modal
const style = {
    
    // width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    overflow:'auto',
    p: 4,
};
  

const MyBookings = ({ openModal, handleCloseModal }) => {
    console.log(openModal, handleCloseModal)
    return (
        <Grid container item className="bookingContainer">
            <Grid item xs={12}>
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    style={{borderRadius:'10px'}}
                >
                    <Grid container justifyContent="center">
                        <Grid item xl={8} lg={8} md={11} xs={12} className="bookingTabContainer" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, maxHeight:'60vh', overflow:'auto', p: 4, borderRadius:'15px', border: 'thin solid #fff'}}>
                        <Grid container className="ModalContainer">
                            <Grid item xs={12} flexDirection="row" className="ModalWrapper" justifyContent="space-between" display="flex">
                                <h5 className="heading">My Bookings</h5>
                                <CloseIcon style={{cursor:'pointer'}} onClick={handleCloseModal}/>
                            </Grid>                        
                            <Grid item xs={12} className="TabContainer">
                                <BookingTabs />
                            </Grid>
                        </Grid>
                        </Grid>
                    </Grid>
                </Modal>
            </Grid>
        </Grid>
    )
}

export default MyBookings