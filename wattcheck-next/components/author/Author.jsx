'use client'
import "@/i18n";
import { useTranslation } from 'react-i18next'
import { useEffect, useState, useContext } from "react";
import { FanficContext } from "@/context/fanfic-context";

function Author() {
  const [user, setUser] = useState();
  const { t } = useTranslation()


  const fanfic = useContext(FanficContext);
  if (!fanfic) return null;
  const username = fanfic.author;

    useEffect(() => {
    async function getUserInfo() {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      if (res.ok) {
        const result = await res.json();
        setUser(result);
      }
    }
    getUserInfo();
  }, [username]);


  return (
    <div className="bg-amber-200 border border-amber-800 rounded shadow p-4 col-span-1 items-center">
      {user && (
        <div>
          <a
            href={`https://www.wattpad.com/user/${username}`}
            className="text-amber-600 hover:underline"
          >
            {user.username}
          </a>
          <img
            src={user.avatar}
            className="rounded mt-2 mx-auto"
            width="80"
            height="80"
            alt="user avatar"
          />
          <p className="mt-2">{t('published')} {user.publishedStories}</p>
          <p>{t('followers')} {user.followers}</p>
        </div>
      )}
      {!user && (
        <div className="animate-pulse flex flex-col items-center space-y-3">
          <div className="h-5 w-1/2 bg-yellow-200 rounded"></div>
          <div className="w-[80px] h-[80px] bg-yellow-200 rounded"></div>
          <div className="h-4 w-3/4 bg-yellow-200 rounded"></div>
          <div className="h-4 w-2/3 bg-yellow-200 rounded"></div>
        </div>
      )}
    </div>
  );
}

export default Author;
