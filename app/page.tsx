import Link from "next/link";

export default function Home() {
  return (
    <>
      HOME
      <div className="border-2 border-red-500">
        <Link href="/record/">Record</Link>
      </div>
    </>
  );
}
