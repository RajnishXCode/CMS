"use client"
import Image from "next/image";
import homepageData from "../../assets/homepage.json";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src={homepageData.image}
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          {homepageData.description}
            <li className="mb-2 tracking-[-.01em]">
              <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
                {homepageData.features[0]}
              </code>
            </li>
            <li className="mb-2 tracking-[-.01em]">
              <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
                {homepageData.features[1]}
              </code>
            </li>
            <li className="mb-2 tracking-[-.01em]">
              <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
                {homepageData.features[2]}
              </code>
            </li>
          </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <div
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            onClick={()=>router.push(homepageData.buttons[0].link)}
          >
            {homepageData.buttons[0].text}
          </div>
          <div
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            onClick={()=>router.push(homepageData.buttons[1].link)}
          >
            {homepageData.buttons[1].text}
          </div>
        </div>
      </main>

    </div>
  );
}
