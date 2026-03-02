import Button from "../ui/button/Button";

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  desc?: string;
  addButton?: AddButton;
}

interface AddButton {
  label: string;
  onClick: () => void;
  className?: string;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
  addButton,
}) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white shadow-theme-lg backdrop-blur-sm transition-all hover:shadow-theme-xl dark:border-gray-700/50 dark:bg-gray-dark/80 ${className}`}
    >
      {/* Card Header */}
      <div className="border-b border-gray-100 px-6 py-5 dark:border-white/5 sm:px-8 sm:py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* Title + desc */}
          <div>
            <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h3>
            {desc && (
              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-gray-400">
                {desc}
              </p>
            )}
          </div>

          {/* Optional Button */}
          {addButton && (
            <Button
              size="sm"
              variant="primary"
              onClick={addButton.onClick}
              className={`h-10 rounded-xl px-5 text-sm font-bold !bg-blue-600 shadow-[0_8px_20px_-4px_rgba(37,99,235,0.35)] transition-all hover:scale-105 hover:!bg-blue-700 active:scale-95 disabled:hover:scale-100 disabled:shadow-none disabled:!bg-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-dark ${addButton.className ?? ""}`}
            >
              {addButton.label}
            </Button>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-6">
        {children}
      </div>
    </div>
  );
};

export default ComponentCard;
