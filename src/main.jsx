
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { Toaster } from "sonner";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";


createRoot(document.getElementById("root")).render(
  <>
    <Provider store={appStore}>
      
      {/* ✅ Wrap App inside Provider */}
      <Toaster richColors />
      <App />
    </Provider>
  </>
);
