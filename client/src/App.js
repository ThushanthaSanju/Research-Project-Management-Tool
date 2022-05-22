import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

// providers
import GlobalProvider from "./context/global-provider";

// components
import Layout from "./components/layout/Layout";

// theme
import theme from "./theme";

// routes
import { publicRoutes, adminRoutes } from "./routes";

// styles
import "./App.css";

const user = { id: "12wjq91", role: "" };

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {!user.role &&
          publicRoutes.map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))}
      </Routes>
      <GlobalProvider>
        {user.role && (
          <Layout>
            <Routes>
              {user.role === "ADMIN" &&
                adminRoutes.map((item, index) => (
                  <Route key={index} path={item.path} element={item.element} />
                ))}
            </Routes>
          </Layout>
        )}
      </GlobalProvider>
    </ThemeProvider>
  );
}

export default App;
