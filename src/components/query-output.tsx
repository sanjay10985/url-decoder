"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface QueryOutputProps {
  decodedQuery: object | null;
  error: string | null;
}

export function QueryOutput({ decodedQuery, error }: QueryOutputProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (decodedQuery) {
      navigator.clipboard.writeText(JSON.stringify(decodedQuery, null, 2));
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <motion.div
      className="w-full md:w-1/2"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="backdrop-blur-sm bg-white/70 dark:bg-zinc-800/70 border-2 border-zinc-200 dark:border-zinc-700 shadow-lg">
        <CardHeader className="">
          <CardTitle className=" flex text-2xl text-zinc-700 dark:text-zinc-300">
            <span>Output</span>
            {decodedQuery && (
              <motion.div
                className="ml-auto"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleCopy}
                  className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
                  aria-label="Copy to clipboard"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isCopied ? (
                      <motion.div
                        key="check"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Check className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Copy className="h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            ) : decodedQuery ? (
              <motion.pre
                key="output"
                className="bg-white/50 dark:bg-zinc-700/50 p-4 rounded-md overflow-x-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <code className="text-sm text-zinc-800 dark:text-zinc-200">
                  {JSON.stringify(decodedQuery, null, 2)}
                </code>
              </motion.pre>
            ) : (
              <motion.p
                key="placeholder"
                className="text-zinc-500 dark:text-zinc-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Decoded query will appear here
              </motion.p>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
