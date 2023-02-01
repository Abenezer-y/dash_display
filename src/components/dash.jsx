import * as React from 'react';
import { useRoutes } from "react-router-dom";

import Display_Table from './display_table'
import Edit_Table from './editable_table'

export default function App() {
    let element = useRoutes([
        {
          path: "/",
          element: <Display_Table />,
        },
        { path: "edit", element: <Edit_Table /> },
      ]);
    
      return element;
    }