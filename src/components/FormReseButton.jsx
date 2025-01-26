"use client";

import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

const FormReseButton = () => {
  const handleReset = () => {
    const form = document.querySelector(".search_form");

    if (form) form.reset();
  };

  return (
    <Link href={"/"}>
      <button
        onClick={handleReset}
        type="reset"
        className="input_btn"
      >
        <X size={18} />
      </button>
    </Link>
  );
};

export default FormReseButton;
