import { createTheme } from "@mui/material"
import { orange, red } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        neutral: {
            main: '#fff',
            dark: '#fff',
            contrastText: '#383838',
        },
        dark: {
            main: '#383838',
            contrastText: '#fff',
        },
        black: {
            main: '#000',
            contrastText: '#fff',
        },
        primary: {
            light: '#cdeae1',
            main: '#2a9d8f',
        }
    },
    typography: {
        fontFamily: 'Quicksand',
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700,

        button: {
            textTransform: 'capitalize',
            fontWeight: 600,
        }
    },
    

});

export default theme;