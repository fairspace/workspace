import React from 'react';
import PropTypes from 'prop-types';
import userClient from '../../services/UserAPI/UserAPI';
import permissionClient from '../../services/PermissionAPI/PermissionAPI';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import {withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import {AccessRights} from "./Permissions";
import MaterialReactSelect from '../generic/MaterialReactSelect/MaterialReactSelect'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import ErrorMessage from "../error/ErrorMessage";

const styles = theme => ({
    root: {
        width: 400,
        height: 350,
        display: 'block',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        marginTop: 20,
    },
    autocomplete: {
        width: '100%'
    },
});

class ShareWithDialog extends React.Component {

    // initial state
    state = {
        accessRight: 'Read',
        selectedUser: null,
        selectedUserLabel: '',
        userList: [],
        isEditing: false,
        error: null,
    };

    resetState = () => {
        const {user} = this.props;
        const {userList} = this.state;
        let selectedUser = null;
        if (user) {
            selectedUser = userList.find(u => {
                return user.subject === u.value;
            });
        }
        this.setState({
            accessRight: user ? user.access : 'Read',
            selectedUser: selectedUser,
            selectedUserLabel: '',
            isEditing: !!user,
            error: null,
        });
    };

    componentDidMount() {
        userClient.getUsers().then(result => {
            const userList = result.map(r => {
                return {
                    label: `${r.firstName} ${r.lastName}`,
                    value: `${r.id}`,
                }
            });
            this.setState({userList: userList});
        })
    }

    handleAccessRightChange = event => {
        this.setState({accessRight: event.target.value});
    };

    handleSelectedUserChange = selectedOption => {
        this.setState({selectedUser: selectedOption});
    };

    handleClose = () => {
        this.props.onClose();
    };

    handleOnEnter = () => {
        this.resetState();
    };

    handleSubmit = () => {
        const {selectedUser, accessRight} = this.state;
        const {collectionId} = this.props;
        if (selectedUser) {
            permissionClient.alterCollectionPermission(selectedUser.value, collectionId, accessRight)
                .then(response => {
                    this.setState({selectedUserLabel: ''});
                    this.props.onClose();
                })
                .catch(error => {
                    this.setState({error: error});
                    console.error(error);
                });
        } else {
            this.setState({selectedUserLabel: 'You have to select a user'});
        }
    };

    renderUser = () => {
        const {userList, isEditing, selectedUser} = this.state;
        return isEditing ?
            (<div>
                <Typography variant="subheading" gutterBottom>{selectedUser.label}</Typography>
            </div>) :
            (<MaterialReactSelect options={userList}
                                  onChange={this.handleSelectedUserChange}
                                  placeholder={'Please select a user'}
                                  value={this.state.selectedUser}
                                  label={this.state.selectedUserLabel}/>);
    };

    render() {
        const {classes} = this.props;
        const {error} = this.state;
        return (
            <Dialog
                open={this.props.open}
                onEnter={this.handleOnEnter}
                onClose={this.handleClose}>
                <DialogTitle id="scroll-dialog-title">Share with</DialogTitle>
                <DialogContent>
                    <div className={classes.root}>
                        { error ? <ErrorMessage>message={error}</ErrorMessage> : ''}
                        {this.renderUser()}
                        <FormControl className={classes.formControl}>
                            <FormLabel component="legend">Access right</FormLabel>
                            <RadioGroup
                                aria-label="Access right"
                                name="access-right"
                                className={classes.group}
                                value={this.state.accessRight}
                                onChange={this.handleAccessRightChange}>
                                {Object.keys(AccessRights).map(access => {
                                    return <FormControlLabel key={access} value={access} control={<Radio/>}
                                                             label={AccessRights[access]}/>
                                })}
                            </RadioGroup>
                        </FormControl>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ShareWithDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(ShareWithDialog);
