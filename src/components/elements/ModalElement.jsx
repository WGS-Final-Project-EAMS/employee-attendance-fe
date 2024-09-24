import { Modal, Box, Zoom, Typography, IconButton } from "@mui/material";
import { Close } from '@mui/icons-material';

const ModalElement = ({openModal, handleCloseModal, renderModalContent, modalTitle}) => {

    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
        >
            <Zoom in={openModal} >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100vh',
                    }}
                >
                    <Box sx={{ ...style }}>
                        <Box sx={{ display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', mb:2 }}>
                            <Typography variant="h6">{modalTitle}</Typography>
                            <IconButton onClick={() => handleCloseModal()}>
                                <Close />
                            </IconButton>
                        </Box>
                        <Box sx={{ maxHeight: '80vh', overflowY: 'auto', pt:1 }}>
                            {renderModalContent()}
                        </Box>
                    </Box>
                </Box>
            </Zoom>
        </Modal>
    );
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

export default ModalElement;