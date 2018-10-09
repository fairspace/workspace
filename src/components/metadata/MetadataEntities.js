import React from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import {getLabel, navigableLink} from "../../utils/metadatautils";
import {fetchAllEntitiesIfNeeded} from "../../actions/metadata";
import Typography from "@material-ui/core/Typography";

function MetadataEntities({loading, error, entities, load, vocabulary}) {
    load();

    if(loading) {
        return <Typography>Loading...</Typography>
    } else if(error) {
        return <Typography>Error: {error}</Typography>
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Label</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>URI</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {entities ? entities.map(entity => (
                    <TableRow key={entity['@id']}>
                        <TableCell>{getLabel(entity)}</TableCell>
                        <TableCell>
                            {entity['@type'].map(type => (
                                <a href={navigableLink(type)} key={type}>
                                    {getLabel(vocabulary.getById(type))}
                                </a>
                            ))}
                        </TableCell>
                        <TableCell>
                            <a href={navigableLink(entity['@id'])}>{entity['@id']}</a>
                        </TableCell>
                    </TableRow>
                )) : null}
            </TableBody>
        </Table>
    );
}

MetadataEntities.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    entities: PropTypes.array,
    load: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    loading: state.cache.allEntities ? state.cache.allEntities.pending : true,
    error: state.cache.allEntities ? state.cache.allEntities.error : false,
    entities: state.cache.allEntities ? state.cache.allEntities.data : [],
    vocabulary: state.cache.vocabulary ? state.cache.vocabulary.data : undefined
})

const mapDispatchToProps = (dispatch) => ({
    load: () => dispatch(fetchAllEntitiesIfNeeded())
})

export default connect(mapStateToProps, mapDispatchToProps)(MetadataEntities);
