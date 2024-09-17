import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

const App = lazy(() => import("./App"));
import store from "./store/index";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <Suspense>
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
                </Suspense>
            </Provider>
        </BrowserRouter>
    </StrictMode>
);
