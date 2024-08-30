import { Modal, Box, Button, Zoom } from "@mui/material";

const ModalElement = ({openModal, handleCloseModal, renderModalContent}) => {

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
                        {renderModalContent()}
                        {/* Add form submission buttons here */}
                        <Button onClick={handleCloseModal} sx={{ mt: 2 }}>
                            Close
                        </Button>
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
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

export default ModalElement;