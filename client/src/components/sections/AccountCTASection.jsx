import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ACCOUNT_CTA_DISMISSED_KEY = "account_cta_dismissed";

const isAuthenticatedFromStorage = () => {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("access_token");
  const user = localStorage.getItem("user");

  if (token) return true;
  if (!user) return false;

  try {
    const parsedUser = JSON.parse(user);
    return Boolean(parsedUser);
  } catch {
    return Boolean(user);
  }
};

const AccountCTASection = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });
  const [isDeleted, setIsDeleted] = useState(() => {
    const isDismissed =
      localStorage.getItem(ACCOUNT_CTA_DISMISSED_KEY) === "true";
    const isAuthenticated = isAuthenticatedFromStorage();
    return isDismissed || isAuthenticated;
  });

  React.useEffect(() => {
    const syncVisibility = () => {
      const isDismissed =
        localStorage.getItem(ACCOUNT_CTA_DISMISSED_KEY) === "true";
      const isAuthenticated = isAuthenticatedFromStorage();
      const nextIsDeleted = isDismissed || isAuthenticated;

      setIsDeleted((prev) => (prev === nextIsDeleted ? prev : nextIsDeleted));
    };

    window.addEventListener("storage", syncVisibility);
    window.addEventListener("focus", syncVisibility);

    return () => {
      window.removeEventListener("storage", syncVisibility);
      window.removeEventListener("focus", syncVisibility);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Account creation:", formData);
  };

  const handleDelete = () => {
    localStorage.setItem(ACCOUNT_CTA_DISMISSED_KEY, "true");
    setIsDeleted(true);
  };

  if (isDeleted) {
    return null;
  }

  return (
    <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-slate-900 py-20 relative overflow-hidden">
      {/* Decorative background image */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1657922716930-dc294282063e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW9tZXRyaWMlMjBwYXR0ZXJuJTIwZGFya3xlbnwxfHx8fDE3Njg3MDA0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Delete Icon - Top Right */}
      <button
        onClick={handleDelete}
        className="absolute top-4 right-4 z-20 text-white p-2"
        aria-label="Delete section"
      >
        x
      </button>

      <div className="max-w-[1024px] mx-auto px-4 relative z-10">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {t("account.title")}
          </h2>
          <p className="text-gray-300 text-sm mb-6">
            {t("account.subtitle")}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Single column layout for all fields */}
            <div className="space-y-2.5">
              <input
                type="text"
                placeholder={t("account.firstName")}
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
              <input
                type="text"
                placeholder={t("account.lastName")}
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
              <input
                type="email"
                placeholder={t("account.email")}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
              <input
                type="password"
                placeholder={t("account.password")}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>

            <div className="flex items-start gap-2 text-left">
              <input
                type="checkbox"
                id="terms"
                checked={formData.agreeToTerms}
                onChange={(e) =>
                  setFormData({ ...formData, agreeToTerms: e.target.checked })
                }
                className="mt-0.5 w-4 h-4 rounded border-gray-400 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="terms" className="text-xs text-gray-300">
                {t("account.agreePrefix")}{" "}
                <a
                  href="#"
                  className="text-white underline hover:text-emerald-400"
                >
                  {t("account.privacy")}
                </a>{" "}
                {t("account.and")}{" "}
                <a
                  href="#"
                  className="text-white underline hover:text-emerald-400"
                >
                  {t("account.terms")}
                </a>
                .
              </label>
            </div>

            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 px-8 rounded-lg transition-colors text-sm uppercase"
            >
              {t("account.create")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AccountCTASection;
