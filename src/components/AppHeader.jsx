import PageHeader from "./PageHeader.jsx";

export default function AppHeader({ previewDevice, onDeviceChange }) {
  return (
    <PageHeader
      badge="React 19.2 + Ant Design + Tailwind"
      title="Task Management App"
      description="Kelola task harian dengan cepat: tambah, tandai selesai, hapus, dan filter status dalam satu dashboard responsif."
      previewDevice={previewDevice}
      onDeviceChange={onDeviceChange}
    />
  );
}
