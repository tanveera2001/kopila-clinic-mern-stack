import { BrowserRouter as Router, Routes } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  return (
    <Router>
      <Routes>
        {PublicRoutes}
        {AdminRoutes}
      </Routes>
    </Router>
  );
}

export default App;
