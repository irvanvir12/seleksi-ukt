import { ProfileForm } from "./components/ProfileForm";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <div className="size-full bg-gray-50 p-8 overflow-auto">
      <ProfileForm />
      <Toaster />
    </div>
  );
}