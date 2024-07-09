import AppRoutes from "./Routes";
import ScrollToTopButton from "../components/ScrollToTop";
export default function Home() {
  return (
    <>
      <main className="grid md:grid-cols-12 text-gray-900 lg:p-4 sm:p-0 md:p-4">
        <AppRoutes />
      </main>
    </>
  );
}
