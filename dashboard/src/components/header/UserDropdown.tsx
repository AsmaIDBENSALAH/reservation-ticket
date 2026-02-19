import { useState } from "react";
import { Link } from "react-router";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { keycloakLogout } from "../../auth/keycloak";
import { useAppSelector } from "../../store/hooks";

const getDisplayName = (firstName?: string, lastName?: string, username?: string): string => {
  const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim();

  if (fullName) {
    return fullName;
  }

  return username ?? "User";
};

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const profile = useAppSelector((state) => state.auth.userProfile);

  const displayName = getDisplayName(profile?.firstName, profile?.lastName, profile?.username);
  const email = profile?.email ?? "No email";

  const toggleDropdown = () => {
    setIsOpen((current) => !current);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    closeDropdown();
    await keycloakLogout();
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
          <img src="/images/user/owner.jpg" alt="User" />
        </span>

        <span className="block mr-1 font-medium text-theme-sm">{displayName}</span>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <div>
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            {displayName}
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            {email}
          </span>
        </div>

        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
              onClick={closeDropdown}
            >
              Dashboard
            </Link>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => void handleLogout()}
          className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-left text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
        >
          Sign out
        </button>
      </Dropdown>
    </div>
  );
}
