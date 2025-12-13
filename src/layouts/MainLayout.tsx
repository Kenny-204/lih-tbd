import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Map as MapIcon,
  Leaf,
  History,
  Settings,
  Menu,
  Search,
  Bell,
  LogOut,
  User,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

// --- Configuration ---
const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "home" },
  //{ label: "Leaf Analysis", icon: Leaf, href: "analysis" }, // Changed MapIcon to Leaf for analysis
  { label: "Marketplace", icon: Store, href: "marketplace" },
  { label: "History", icon: History, href: "history" },
  { label: "Settings", icon: Settings, href: "settings" },
];

export default function DashboardLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { signOut } = useAuth();

  async function handleLogout() {
    signOut();
  }

  // --- Components ---

  const Logo = () => (
    <div className="flex items-center gap-2 px-6 py-4 h-16">
      <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center">
        <Leaf className="h-5 w-5 text-white" />
      </div>
      <span className="font-bold text-lg tracking-tight">AgriVision AI</span>
    </div>
  );

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <Logo />
      <Separator />
      <ScrollArea className="flex-1 px-4 py-4">
        <nav className="flex flex-col gap-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              // The isActive function receives the state from React Router
              className={({ isActive }) =>
                `flex items-center justify-start gap-3 h-12 w-full px-4 text-left transition-colors duration-200 
                ${
                  isActive
                    ? // Active Styles: Uses `secondary` look with custom border
                      "bg-emerald-50 text-emerald-900 hover:bg-emerald-100 font-medium border-l-4 border-emerald-600 rounded-l-none rounded-r-md"
                    : // Inactive Styles: Uses `ghost` look
                      "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50 rounded-md"
                }`
              }
              // The onClick is needed to close the mobile sheet after navigation
              onClick={() => setIsMobileOpen(false)}
            >
              <item.icon className={`h-5 w-5 ${"text-slate-400"}`} />
              <span className="flex-1">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </ScrollArea>

      {/* Sidebar Footer */}
      <div className="p-4 mt-auto border-t bg-slate-50/50">
        <div className="bg-emerald-100/50 p-3 rounded-lg border border-emerald-100">
          <p className="text-xs font-semibold text-emerald-800">
            System Status
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-emerald-700">AI Model Online</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* --- Desktop Sidebar (Hidden on Mobile) --- */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-white fixed inset-y-0 z-50">
        <NavContent />
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all duration-300 ease-in-out">
        {/* Top Header */}
        <header className="sticky top-0 z-40 w-full h-16 bg-white/80 backdrop-blur-md border-b px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-slate-500"
                >
                  <Menu className="h-6 w-6" />
                </Button>
                {/* </SheetTrigger> */}
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72">
                <NavContent />
              </SheetContent>
            </Sheet>

            {/* Global Search */}
            <div className="relative hidden sm:block max-w-md w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                type="search"
                placeholder="Search fields, dates, or alerts..."
                className="pl-9 w-64 lg:w-96 bg-slate-100 border-none focus-visible:ring-emerald-500"
              />
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-500 relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-rose-500 rounded-full border-2 border-white" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                >
                  <Avatar className="h-9 w-9 border-2 border-slate-100">
                    <AvatarImage src="/placeholder-user.jpg" alt="@user" />
                    <AvatarFallback className="bg-emerald-100 text-emerald-700">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      agronomist@farm.co
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Preferences</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-rose-600 focus:text-rose-600">
                  <button onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dynamic Content Outlet */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="mx-auto max-w-7xl animate-in fade-in-50 duration-500">
            <Outlet />{" "}
          </div>
        </div>
      </main>
    </div>
  );
}
