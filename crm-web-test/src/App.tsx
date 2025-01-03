import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ListPage, CreateFormPage, ViewFormPage, EditFormPage } from './pages';
import { useState } from 'react';
import { Context } from './context';

function NavigatorBar() {
  return (
    <div className='bg-slate-300'>
      <div className="container mx-auto">
        <div className='flex flex-row justify-between items-center h-[50px]'>
          <p className='text-2xl'>
            CRM Online
          </p>
        </div>
      </div>
    </div>
  );
}

function App() {

  const [page, setPage] = useState<number>(1);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ListPage />
    },
    {
      path: "/create",
      element: <CreateFormPage />
    },
    {
      path: "/view/:id",
      element: <ViewFormPage />
    },
    {
      path: "/edit/:id",
      element: <EditFormPage />
    },
  ]);
  

  return (
    <div>
      <Context.Provider value={{ page, setPage }}>
        <NavigatorBar />
        <div className="container mx-auto mt-[50px]">
          <RouterProvider router={router} />
        </div>
      </Context.Provider>
    </div>
  );
}

export default App;
