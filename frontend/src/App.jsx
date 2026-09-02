import { useState } from "react";
import TaskManager from "./TaskManager";
// import HooksDemo from "./HooksDemo";
import Auth from "./Auth";
import { AuthProvider, useAuth } from "./AuthContext";
import ErrorBoundary from "./ErrorBoundary";  

function AppContent() {
  const { token, login, logout } = useAuth();
  const [page, setPage] = useState("taskManager");

  if (!token) {
    return <Auth onAuthSuccess={login} />;
  }

  return (
    <div>
      <TaskManager />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>          
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>         
  );
}