export const openInfoDrawer = () => ({
    type: "OPEN_INFODRAWER"
})

export const closeInfoDrawer = () => ({
    type: "CLOSE_INFODRAWER"
})

export const openCollection = (collectionId) => ({
    type: "OPEN_COLLECTION",
    collectionId: collectionId
})

export const selectCollection = (collectionId) => ({
    type: "SELECT_COLLECTION",
    collectionId: collectionId
})

export const deselectCollection = () => ({
    type: "DESELECT_COLLECTION"
})

export const openPath = (path) => ({
    type: "OPEN_PATH",
    path: path
})

export const selectPath = (path) => ({
    type: "SELECT_PATH",
    path: path
})

export const deselectPath = (path) => ({
    type: "DESELECT_PATH",
    path: path
})

