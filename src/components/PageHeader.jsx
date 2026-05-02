import DeviceSwitcher from "./DeviceSwitcher.jsx";

const headerLayout = {
  mobile: "flex-col",
  tablet: "flex-col",
  laptop: "flex-col lg:flex-row lg:items-center lg:justify-between",
};

const titleSize = {
  mobile: "text-2xl",
  tablet: "text-3xl",
  laptop: "text-3xl sm:text-4xl",
};

export default function PageHeader({
  badge,
  title,
  description,
  previewDevice,
  onDeviceChange,
  children,
}) {
  return (
    <header
      className={`flex gap-4 rounded-lg border border-white/80 bg-white/90 p-5 shadow-soft backdrop-blur sm:p-6 ${headerLayout[previewDevice]}`}
    >
      <div className="max-w-3xl">
        {badge ? (
          <span className="mb-3 inline-flex rounded-lg bg-lagoon-500/10 px-3 py-1 text-sm font-semibold text-lagoon-600">
            {badge}
          </span>
        ) : null}
        <h1 className={`m-0 font-bold leading-tight text-ink-900 ${titleSize[previewDevice]}`}>
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-base leading-7 text-ink-500">{description}</p>
        ) : null}
        {children}
      </div>

      <DeviceSwitcher value={previewDevice} onChange={onDeviceChange} />
    </header>
  );
}
