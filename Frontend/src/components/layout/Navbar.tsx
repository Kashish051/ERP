import { Search, Bell, CircleUser } from "lucide-react";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
      {/* Search Box */}
      <div className="flex items-center gap-3 border rounded-lg px-3 py-2 w-80">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="outline-none w-full"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        <Bell size={22} className="cursor-pointer text-gray-600" />

        <div className="flex items-center gap-2">
          <CircleUser size={35} className="text-blue-600" />
          <div>
            <p className="font-semibold">
              {user?.name || "Admin"}
            </p>
            <p className="text-xs text-gray-500">
              {user?.role || "ADMIN"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;