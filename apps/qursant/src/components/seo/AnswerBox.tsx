'use client';
import React from 'react';

type AnswerBoxProps = {
  title: string;
  text: string;
  className?: string;
};

export default function AnswerBox({ title, text, className }: AnswerBoxProps) {
  return (
    <section
      aria-label="Podsumowanie odpowiedzi"
      className={`relative my-8 mx-auto max-w-3xl rounded-2xl border border-blue-500/20 bg-white/5 p-6 text-blue-100 backdrop-blur-sm ${
        className ?? ''
      }`}
    >
      <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-300">
        {title}
      </div>
      <p className="leading-relaxed text-blue-100">{text}</p>
    </section>
  );
}
