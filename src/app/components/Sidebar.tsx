import { Home, ClipboardCheck, FileText, LogOut } from "lucide-react";
import { Button } from "./ui/button";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  username: string;
}

export function Sidebar({ currentPage, onNavigate, onLogout, username }: SidebarProps) {
  const menuItems = [
    { id: "beranda", label: "Beranda", icon: Home },
    { id: "verifikasi", label: "Verifikasi", icon: ClipboardCheck },
    { id: "rekap", label: "Rekap", icon: FileText },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-blue-600 to-blue-700 h-screen sticky top-0 flex flex-col text-white">
      <div className="p-6 border-b border-blue-500">
        <h2 className="font-semibold text-lg">Sistem UKT</h2>
        <p className="text-sm text-blue-100">Welcome, {username}</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={currentPage === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start ${
                currentPage === item.id 
                  ? "bg-white text-blue-700 hover:bg-white/90" 
                  : "text-white hover:bg-blue-500/50"
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-blue-500">
        <Button
          variant="ghost"
          className="w-full justify-start text-white hover:text-white hover:bg-blue-500/50"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}