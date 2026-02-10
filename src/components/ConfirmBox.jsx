import { useEffect } from "react";

const ConfirmBox = ({
  open,
  title = "Confirm",
  message,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onCancel?.();
    };

    if (open) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-accent-base/30 backdrop-blur-2xl
                 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay click */}
      <div className="absolute inset-0" onClick={onCancel} />

      {/* Modal */}
      <div
        className="relative w-full max-w-md bg-bg-base
                   border-2 border-border-base rounded-lg
                   p-6 space-y-4"
      >
        <h1 className="text-lg font-bold">{title}</h1>

        <p className="text-sm text-text-base/80">{message}</p>

        <div className="flex justify-end gap-2 pt-4">
          <button className="retro-button" onClick={onCancel}>
            Cancel
          </button>

          <button
            className="retro-border p-2 bg-red-500 hover:bg-red-600 cursor-pointer text-white px-3 text-sm font-medium"
            onClick={onConfirm}
            autoFocus
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
