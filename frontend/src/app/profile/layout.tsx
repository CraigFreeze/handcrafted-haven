import SideNav from "@/app/ui/profile/Sidenav";
import "./layout.css"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="profile-container">
      <SideNav />
      <div>{children}</div>
    </div>
  );
}
