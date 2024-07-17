const CENTRAL_PANEL_WIDTH = '70%';
const RIGHT_PANEL_WIDTH = '30%';

const styles = theme => ({
    leftPanel: {
        marginTop: 8,
        paddingBottom: 10,
        minWidth: 282
    },
    overallPanelContainer: {
        height: 'calc(100vh - 64px)'
    },
    overallPanel: {
        width: CENTRAL_PANEL_WIDTH,
        overflowX: 'auto'
    },
    overallPanelFullWidth: {
        width: '100%'
    },
    rightPanel: {
        width: RIGHT_PANEL_WIDTH,
        height: '100%'
    },
    centralPanel: {
        overflowX: 'auto',
        width: '100%',
        overflowY: 'hidden'
    },
    clearAllButtonContainer: {
        textAlign: 'end'
    },
    clearAllButton: {
        color: theme.palette.primary.contrastText,
        background: theme.palette.primary.main
    },
    activeFilters: {
        marginBottom: 10
    }
});

export default styles;
