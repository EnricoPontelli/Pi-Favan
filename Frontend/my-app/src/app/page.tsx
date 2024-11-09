import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen w-screen ">
      <img
      src={'/login.jpg'} alt={""} className="w-screen h-screen"/>
      <div className="absolute top-0 w-full h-full flex items-center justify-center">
        <div className=" bg-green-50 rounded-md bg-opacity-50 w-72 h-96 justify-center justify-items-center shadow-lg shadow-green-700/70">
          <div className="">
            <h1 className="text-white">Spectrasync</h1>
            <div>

            </div>
            <div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
