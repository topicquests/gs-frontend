import React, { useMemo } from "react";
import { argdown } from "@argdown/core";

interface Props {
  text: string;
}

function sanitizeHtml(html: string): string {
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
}

function validateArgdownSyntax(text: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  const lines = text.split('\n');
  let bracketCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const openCount = (line.match(/\[/g) || []).length;
    const closeCount = (line.match(/\]/g) || []).length;
    bracketCount += openCount - closeCount;

    if (bracketCount < 0) {
      errors.push(`Line ${i + 1}: Unmatched closing bracket]`);
    }
  }

  if (bracketCount !== 0) {
    errors.push("Unmatched brackets in argdown text");
  }

  return { valid: errors.length === 0, errors };
}

export default function ArgdownRenderer({ text }: Props) {
  const html = useMemo(() => {
    try {
      if (!text) return "";

      const validation = validateArgdownSyntax(text);
      if (!validation.valid) {
        console.warn("[Argdown] Syntax validation warnings:", validation.errors);
      }

      const config = {
        input: text,
        process: "export-html",
        html: {
          headless: true,
        }
      };

      const response = argdown.run(config);

      const sanitizedHtml = sanitizeHtml(response.html || "");
      console.log("[Argdown] Render completed successfully");
      return sanitizedHtml;
    } catch (e) {
      console.error("[Argdown] Render error:", e);
      return `<p class="text-red-500">Error rendering discourse graph</p>`;
    }
  }, [text]);

  if (!text) {
    return (
      <div className="argdown-container prose prose-sm max-w-none flex items-center justify-center h-full text-slate-300">
        <p>No graph data to display</p>
      </div>
    );
  }

  return (
    <div
      className="argdown-container prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
