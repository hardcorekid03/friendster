function Error404() {
  return (
    <>
      <div className="col-span-12 md:mb-8 lg:p-6 sm:p-4 items-center justify-center">
        <div className="flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg text-center">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
            <p className="mt-2 text-gray-600">
              Sorry, the page you are looking for does not exist.
            </p>
            <a
              href="/"
              className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Go Back Home
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Error404;
