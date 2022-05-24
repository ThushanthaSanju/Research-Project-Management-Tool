import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

// providers
import GlobalProvider from "./context/global-provider";

// components
import Layout from "./components/layout/Layout";

// theme
import theme from "./theme";

// routes
import { publicRoutes, adminRoutes, studentRoutes, staffRoutes } from "./routes";

// styles
import "./App.css";

function App() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {!token &&
          publicRoutes.map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))}
      </Routes>
      <GlobalProvider>
        {token && (
          <Layout>
            <Routes>
              {user &&
                user.role === "admin" &&
                adminRoutes.map((item, index) => (
                  <Route key={index} path={item.path} element={item.element} />
                ))
              }
              {user &&
                user.role === "student" &&
                studentRoutes.map((item, index) => (
                  <Route key={index} path={item.path} element={item.element} />
                ))
              }
              {user &&
                user.role === "staff" &&
                staffRoutes.map((item, index) => (
                  <Route key={index} path={item.path} element={item.element} />
                ))
              }
            </Routes>
          </Layout>
        )}
      </GlobalProvider>
    </ThemeProvider>
  );
}

export default App;
