import { createContext, ReactNode, useContext, useRef, useState } from "react";
import { AuthRepository, AuthRepositoryLocalStorage } from "./repository";

interface AuthData {
  accessToken: string;
}

interface AuthContextData {
  data: AuthData;
  setData(newData: AuthData): void;
}

const authContext = createContext<AuthContextData>({
  data: {
    accessToken: "",
  },
  setData: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const initRef = useRef(true);
  let initAuthData: AuthData = { accessToken: "" };

  if (initRef.current) {
    const data = authRepository.getAuthData();
    if (data !== null) {
      initAuthData = data;
    }

    initRef.current = false;
  }

  const [auth, setAuth] = useState<AuthContextData>({
    data: {
      ...initAuthData,
    },
    setData(newData) {
      setAuth((auth) => ({ ...auth, data: newData }));
    },
  });

  return (
    <authContext.Provider value={auth}>{props.children}</authContext.Provider>
  );
}

export function useAuthSetter() {
  const auth = useContext(authContext);

  return function (authData: AuthData) {
    authRepository.saveAuthData(authData);
    auth.setData(authData);
  };
}

export function useAuth() {
  const auth = useContext(authContext);

  function logout() {
    auth.setData({
      accessToken: "",
    });
    authRepository.saveAuthData({ accessToken: "" });
  }

  return {
    data: auth.data,
    logout,
  };
}

const authRepository: AuthRepository = new AuthRepositoryLocalStorage();
