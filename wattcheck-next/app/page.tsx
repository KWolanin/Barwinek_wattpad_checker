"use client";
import { useState } from "react";
import Selector from "@/components/Selector";
import Statistics from "@/components/Statistics";
import ClearBtn from "@/components/ui/ClearBtn";
import LanguageSelector from "@/components/ui/LanguageSelector";
import {FanficContext} from "@/context/fanfic-context"

export default function Home() {
  const [fic, setFic] = useState(null);

  let content;

  if (!fic) {
    content = <Selector onSetFic={setFic} />;
  } else {
    content = (
      <section>
        <div className="w-full">
          <ClearBtn onClear={setFic} />
          <Statistics />
        </div>
      </section>
    );
  }

  return (
    <FanficContext.Provider value={fic}>
      <main className="bg-purple-950">
        <LanguageSelector />
        {content}
      </main>
    </FanficContext.Provider>
  );
}
