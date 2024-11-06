import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Image src={'/login.jpg'} alt={""} className="w-max h-max"/>
    </div>
  );
}
