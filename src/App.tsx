import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "./App.css";
import "./global.css";

const App = () => <RouterProvider router={router} />;

export default App;
