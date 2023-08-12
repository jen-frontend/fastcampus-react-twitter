import { useState } from "react";

import Router from "components/Router";
import { Layout } from "components/Layout";

import { getAuth } from "firebase/auth";
import { app } from "firebaseApp";

function App() {
  const auth = getAuth(app);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

  console.log(auth, isAuthenticated);

  return (
    <Layout>
      <Router />
    </Layout>
  );
}

export default App;
