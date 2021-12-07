import { createContext, ReactNode, useContext, useState } from "react";

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
  const [auth, setAuth] = useState<AuthContextData>({
    data: {
      accessToken: "",
    },
    setData(newData) {
      console.log("SET");
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
    auth.setData(authData);
  };
}

export function useAuthGetter() {
  const auth = useContext(authContext);

  return auth.data;
}
