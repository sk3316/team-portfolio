// lib/sheets/csvParser.ts

/**
 * Parses an RFC-4180 compliant CSV text into an array of record objects.
 * Accurately handles:
 * - Commas inside quoted strings ("Engineering, Testing")
 * - Escaped quotes (""Hello"")
 * - Multiline strings within quotes
 * - Different line endings (\r\n and \n)
 */
export function parseCSV(csvText: string): Record<string, string>[] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = "";
  let inQuotes = false;
  let i = 0;

  const len = csvText.length;

  while (i < len) {
    const char = csvText[i];
    const nextChar = i + 1 < len ? csvText[i + 1] : "";

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        // Escaped quote: "" -> "
        currentCell += '"';
        i += 2;
        continue;
      } else if (char === '"') {
        // Closing quote
        inQuotes = false;
        i++;
        continue;
      } else {
        currentCell += char;
        i++;
        continue;
      }
    } else {
      if (char === '"') {
        // Opening quote
        inQuotes = true;
        i++;
        continue;
      } else if (char === ",") {
        // Next column
        currentRow.push(currentCell.trim());
        currentCell = "";
        i++;
        continue;
      } else if (char === "\r" && nextChar === "\n") {
        // Windows line break
        currentRow.push(currentCell.trim());
        currentCell = "";
        if (currentRow.some((c) => c.length > 0)) {
          rows.push(currentRow);
        }
        currentRow = [];
        i += 2;
        continue;
      } else if (char === "\n") {
        // Unix line break
        currentRow.push(currentCell.trim());
        currentCell = "";
        if (currentRow.some((c) => c.length > 0)) {
          rows.push(currentRow);
        }
        currentRow = [];
        i++;
        continue;
      } else {
        currentCell += char;
        i++;
        continue;
      }
    }
  }

  // Push final cell/row if remaining
  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    if (currentRow.some((c) => c.length > 0)) {
      rows.push(currentRow);
    }
  }

  if (rows.length < 2) return [];

  // Normalize header keys (lowercase, trim, remove non-alphanumeric except underscore)
  const headers = rows[0].map((h) =>
    h
      .toLowerCase()
      .trim()
      .replace(/[\s\-_]+/g, "_")
      .replace(/[^a-z0-9_]/g, "")
  );

  const results: Record<string, string>[] = [];

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const record: Record<string, string> = {};
    let hasContent = false;

    for (let c = 0; c < headers.length; c++) {
      const key = headers[c];
      const val = (row[c] || "").trim();
      if (val.length > 0) hasContent = true;
      record[key] = val;
    }

    if (hasContent) {
      results.push(record);
    }
  }

  return results;
}
