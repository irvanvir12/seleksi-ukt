import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface LoginProps {
  onLogin: (username: string) => void;
}

// Dummy credentials
const DUMMY_USERS = [
  { username: "admin", password: "admin" },
  { username: "staff", password: "staff" },
];

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = DUMMY_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      toast.success("Login berhasil!");
      onLogin(username);
    } else {
      toast.error("Username atau password salah!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-white">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login Sistem UKT</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <div className="text-sm text-muted-foreground text-center mt-4">
              <p>Demo credentials:</p>
              <p>Username: admin | Password: admin</p>
              <p>Username: staff | Password: staff</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}