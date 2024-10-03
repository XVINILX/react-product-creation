import { AuthProvider } from "contexts/AuthContext";
import "./App.css";
import AppRouter from "./Router";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppRouter />
      </div>
    </AuthProvider>
  );
}

export default App;
