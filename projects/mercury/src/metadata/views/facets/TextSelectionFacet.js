import React, {useEffect, useState} from 'react';
import {Checkbox, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup} from "@material-ui/core";
import {Clear, Search} from "@material-ui/icons";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import type {MetadataViewFacetProperties} from "../MetadataViewFacetFactory";
import Iri from "../../../common/components/Iri";


type SelectProperties = {
    options: Option[];
    onChange: (string[]) => void;
    textFilterValue: string;
    activeFilterValues: any[];
}

const filterByText = (options, textFilterValue) => options
    .filter(o => textFilterValue.trim() === "" || o.label.toLowerCase().includes(textFilterValue.toLowerCase()));

const SelectSingle = (props: SelectProperties) => {
    const {options, onChange, textFilterValue, activeFilterValues} = props;
    const [value, setValue] = useState(null);

    useEffect(() => {
        if (activeFilterValues.length > 0) {
            setValue(activeFilterValues[0]);
        }
    }, [activeFilterValues]);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        onChange([newValue]);
    };

    return (
        <RadioGroup value={value} onChange={handleChange}>
            {filterByText(options, textFilterValue).map(option => (
                <FormControlLabel value={option.value} control={<Radio fontSize="small" />} label={option.label} />
            ))}
        </RadioGroup>
    );
};

const SelectMultiple = (props: SelectProperties) => {
    const {options, onChange, textFilterValue, activeFilterValues} = props;
    const defaultOptions = Object.fromEntries(options.map(option => [option.value, activeFilterValues.includes(option.value)]));
    const [state, setState] = useState(defaultOptions);

    useEffect(() => {
        setState(defaultOptions);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options, activeFilterValues]);

    const handleChange = (event) => {
        const newState = {...state, [event.target.name]: event.target.checked};
        setState(newState);
        const selected = Object.entries(newState)
            .filter(([option, checked]) => checked)
            .map(([option, checked]) => option);
        onChange(selected);
    };

    const renderCheckboxList = () => filterByText(options, textFilterValue)
        .map(option => (
            <FormControlLabel
                key={option.value}
                control={(
                    <Checkbox
                        checked={state[option.value]}
                        onChange={handleChange}
                        name={option.value}
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                    />
                )}
                label={(
                    <Tooltip title={<Iri iri={option.value} />}>
                        <Typography variant="body2">
                            {option.label}
                        </Typography>
                    </Tooltip>
                )}
            />
        ));

    return (
        <FormGroup>
            {renderCheckboxList()}
        </FormGroup>
    );
};

const TextSelectionFacet = (props: MetadataViewFacetProperties) => {
    const {options = [], multiple = false, onChange = () => {}, activeFilterValues, classes} = props;
    const [textFilterValue, setTextFilterValue] = useState("");
    const showFilter = options.length > 5; // TODO decide if it should be conditional or configurable

    if (!options || options.length === 0) {
        return (
            <Typography variant="body2">
                No filter available.
            </Typography>
        );
    }

    const renderTextFilter = () => (
        <TextField
            value={textFilterValue}
            onChange={e => setTextFilterValue(e.target.value)}
            style={{marginBottom: 8}}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Search fontSize="small" />
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        {textFilterValue && (
                            <IconButton
                                onClick={() => setTextFilterValue("")}
                                disabled={!textFilterValue}
                                style={{order: 1}}
                            >
                                <Clear color="disabled" fontSize="small" />
                            </IconButton>
                        )}
                    </InputAdornment>
                ),
            }}
        />
    );

    return (
        <>
            {showFilter && renderTextFilter()}
            <div className={classes.textContent}>
                <FormControl component="fieldset">
                    {multiple ? (
                        <SelectMultiple
                            options={options}
                            onChange={onChange}
                            classes={classes}
                            textFilterValue={textFilterValue}
                            activeFilterValues={activeFilterValues}
                        />
                    ) : (
                        <SelectSingle
                            options={options}
                            onChange={onChange}
                            textFilterValue={textFilterValue}
                            activeFilterValues={activeFilterValues}
                        />
                    )}
                </FormControl>
            </div>
        </>
    );
};

export default TextSelectionFacet;
