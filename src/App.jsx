import { createTheme, ThemeProvider } from '@mui/material/styles';
import DataTable from './DataTable';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <DataTable />
    </ThemeProvider>
  );
}

export default App;
