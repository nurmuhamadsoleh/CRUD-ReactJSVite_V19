const toneStyles = {
  neutral: "bg-slate-900 text-white",
  success: "bg-emerald-600 text-white",
  warning: "bg-coral-500 text-white",
};

export default function StatTile({ title, value, icon, tone = "neutral" }) {
  return (
    <article className="flex min-h-28 items-center justify-between rounded-lg border border-white/80 bg-white/90 p-4 shadow-soft backdrop-blur sm:p-5">
      <div>
        <p className="m-0 text-sm font-medium text-ink-500">{title}</p>
        <p className="m-0 mt-2 text-3xl font-bold text-ink-900">{value}</p>
      </div>
      <span
        className={`grid h-12 w-12 place-items-center rounded-lg text-xl ${toneStyles[tone]}`}
        aria-hidden="true"
      >
        {icon}
      </span>
    </article>
  );
}
