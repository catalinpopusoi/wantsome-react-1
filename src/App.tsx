import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Container from './layout/Container';
import Header from './layout/Header';
import { JobDetails, JobList } from './routes';
import GlobalStyle from './utils/global-style';
import { whiteTheme, darkTheme } from './utils/theme';

function App() {
  const [theme, setTheme] = useState(whiteTheme);

  const onThemeToggleCheck = () => {
    setTheme(currentTheme => currentTheme.name === 'white' ? darkTheme : whiteTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header onToggleCheck={onThemeToggleCheck} isDarkModeActive={theme.name === 'dark'} />
      <Container>
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/job/:jobId" element={<JobDetails />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
