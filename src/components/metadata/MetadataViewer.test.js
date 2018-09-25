import MetadataViewer from "./MetadataViewer"
import React from 'react';
import {mount} from "enzyme";
import mockStore from "../../store/mockStore"
import {Provider} from "react-redux";

function flushPromises() {
    return new Promise(resolve => setImmediate(resolve));
}

it('displays properties properly', () => {
    const store = mockStore({})
    const wrapper = mount(<Provider store={store}><MetadataViewer properties={properties}/></Provider>);
    return flushPromises().then(() => {
        wrapper.update();
    }).then(() => {
        const result = wrapper.find("li");

        // There should be 10 list items:
        // 3 names of the fields
        // 4 values
        // 3 input boxes for new entries
        expect(result.length).toEqual(10);
        expect(wrapper.text()).toEqual("DescriptionMore infoMy first collectionNameCollection 5TypeCollection");
    });
});


const properties = [
    {key: 'description', label: 'Description', values: [{value: 'More info'}, {value: 'My first collection'}]},
    {key: 'name', label: 'Name', values: [{value: 'Collection 5'}]},
    {key: 'type', label: "Type", values: [{id: "http://fairspace.io/ontology#Collection", label: "Collection"}]}
];
