import * as React from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { fakeAuthProvider } from "./auth";
import Favorite from "./pages/Favorite";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function App() {
  const navigate = useNavigate();

  return (
    <AuthProvider>
      <Routes>
        <Route>
          <Route path="/" element={<Login />} />
          <Route
            path="*"
            element={
              <div>
                <p>404 page not found</p>
                <button onClick={() => navigate(-1)}>go back</button>
              </div>
            }
          />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/favorite"
            element={
              <RequireAuth>
                <Favorite />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

interface AuthContextType {
  user: any;
  signin: (user: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);

  let signin = (newUser: string, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();

  React.useEffect(() => {
    const handleCheckAuth = async () => {
      const resUserProfile1 = await localStorage.getItem("userProfile1");
      const resUserProfile2 = await localStorage.getItem("userProfile2");
      const resSssion = await localStorage.getItem("session");
      const resUserProfile1Parse = JSON.parse(resUserProfile1 as string);
      const resUserProfile2Parse = JSON.parse(resUserProfile2 as string);

      if (resSssion !== "off") {
        if (resUserProfile1Parse?.isSignIn) {
          return <Navigate to="/" state={{ from: location }} replace />;
        } else if (resUserProfile2Parse?.isSignIn) {
          return <Navigate to="/" state={{ from: location }} replace />;
        }
      }
    };

    handleCheckAuth();
  }, [location]);

  return children;
}
