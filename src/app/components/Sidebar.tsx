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
    <div className="w-64 bg-white h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b">
        <h2 className="font-semibold text-lg">Sistem UKT</h2>
        <p className="text-sm text-muted-foreground">Welcome, {username}</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={currentPage === item.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => onNavigate(item.id)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
