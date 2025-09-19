"use client";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Toaster } from "@/components/ui/sonner";

const ClientProviders = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
      <Toaster
        toastOptions={{
          className: "rounded-2xl border shadow-lg",
          style: {
            // background: "#1e1e1e",
            // color: "#fff",
            fontSize: "16px",
            borderLeft: "6px solid ",
          },
        }}
      />
    </Provider>
  );
};

export default ClientProviders;
