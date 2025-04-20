"use client";
import { Provider } from "react-redux";
import store from "./store";
const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Provider store={store}>{children}</Provider>;
};
export default ReduxProvider;

// Ensure Redux Logic is Used in Client Components:

// Move any Redux-related logic (e.g., Provider, useSelector, useDispatch) to a Client Component.
// Server Components should only pass data to Client Components, not manage state with Redux.
// Wrap Your App with Provider in a Client Component:

// Ensure the Provider from react-redux is used in a Client Component to provide the Redux store to your app.