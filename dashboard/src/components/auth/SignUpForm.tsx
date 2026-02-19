import { Link } from "react-router";
import Button from "../ui/button/Button";
import { keycloakRegister } from "../../auth/keycloak";

export default function SignUpForm() {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-6">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Sign Up
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Registration is managed by Keycloak.
          </p>
        </div>

        <Button className="w-full" size="sm" onClick={() => void keycloakRegister()}>
          Register with Keycloak
        </Button>

        <p className="mt-5 text-sm text-gray-700 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/signin" className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
