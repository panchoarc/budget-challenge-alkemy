import "./index.css";
import "react-datepicker/dist/react-datepicker.css";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./Components/Routes/PrivateRoute";
import { Footer } from "./Components/shared/Footer";
import { Header } from "./Components/shared/Header/";
import AddOperation from "./pages/AddOperation";
import Dashboard from "./pages/Dashboard";
import EditOperation from "./pages/EditOperation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Header />
      <main className="w-full h-full">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="signup" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="operations" element={<Dashboard />} />
            <Route path="operations/edit/:id" element={<EditOperation />} />
            <Route path="operations/create" element={<AddOperation />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
