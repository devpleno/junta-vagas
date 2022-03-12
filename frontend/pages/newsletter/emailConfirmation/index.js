export default function Index() {
  return (
    <main className="h-screen w-full bg-gray-200 text-center flex flex-col">
      <header className="bg-gray-300 px-4">
        <h1 className="text-2xl font-bold text-blue-700 py-6 md:text-4xl md:py-10">
          Newsletter Email Confirmation
        </h1>
      </header>

      <section className="h-full flex justify-center align-center">
        <p className="text-yellow-700 text-1xl m-16 md:text-2xl">
          Necessário um token de confirmação.
        </p>
      </section>
    </main>
  );
}
