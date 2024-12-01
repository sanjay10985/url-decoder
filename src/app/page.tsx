"use client";

import { useState } from "react";
import { QueryInput } from "@/components/query-input";
import { QueryOutput } from "@/components/query-output";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";

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
    <main className="container mx-auto p-4 min-h-screen flex flex-col ">
      <motion.h1
        className="text-5xl font-bold mb-12 text-center text-zinc-800 dark:text-zinc-200"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        QueryCraft
      </motion.h1>
      <motion.div
        className="flex-grow flex flex-col md:flex-row gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <QueryInput onDecode={handleDecode} />
        <QueryOutput decodedQuery={decodedQuery} error={error} />
      </motion.div>
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>
    </main>
  );
}
