import React, {useState} from "react";
import {Card, CardContent, CardHeader, Collapse, IconButton} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import classnames from "classnames";
import {ExpandMore} from "@material-ui/icons";
import type {ValueType} from "./MetadataViewAPI";
import TextSelectionFacet from "./facets/TextSelectionFacet";
import DateSelectionFacet from "./facets/DateSelectionFacet";
import NumericalRangeSelectionFacet from "./facets/NumericalRangeSelectionFacet";

type Option = {
    label: string;
    iri: string;
}

export type MetadataViewFacetProperties = {
    title: string;
    options: Option[];
    type: ValueType;
    multiple?: boolean;
    onChange: (string[]) => void;
    extraClasses?: string;
    classes?: any;
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: 250,
        boxShadow: "0px 1px 1px -1px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 1px 1px 0px rgba(0,0,0,0.12)"
    },
    title: {
        paddingTop: 8,
        paddingBottom: 8
    },
    content: {
        "&:last-child": {
            paddingTop: 0,
            paddingBottom: 8
        }
    },
    input: {
        fontSize: "small"
    },
    textContent: {
        maxHeight: 220,
        overflowY: "auto"
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    }
}));

const getFacet = (props: MetadataViewFacetProperties) => {
    switch (props.type) {
        case "text":
            return <TextSelectionFacet {...props} />;
        case "number":
            return <NumericalRangeSelectionFacet {...props} />;
        case "date":
            return <DateSelectionFacet {...props} />;
        default:
            return <></>;
    }
};

const Facet = (props: MetadataViewFacetProperties) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => setExpanded(!expanded);

    const cardHeaderAction = (
        <IconButton
            className={classnames(classes.expand, {
                [classes.expandOpen]: expanded,
            })}
            onClick={toggleExpand}
            aria-expanded={expanded}
            aria-label="Show more"
            title="Access"
        >
            <ExpandMore />
        </IconButton>
    );

    return (
        <Card className={`${classes.root} ${props.extraClasses}`} variant="outlined">
            <CardHeader
                className={classes.title}
                titleTypographyProps={{color: "textSecondary", variant: "body1"}}
                title={props.title}
                action={cardHeaderAction}
            />
            <Collapse in={expanded} timeout="auto">
                <CardContent className={classes.content}>
                    {getFacet({...props, classes})}
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default Facet;