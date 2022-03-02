import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function EmailConfirmation({ API_URL }) {
  const [response, setResponse] = useState({ status: null, message: "" });
  const router = useRouter();

  const { token } = router.query;

  useEffect(() => {
    if (token) {
      (async function () {
        try {
          const url = `${API_URL}/emailConfirmation/${token}`;

          const { status, data } = await axios.get(url);

          setResponse({ status, message: data.message });
        } catch (err) {
          const objRes = {
            status: err.response.status,
            message: err.response.data.message,
          };

          setResponse(objRes);

          console.error(err);
        }
      })();
    }
  }, [token]);

  const getMessage = (statusCode) => {
    if (!statusCode) {
      return (
        <p className="text-gray-500 text-1xl m-16 md:text-2xl">Carregando...</p>
      );
    } else if (statusCode !== 201) {
      return (
        <p className="text-red-500 text-1xl m-16 md:text-2xl">
          {response.message}
        </p>
      );
    }

    return (
      <p className="text-green-600 text-1xl m-16 md:text-2xl">
        Confirmação do email feita com sucesso. Muito obrigado por se cadastrar!
      </p>
    );
  };

  return (
    <main className="h-screen w-full bg-gray-200 text-center flex flex-col">
      <header className="bg-gray-300 px-4">
        <h1 className="text-2xl font-bold text-blue-700 py-6 md:text-4xl md:py-10">
          Newsletter Email Confirmation
        </h1>
      </header>

      <section className="h-full flex justify-center align-center">
        {getMessage(response.status)}
      </section>
    </main>
  );
}

export async function getServerSideProps() {
  const API_URL = process.env.API_URL_NEWSLETTER;

  return { props: { API_URL } };
}
