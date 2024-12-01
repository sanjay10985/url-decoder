"use client";

import { useState } from "react";
import { QueryInput } from "@/components/query-input";
import { QueryOutput } from "@/components/query-output";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";
import { QueryExamples } from "@/components/example-quries";

export default function Home() {
  const [decodedQuery, setDecodedQuery] = useState<object | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDecode = async (input: string) => {
    try {
      const response = await fetch("/api/decode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });
      const data = await response.json();
      if (response.ok) {
        setDecodedQuery(data);
        setError(null);
      } else {
        setError(data.error);
        setDecodedQuery(null);
      }
    } catch (err) {
      setError("An error occurred while processing your request");
      setDecodedQuery(null);
    }
  };

  return (
    <main className="container mx-auto p-4 min-h-screen space-y-12 flex flex-col items-center">
      <motion.h1
        className="text-5xl font-bold  text-center text-zinc-800 dark:text-zinc-200"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        QueryCraft
      </motion.h1>
      <a
        href="https://www.producthunt.com/posts/querycraft-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-querycraft&#0045;2"
        target="_blank"
      >
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=664696&theme=light"
          alt="QueryCraft - Simplify&#0032;URL&#0032;Queries&#0058;&#0032;Transform&#0032;API&#0032;Chaos&#0032;into&#0032;Clean&#0032;JSON | Product Hunt"
          style={{ width: "250px", height: "54px" }}
          width="250"
          height="54"
        />
      </a>
      <motion.div
        className="w-full flex-grow flex flex-col md:flex-row gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <QueryInput onDecode={handleDecode} />
        <QueryOutput decodedQuery={decodedQuery} error={error} />
      </motion.div>
      <QueryExamples />
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>
    </main>
  );
}
