const { createContext, useContext, useState } = require("react");

const AuthContext = createContext();
function AuthProvider(props) {
  const [userInfor, setUserInfor] = useState({});
  const value = { userInfor, setUserInfor };
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}
function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be used within AuthProvider");
  return context;
}
export { AuthProvider, useAuth };
