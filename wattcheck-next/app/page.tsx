"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import Selector from "@/components/Selector";
import Statistics from "@/components/Statistics";
import ClearBtn from "@/components/ui/ClearBtn";
import LanguageSelector from "@/components/ui/LanguageSelector";
import { FanficContext } from "@/context/fanfic-context";

export default function Home() {
  const [fic, setFic] = useState(null);

  let content;

  if (!fic) {
    content = <Selector onSetFic={setFic} />;
  } else {
    content = (
      <section>
        <div className="w-full md:w-3/4 mx-auto">
          <ClearBtn onClear={setFic} />
          <Statistics />
        </div>
      </section>
    );
  }

  return (
    <FanficContext.Provider value={fic}>
      <main className="bg-gradient-to-bl from-[#fff6e4]  to-[#deccfb]">
        <LanguageSelector />
        {content}
      </main>
    </FanficContext.Provider>
  );
}
