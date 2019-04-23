import * as actionTypes from "./actionTypes";
import {getLinkedDataFormUpdates} from "../reducers/linkedDataFormReducers";
import Vocabulary from '../services/Vocabulary';

export const addLinkedDataValue = (formKey, property, value) => ({
    type: actionTypes.ADD_LINKEDDATA_VALUE,
    formKey,
    property,
    value
});

export const updateLinkedDataValue = (formKey, property, value, index) => ({
    type: actionTypes.UPDATE_LINKEDDATA_VALUE,
    formKey,
    property,
    value,
    index
});

export const deleteLinkedDataValue = (formKey, property, index) => ({
    type: actionTypes.DELETE_LINKEDDATA_VALUE,
    formKey,
    property,
    index
});

export const initializeLinkedDataForm = (formKey) => ({
    type: actionTypes.INITIALIZE_LINKEDDATA_FORM,
    formKey
});

export const validateLinkedDataProperty = (formKey, property) => (dispatch, getState) => {
    const formUpdates = getLinkedDataFormUpdates(getState(), formKey);
    const values = formUpdates[property.key];
    const validations = Vocabulary.validatePropertyValues({...property, values});

    return dispatch({
        type: actionTypes.VALIDATE_LINKEDDATA_PROPERTY,
        validations,
        formKey,
        property
    });
};
