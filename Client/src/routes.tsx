import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layouts/Layout';
import AdminDashboard, { loader as employeeLoader } from './views/AdminDashboard';
import CreateEmployee from './views/CreateEmployee';
import Login from './views/Login';
import { ProtectedRoute } from './Auth/ProtectedRoute';
import UpdateEmployee from './views/UpdateEmployee';


export const router = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: <Login />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'admin/dashboard',
        element: <ProtectedRoute allowedRoles={['Admin']} />, 
        children: [
          {
            path: '',
            element: <AdminDashboard />,
            loader: employeeLoader
          },
          {
            path: 'crear-employee',
            element: <ProtectedRoute allowedRoles={['Admin']} />,
            children: [
              {
                path: '',
                element: <CreateEmployee />, 
              },
            ],
          },
          {
            path: 'editar-employee/:id',
            element: <ProtectedRoute allowedRoles={['Admin']} />,
            children: [
              {
                path: '',
                element: <UpdateEmployee />, 
              },
            ],
          },
        ],
      },
    ],
  },
]);