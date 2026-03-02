import Button from "../ui/button/Button";
import { keycloakLogin } from "../../auth/keycloak";

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
        </div>
      </div>
    </div>
  );
}
