import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-white border-b shadow-sm fixed top-0 w-full z-40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 text-indigo-600 font-bold text-lg">
          <MessageSquare className="w-5 h-5" />
          ChatterBox
        </Link>

        {/* Nav Items */}
        <div className="flex items-center gap-3 text-sm">
          
          {authUser && (
            <>
              <button onClick={logout} className="btn btn-sm text-red-600 border-red-300">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
