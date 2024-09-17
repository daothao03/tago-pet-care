import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./store/index.js";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <App />
            <Toaster
                toastOptions={{
                    position: "top-center",
                    style: {
                        background: "#283046",
                        color: "white",
                    },
                }}
            />
        </Provider>
    </StrictMode>
);
