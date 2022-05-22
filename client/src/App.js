import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

// components
import Layout from "./components/layout/Layout";

// theme
import theme from "./theme";

// routes
import { adminRoutes } from "./routes";

const user = { id: "12wjq91", role: 'ADMIN' };

function App() {
  return (
    <ThemeProvider theme={theme}>
      {!user.role && <h1>Login</h1>}
      {user.role && (
        <Layout>
          <Routes>
            {user.role === "ADMIN" &&
              adminRoutes.map((item) => (
                <Route path={item.path} element={item.element} />
              ))}
          </Routes>
        </Layout>
      )}
    </ThemeProvider>
  );
}

export default App;
