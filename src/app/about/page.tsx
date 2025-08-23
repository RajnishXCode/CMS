"use client";
import aboutData from "@/assets/aboutpage.json";

export default function AboutPage() {
  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-[#181818] dark:via-[#232323] dark:to-[#181818] flex flex-col items-center justify-center p-8 sm:p-20">
      <main className="w-full max-w-3xl flex flex-col gap-10 items-center">
        {/* Header Card */}
        <div className="w-full bg-white dark:bg-[#232323] rounded-2xl shadow-lg p-8 flex flex-col items-center mb-4">
          <h1 className="text-4xl font-extrabold mb-2 text-center text-blue-700 dark:text-blue-300 tracking-tight drop-shadow">{aboutData.title}</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-4 text-center max-w-2xl">{aboutData.description}</p>
        </div>

        {/* Features Card */}
        <div className="w-full bg-white dark:bg-[#232323] rounded-2xl shadow-md p-6 mb-4">
          <h2 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-300 flex items-center gap-2">
            <span>🚀</span> Features
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {aboutData.features.map((feature, idx) => (
              <li key={idx} className="bg-blue-50 dark:bg-[#181818] rounded-lg p-4 text-base text-gray-800 dark:text-gray-200 flex items-center gap-2 shadow-sm">
                <span>✔️</span> {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Team Card */}
        <div className="w-full bg-white dark:bg-[#232323] rounded-2xl shadow-md p-6 mb-4">
          <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-300 flex items-center gap-2">
            <span>👥</span> Team
          </h2>
          <ul className="flex flex-col gap-2">
            {aboutData.team.map((member, idx) => (
              <li key={idx} className="bg-green-50 dark:bg-[#181818] rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between shadow-sm">
                <span className="font-bold text-lg text-green-800 dark:text-green-200">{member.name}</span>
                <span className="italic text-gray-600 dark:text-gray-400">{member.role}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Card */}
        <div className="w-full bg-white dark:bg-[#232323] rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
            <span>📬</span> Contact
          </h2>
          <p className="text-base text-gray-800 dark:text-gray-200">Email: <a href={`mailto:${aboutData.contact.email}`} className="text-blue-600 dark:text-blue-400 underline">{aboutData.contact.email}</a></p>
        </div>
      </main>
    </div>
  );
}