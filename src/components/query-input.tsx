"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

interface QueryInputProps {
  onDecode: (input: string) => void;
}

export function QueryInput({ onDecode }: QueryInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDecode(input);
  };

  return (
    <motion.div
      className="w-full md:w-1/2"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="backdrop-blur-sm bg-white/70 dark:bg-zinc-800/70 border-2 border-zinc-200 dark:border-zinc-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-zinc-700 dark:text-zinc-300">
            Input
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Textarea
              placeholder="Paste your URL or query string here"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[200px] bg-white/50 dark:bg-zinc-700/50 border-zinc-300 dark:border-zinc-600 focus:border-zinc-500 dark:focus:border-zinc-400"
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-zinc-700 hover:bg-zinc-600 dark:bg-zinc-600 dark:hover:bg-zinc-500 text-white"
            >
              Decode
            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}
