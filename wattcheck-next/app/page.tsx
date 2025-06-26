"use client";
export const dynamic = "force-dynamic";
import { useRef, useState } from "react";
import Selector from "@/components/Selector";
import Statistics from "@/components/Statistics";
import ClearBtn from "@/components/ui/ClearBtn";
import LanguageSelector from "@/components/ui/LanguageSelector";
import { FanficContext } from "@/context/fanfic-context";
import About from "@/components/ui/About";
import { Fic } from "./types/types";

export default function Home() {
  const [fanfic, setFanfic] = useState<Fic | null>(null);

  const clearFanfic = () => {
    setFanfic(null)
    abortAll()
  }

  const abortController = useRef(new AbortController());

  const abortAll = () => {
    abortController.current.abort();
    abortController.current = new AbortController();
  };

  const getSignal = () => abortController.current.signal;

  let content;

  if (!fanfic) {
    content = <Selector onSetFic={setFanfic} />;
  } else {
    content = (
      <section>
        <div className="w-full md:w-3/4 mx-auto">
          <ClearBtn onClear={clearFanfic} />
          <Statistics />
        </div>
      </section>
    );
  }

  return (
    <FanficContext.Provider value={{ fanfic, setFic: setFanfic, abortAll, getSignal }}>
      <main className="bg-gradient-to-bl from-[#fff6e4]  to-[#deccfb]">
        <LanguageSelector />
        <About />
        {content}
      </main>
    </FanficContext.Provider>
  );
}
