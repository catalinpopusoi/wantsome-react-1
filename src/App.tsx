import { createContext, lazy, Suspense, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Container from './layout/Container';
import Header from './layout/Header';
import { JobDetails, JobList } from './routes';
import GlobalStyle from './utils/global-style';
import { checkAuth } from './utils/http';
import { whiteTheme, darkTheme } from './utils/theme';

const MyJobs = lazy(() => import('./routes/MyJobs'));
const Login = lazy(() => import('./routes/Login'));

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
            <Route
              path="/login"
              element={
                (
                  <Suspense fallback={<p style={{ color: 'red', fontSize: 48 }}>Loading...</p>}>
                    <Login />
                  </Suspense>
                )
              } />
            <Route path="/my-jobs" element={
              <PrivateRoute>
                <Suspense>
                  <MyJobs />
                </Suspense>
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
