import AppRoutes from "../routes/Routes";
export default function Home({ filterMode, setFilterMode }) {
  return (
    <>
      <main className="grid md:grid-cols-12 text-gray-900 lg:p-4 sm:p-0 md:p-4 dark:bg-spot-dark  ">
        <AppRoutes filterMode={filterMode} setFilterMode={setFilterMode} />
      </main>
    </>
  );
}
