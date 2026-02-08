import { Header } from "./Header";

export const PageLoading = () => {
  return (
    <>
      <Header />
      <main className="m-auto flex min-h-screen max-w-1200 items-center justify-center">
        <div className="border-blue3 h-32 w-32 animate-spin rounded-full border-4 border-t-transparent" />
      </main>
    </>
  );
};
