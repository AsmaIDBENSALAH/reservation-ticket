import { Link } from "react-router";
import Button from "../ui/button/Button";
import { keycloakLogin, keycloakRegister } from "../../auth/keycloak";

export default function SignInForm() {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-6">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Sign In
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Authenticate using your Keycloak account.
          </p>
        </div>

        <div className="space-y-4">
          <Button className="w-full" size="sm" onClick={() => void keycloakLogin()}>
            Sign in with Keycloak
          </Button>

          <Button className="w-full" size="sm" variant="outline" onClick={() => void keycloakRegister()}>
            Create account
          </Button>
        </div>

        <p className="mt-5 text-sm text-gray-700 dark:text-gray-400">
          Need registration page?{" "}
          <Link to="/signup" className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
            Go to Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
