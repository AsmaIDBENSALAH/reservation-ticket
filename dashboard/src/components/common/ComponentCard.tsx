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
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Title + desc */}
        <div className="space-y-1">
          <h3 className="text-lg  text-gray-800 dark:text-white/90">
            {title}
          </h3>
          {desc && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
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
            className={`h-9 px-4 text-sm ${addButton.className ?? ""}`}
          >
            {addButton.label}
          </Button>
        )}
      </div>

      {/* Card Body */}
      <div className="border-t border-gray-100 p-4 dark:border-gray-800 sm:p-6">
        {children}
      </div>
    </div>
  );
};

export default ComponentCard;
