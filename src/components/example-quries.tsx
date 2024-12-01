import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryOutput } from "./query-output"; // Assuming the previous component is in the same directory
import { motion } from "framer-motion";

const exampleQueries = [
  {
    name: "E-commerce Products",
    url: "https://store.example.com/products?category=electronics&price_range=100-500&brand=samsung&sort=price_desc&page=2",
  },
  {
    name: "Blog Search",
    url: "https://blog.example.com/articles?topic=technology&author=john_doe&date_range=2024-01-01_to_2024-06-30&tags=ai,machine-learning&sort=latest",
  },
  {
    name: "Job Search",
    url: "https://careers.example.com/jobs?industry=tech&location=san-francisco&experience_level=mid-senior&salary_range=100000-150000&job_type=full-time&remote=true",
  },
  {
    name: "Travel Booking",
    url: "https://travel.example.com/flights?origin=new-york&destination=london&date=2024-09-15&passengers=2&class=business&price_max=1500",
  },
  {
    name: "Complex Analytics",
    url: "https://analytics.example.com/dashboard?time_period=quarterly&metrics[revenue]=total&metrics[users]=new&filters[country]=usa&filters[segment]=enterprise&compare=previous_period",
  },
];

export function QueryExamples() {
  const [selectedQuery, setSelectedQuery] = useState<{
    url: string;
    parsedQuery?: object;
    error?: string;
  }>({
    url: "",
  });

  const parseQuery = (url: string) => {
    try {
      const urlObj = new URL(url);
      const params = Object.fromEntries(urlObj.searchParams.entries());

      // Handle nested parameters
      const processedParams = Object.keys(params).reduce((acc, key) => {
        const nestedMatch = key.match(/^(\w+)\[(\w+)\]$/);
        if (nestedMatch) {
          const [, parentKey, childKey] = nestedMatch;
          acc[parentKey] = acc[parentKey] || {};
          acc[parentKey][childKey] = params[key];
        } else {
          acc[key] = params[key];
        }
        return acc;
      }, {} as Record<string, any>);

      return {
        parsedQuery: processedParams,
        error: null,
      };
    } catch (error) {
      return {
        parsedQuery: null,
        error: "Invalid URL",
      };
    }
  };

  const handleQuerySelect = (url: string) => {
    const result = parseQuery(url);
    setSelectedQuery({
      url,
      parsedQuery: result.parsedQuery || undefined,
      error: result.error || undefined,
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl text-center text-zinc-700 dark:text-zinc-300">
        Example Queries
      </h1>

      <div className="flex flex-col md:flex-row gap-4 w-full">
        <motion.div
          className="w-full md:w-1/2"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="backdrop-blur-sm bg-white/70 dark:bg-zinc-800/70 border-2 border-zinc-200 dark:border-zinc-700 shadow-lg">
            <CardHeader>
              {/* <CardTitle className="text-2xl text-zinc-700 dark:text-zinc-300">
              Example Queries
            </CardTitle> */}
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {exampleQueries.map((query, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left whitespace-normal break-words h-auto py-2"
                    onClick={() => handleQuerySelect(query.url)}
                  >
                    <span className="font-bold mr-2">{query.name}:</span>
                    <span className="text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap max-w-96">
                      {query.url}
                    </span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <QueryOutput
          decodedQuery={selectedQuery.parsedQuery || null}
          error={selectedQuery.error || null}
        />
      </div>
    </div>
  );
}
