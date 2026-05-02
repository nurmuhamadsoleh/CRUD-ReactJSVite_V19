const variantClassNames = {
  primary: "border-lagoon-500 bg-lagoon-500 text-white hover:bg-lagoon-600",
  default: "border-slate-200 bg-white text-ink-700 hover:border-lagoon-500 hover:text-lagoon-600",
  text: "border-transparent bg-transparent text-ink-700 hover:bg-slate-100",
};

export default function AppButton({
  block = false,
  children,
  className = "",
  danger = false,
  disabled = false,
  htmlType = "button",
  icon,
  loading = false,
  shape,
  type = "default",
  ...props
}) {
  const isCircle = shape === "circle";
  const variantClassName = danger
    ? "border-transparent bg-transparent text-red-600 hover:bg-red-50"
    : variantClassNames[type] || variantClassNames.default;

  return (
    <button
      className={`inline-flex h-[42px] items-center justify-center gap-2 rounded-lg border px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
        block ? "w-full" : ""
      } ${isCircle ? "w-[42px] rounded-full px-0" : ""} ${variantClassName} ${className}`}
      disabled={disabled || loading}
      type={htmlType}
      {...props}
    >
      {loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : icon}
      {children}
    </button>
  );
}
