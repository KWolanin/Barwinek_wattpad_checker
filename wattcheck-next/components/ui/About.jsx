"use client";
import { useState } from "react";
import Modal from "@/components/ui/Modal";

function About() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className="p-4">
      <button
        className="fixed bottom-4 right-4 z-50 px-2 py-1 rounded text-sm font-semibold border transition-colors duration-200
         bg-white text-amber-700 hover:bg-own-salmon
         "
        onClick={toggleModal}
      >
        ?
      </button>

      {showModal && <Modal onClick={toggleModal} />}
    </div>
  );
}

export default About;
