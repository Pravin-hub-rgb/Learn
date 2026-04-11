export default async function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4 text-cyan-600">Dashboard</h1>
      <p className="text-lg text-gray-400 mb-6">
        This is a protected page. Only authenticated users can see this.
      </p>
    </div>
  );
}
