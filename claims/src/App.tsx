import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { appRoutes } from "./routes";

const App = () => {
  const element = useRoutes(appRoutes);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {element}
    </Suspense>
  );
};

export default App;
