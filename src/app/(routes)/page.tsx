import Header from "./components/Header";
import Body from "./components/Body";
export default function Home() {
  return (
    <main className="flex flex-col  justify-between  sm:w-max md:w-screen lg:w-full max-w-max w-max">
      <Header/>
      <Body/>
    </main>
  );
}
