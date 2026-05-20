import React, { useMemo } from "react";
import { argdown } from "@argdown/core";

interface Props {
  text: string;
}

export default function ArgdownRenderer({ text }: Props) {
  const html = useMemo(() => {
    try {
      if (!text) return "";
      
      const response = argdown.run({
        input: text,
        process: "export-html",
        html: {
          headless: true,
        }
      });
      
      return response.html || "";
    } catch (e) {
      console.error("Argdown render error:", e);
      return `<p class="text-red-500">Error rendering discourse graph</p>`;
    }
  }, [text]);

  return (
    <div 
      className="argdown-container prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
}
