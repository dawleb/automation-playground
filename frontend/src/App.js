import { createHashRouter, RouterProvider } from 'react-router-dom';
import Login from './Login';
import Welcome from './Welcome';
import { Navigate } from 'react-router-dom';

const router = createHashRouter(
  [
    { path: '/', element: <Navigate to="/login" replace /> },
    { path: '/login', element: <Login /> },
    { path: '/welcome', element: <Welcome /> },
    { path: '*', element: <Login /> },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

function App() {
  return (
    <RouterProvider
      future={{ v7_startTransition: true }}
      router={router}
    />
  );
}

export default App;