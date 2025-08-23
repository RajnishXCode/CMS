"use client"
import Image from "next/image";
import homepageData from "@/assets/homepage.json";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="font-sans min-h-screen bg-white dark:bg-[#181818] flex flex-col items-center justify-center p-8 sm:p-20">
      <main className="w-full max-w-2xl flex flex-col gap-8 items-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold mt-4 mb-2">
            Build With
          </h1>
          <Image
            src={homepageData.image}
            alt="Project logo"
            width={120}
            height={120}
            priority
            draggable="false"
          />
          <h1 className="text-4xl font-bold mt-4 mb-2">{homepageData.title}</h1>
          {homepageData.tagline && (
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">{homepageData.tagline}</p>
          )}
          <p className="text-lg text-gray-700 dark:text-gray-400 mb-4">{homepageData.description}</p>
          <div className="flex gap-4 flex-wrap justify-center">
            {homepageData.buttons.map((btn, idx) => (
              <button
                key={btn.text}
                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-black text-white dark:bg-white dark:text-black gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8"
                onClick={() => router.push(btn.link)}
              >
                {btn.text}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
