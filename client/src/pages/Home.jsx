import AppRoutes from "./Routes";
export default function Home() {
  return (
    <>
      <main className="grid md:grid-cols-12 text-gray-900 lg:p-4 sm:p-0 md:p-4">
        <AppRoutes />
      </main>
    </>
  );
}
