import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simple authentication check against admins table
    const { data, error } = await supabase
      .from("admins")
      .select("*")
      .eq("username", credentials.username)
      .single();

    setLoading(false);

    if (error || !data) {
      toast.error("Username atau password salah");
      return;
    }

    // In production, use proper password hashing (bcrypt)
    // For now, simple comparison
    if (data.password_hash === credentials.password) {
      localStorage.setItem("admin_logged_in", "true");
      localStorage.setItem("admin_username", data.username);
      toast.success("Login berhasil!");
      navigate("/admin/dashboard");
    } else {
      toast.error("Username atau password salah");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-medium p-8">
          <div className="text-center mb-8">
            <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-card-foreground mb-2">
              Admin Login
            </h1>
            <p className="text-muted-foreground text-sm">
              Masuk ke dashboard admin HMPS Perbankan Syariah
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Masukkan username"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                required
                className="h-12"
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full h-12">
              {loading ? "Memproses..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
