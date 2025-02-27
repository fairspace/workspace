import React, {useContext} from 'react';
import * as PropTypes from 'prop-types';
import {Card, Modal, Tooltip} from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import CloseIcon from '@mui/icons-material/Close';
import LinkedDataEntityPage from './LinkedDataEntityPage';
import UserContext from '../../users/UserContext';
import styles from './LinkedDataLink.styles';
/**
 * Renders a link to the metadata editor in a modal dialog when clicked.
 */

const renderModal = (classes, open, handleClose, uri) => (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <div className={classes.modalWrapper}>
            <Card className={classes.modalContent}>
                <Tooltip title="Close - click or press 'Esc'">
                    <CloseIcon onClick={handleClose} className={classes.closeButton} />
                </Tooltip>
                <LinkedDataEntityPage title="Metadata" subject={uri} />
            </Card>
        </div>
    </Modal>
);

const LinkedDataLink = ({classes, uri, children}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {currentUser} = useContext(UserContext);
    if (currentUser && currentUser.canViewPublicMetadata) {
        return (
            <span>
                <span onClick={handleOpen} className={classes.clickableDiv}>
                    {children}
                </span>
                {renderModal(classes, open, handleClose, uri)}
            </span>
        );
    }
    return children;
};

LinkedDataLink.propTypes = {
    uri: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired
};

export default withStyles(styles)(LinkedDataLink);
