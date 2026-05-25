import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const AuthContext =
createContext();

export function AuthProvider({
  children
}) {

  const [token, setToken] =
  useState(null);

  const [user, setUser] =
  useState(null);

  const [loading, setLoading] =
  useState(true);

  useEffect(() => {

    const savedToken =
    localStorage.getItem("token");

    const savedUser =
    localStorage.getItem("user");

    if(savedToken) {

      setToken(savedToken);
    }

    if(savedUser) {

      setUser(
        JSON.parse(savedUser)
      );
    }

    setLoading(false);

  }, []);

  // LOGIN
  const login = ({
    token,
    user
  }) => {

    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    setToken(token);

    setUser(user);
  };

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setToken(null);

    setUser(null);
  };

  return (

    <AuthContext.Provider
      value={{
        token,
        user,
        role: user?.role,
        login,
        logout,
        loading,
        isAuthenticated: !!token
      }}
    >

      {children}

    </AuthContext.Provider>
  );
}

export function useAuth() {

  return useContext(AuthContext);
}