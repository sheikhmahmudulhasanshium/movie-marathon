import Header from "./components/Header";
import Body from "./components/Body";
export default function Home() {
  return (
    <main className="w-screen  min-h-max flex flex-col justify-between ">
      <Header/>
      <Body/>
    </main>
  );
}
