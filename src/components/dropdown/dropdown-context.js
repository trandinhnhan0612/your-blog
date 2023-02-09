import { createContext, useContext } from "react";

const DropdownContext = createContext();
function DropdownProvider(props) {
  return (
    <DropdownContext.Provider value={props}>
      {props.children}
    </DropdownContext.Provider>
  );
}
function useDropdown() {
  const context = useContext(DropdownContext);
  if (typeof context === "undefined")
    throw new Error("userDropdown must be used within DropdownProvide");
  return context;
}
export { useDropdown, DropdownProvider };
