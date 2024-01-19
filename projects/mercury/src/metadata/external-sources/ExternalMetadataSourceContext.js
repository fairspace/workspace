import React from 'react';
import axios from "axios";
import {extractJsonData, handleHttpError} from "../../common/utils/httpUtils";
import useAsync from "../../common/hooks/UseAsync";

const ExternalMetadataSourceContext = React.createContext({});

export const ExternalMetadataSourcesProvider = ({children}) => {
    const {data: externalMetadataSources = []} = useAsync(() => axios.get('/api/metadata-sources/')
        .then(extractJsonData)
        .catch(handleHttpError('Connection error.')));

    return (
        <ExternalMetadataSourceContext.Provider
            value={{externalMetadataSources}}
        >
            {children}
        </ExternalMetadataSourceContext.Provider>
    );
};

export default ExternalMetadataSourceContext;
