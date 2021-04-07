import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = createMuiTheme({
    spacing: 4,
    palette: {
        primary: {
            light:'#67cbc2',
            main: '#41BFB3',
            dark: '#006057',
            contrastText: '#fff',
        },
        secondary: {
            light:'#f4889b',
            main: '#F26B83',
            dark: '#a94a5b',
            contrastText: '#fff',
        },
    },
    typography: {
        htmlFontSize: 16,
        color: '#594642',
        h1: {
            fontSize: 76,
            fontWeight: 'bold',
            color: '#594642',
        },
        h2: {
            fontSize: 48,
            fontWeight: 'bold',
            color: '#594642',
        },
        h3: {
            fontSize: 24,
            color: '#594642',
            fontWeight: 'bold',
        },
        h4: {
            fontSize: 15,
            fontWeight: 'bold',
            color: '#594642',
        },
        h5: {
            fontSize: 14,
            fontWeight: 'normal',
            color: '#594642',
        },
        h6: {
            fontSize: 12,
            fontWeight: 'normal',
            color: '#594642',
        },
        button: {
            textTransform: 'uppercase',
            fontSize: 16,
            fontWeight: 600,

        },
        ul: {
            listSyle: 'none',
        },
        fontFamily: [
            // '-apple-system',
            // 'BlinkMacSystemFont',
            '"Montserrat"',
            '"Helvetica Neue"',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
})

export default responsiveFontSizes(theme);