import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataTable from './DataTable';
import Analitics from './Analitics';

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
      <Router>
        <Routes>
          <Route path="/analitics" element={<Analitics />} />  {/* Default Route */}
          <Route path="/" element={<DataTable />} /> {/* Data Table Route */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
