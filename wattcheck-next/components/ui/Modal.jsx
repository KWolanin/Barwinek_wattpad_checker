"use client";
import "@/i18n";
import { useTranslation } from "react-i18next";
import { KoFiButton } from "react-kofi";
import "react-kofi/dist/styles.css";

function Modal({ onClick }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="fixed inset-0 bg-gray-500 opacity-75 z-60"></div>

      <div className="fixed inset-0 z-100 flex items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        ></span>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-own-salmon sm:mx-0 sm:h-10 sm:w-10 font-mono">
              <svg
                className="h-6 w-6 text-own-violet"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900 font-mono">
                {t("how_it_works")}
              </h3>
              <div className="mt-2">
                <p className="text-sm leading-5 text-gray-500 font-mono">
                  {t("how_it_works_desc_1")}
                  <a
                    href="https://en.wikipedia.org/wiki/Web_scraping"
                    className="text-own-violet hover:text-blue-800"
                    target="_blank"
                  >
                    web scraping
                  </a>
                  {t("how_it_works_desc_2")}
                  {t("how_it_works_desc_3")}
                  {t("how_it_works_desc_4")}
                  {t("how_it_works_desc_5")}
                  <a
                    href="https://github.com/KWolanin/Barwinek_wattpad_checker"
                    className="text-own-violet hover:text-blue-800"
                    target="_blank"
                  >
                    {t("how_it_works_desc_6")}
                  </a>
                </p>
                <div className="mt-4">
                  <p className="text-lg leading-6 font-medium text-gray-900 font-mono">
                    {t("about")}
                  </p>
                  <p className="text-sm leading-5 text-gray-500 font-mono">
                    {t("about_desc")}
                  </p>
                </div>
                <section className="mt-4 flex justify-center">
                  <KoFiButton
                    color="#d65cb3"
                    id="kaishouri"
                    label="Support me on Ko-Fi"
                    radius="12px"
                  />
                </section>
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <span className="flex rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-own-orange text-base leading-6 font-medium text-white shadow-sm hover:bg-own-salmon focus:outline-none transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                onClick={onClick}
              >
                OK
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
