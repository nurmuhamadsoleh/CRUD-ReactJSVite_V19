import SettingsView from "../Component/SettingsView.jsx";

export default function SettingsContainer({
  isSidebarOpen,
  onDeviceChange,
  onSidebarOpenChange,
  previewDevice,
}) {
  return (
    <SettingsView
      isSidebarOpen={isSidebarOpen}
      onDeviceChange={onDeviceChange}
      onSidebarOpenChange={onSidebarOpenChange}
      previewDevice={previewDevice}
    />
  );
}
