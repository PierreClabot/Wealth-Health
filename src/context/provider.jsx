import React, { useState } from 'react';
import { MyContext } from './context';

function MyProvider({ children }) {
  const [dataContext, setDataContext] = useState("");

  return (
    <MyContext.Provider value={{ dataContext, setDataContext }}>
      {children}
    </MyContext.Provider>
  );
}

export default MyProvider;