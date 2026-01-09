import { ProfileForm } from "./components/ProfileForm";
import { StudentList } from "./components/StudentList";
import { Login } from "./components/Login";
import { Sidebar } from "./components/Sidebar";
import { Beranda } from "./components/Beranda";
import { Rekap } from "./components/Rekap";
import { Toaster } from "./components/ui/sonner";
import { useState } from "react";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [currentPage, setCurrentPage] = useState("beranda");
  const [selectedNIM, setSelectedNIM] = useState<string | null>(null);
  const [showDetailForm, setShowDetailForm] = useState(false);

  const handleLogin = (user: string) => {
    setIsAuthenticated(true);
    setUsername(user);
    setCurrentPage("beranda");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setCurrentPage("beranda");
    setShowDetailForm(false);
    setSelectedNIM(null);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setShowDetailForm(false);
    setSelectedNIM(null);
  };

  const handleViewStudent = (nim: string) => {
    setSelectedNIM(nim);
    // Just view, don't navigate to form
    console.log("Viewing student:", nim);
  };

  const handleVerifyStudent = (nim: string) => {
    setSelectedNIM(nim);
    setShowDetailForm(true);
  };

  const handleBackToList = () => {
    setShowDetailForm(false);
    setSelectedNIM(null);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Login onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="flex size-full" style={{ background: 'rgb(6 78 59)' }}>
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        username={username}
      />
      <div className="flex-1 overflow-auto">
        {showDetailForm ? (
          <div className="p-8">
            <ProfileForm onBack={handleBackToList} selectedNIM={selectedNIM} />
          </div>
        ) : (
          <>
            {currentPage === "beranda" && <Beranda username={username} />}
            {currentPage === "verifikasi" && (
              <div className="p-8">
                <StudentList
                  onViewStudent={handleViewStudent}
                  onVerifyStudent={handleVerifyStudent}
                />
              </div>
            )}
            {currentPage === "rekap" && <Rekap />}
          </>
        )}
      </div>
      <Toaster />
    </div>
  );
}