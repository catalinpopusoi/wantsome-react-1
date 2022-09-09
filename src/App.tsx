import { createContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Container from './layout/Container';
import Header from './layout/Header';
import { JobDetails, JobList, Login, MyJobs } from './routes';
import GlobalStyle from './utils/global-style';
import { checkAuth } from './utils/http';
import { whiteTheme, darkTheme } from './utils/theme';

interface PrivateRouteProps {
  children: React.ReactElement;
}

// const PrivateRoute = (props: PrivateRouteProps) => localStorage.getItem('token') ? props.children : <Navigate to="/login" />;
const PrivateRoute = (props: PrivateRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    checkAuth(localStorage.getItem('token'))
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return isAuth ? props.children : <Navigate to="/login" />;
};

interface UserContextInfo {
  username: string;
  setUsername: any;
}

export const UserContext = createContext<UserContextInfo>({
  username: '',
  setUsername: () => {}
});

function App() {
  const [theme, setTheme] = useState(whiteTheme);
  const [username, setUsername] = useState('');
  const userContextValue = { username, setUsername };

  const onThemeToggleCheck = () => {
    setTheme(currentTheme => currentTheme.name === 'white' ? darkTheme : whiteTheme);
  };

  return (
    <UserContext.Provider value={userContextValue}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header onToggleCheck={onThemeToggleCheck} isDarkModeActive={theme.name === 'dark'} />
        <Container>
          <Routes>
            <Route path="/" element={<JobList />} />
            <Route path="/job/:jobId" element={<JobDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/my-jobs" element={
              <PrivateRoute>
                <MyJobs />
              </PrivateRoute>
            } />
            <Route path="**" element={<JobList />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
