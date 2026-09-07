// lib/pptx/templateReplicator.ts
import JSZip from "jszip";
import { NormalizedMember, ReplicationResult } from "./types";
import { buildTokenMap } from "./normalizeMemberData";

/**
 * Escapes XML special characters so replacement text doesn't corrupt OpenXML.
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Replaces tokens in a paragraph even when PowerPoint fragments {{token}}
 * across multiple adjacent <a:r><a:t> elements.
 */
function replaceTokensInParagraphXml(
  paragraphXml: string,
  tokenMap: Record<string, string>,
  tokensFoundSet: Set<string>
): { xml: string; replacements: number } {
  let modifiedXml = paragraphXml;
  let replacements = 0;

  // 1. Direct pass for un-fragmented tokens e.g. <a:t>{{name}}</a:t>
  for (const [key, value] of Object.entries(tokenMap)) {
    const escapedVal = escapeXml(value);
    const pattern = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, "gi");
    if (pattern.test(modifiedXml)) {
      tokensFoundSet.add(key);
      const matches = modifiedXml.match(pattern);
      if (matches) replacements += matches.length;
      modifiedXml = modifiedXml.replace(pattern, escapedVal);
    }
  }

  // 2. Fragmented run reconciliation: If "{" still exists, consolidate <a:t> in this paragraph
  if (modifiedXml.includes("{")) {
    const textRunRegex = /<a:t(?:\s+[^>]*)?>([\s\S]*?)<\/a:t>/gi;
    const textMatches: { fullMatch: string; text: string; index: number }[] = [];
    let match;

    while ((match = textRunRegex.exec(modifiedXml)) !== null) {
      textMatches.push({
        fullMatch: match[0],
        text: match[1],
        index: match.index,
      });
    }

    if (textMatches.length > 1) {
      const consolidatedText = textMatches.map((m) => m.text).join("");
      let updatedConsolidated = consolidatedText;
      let hasTokenReplacement = false;

      for (const [key, value] of Object.entries(tokenMap)) {
        const pattern = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, "gi");
        if (pattern.test(updatedConsolidated)) {
          tokensFoundSet.add(key);
          const count = (updatedConsolidated.match(pattern) || []).length;
          replacements += count;
          updatedConsolidated = updatedConsolidated.replace(pattern, escapeXml(value));
          hasTokenReplacement = true;
        }
      }

      if (hasTokenReplacement) {
        // Place the consolidated string into the first text run and empty the rest
        const first = textMatches[0];
        const newFirstRun = first.fullMatch.replace(first.text, updatedConsolidated);

        let rebuiltXml = modifiedXml.substring(0, first.index) + newFirstRun;
        let lastEnd = first.index + first.fullMatch.length;

        for (let i = 1; i < textMatches.length; i++) {
          const item = textMatches[i];
          rebuiltXml += modifiedXml.substring(lastEnd, item.index);
          const emptiedRun = item.fullMatch.replace(item.text, "");
          rebuiltXml += emptiedRun;
          lastEnd = item.index + item.fullMatch.length;
        }
        rebuiltXml += modifiedXml.substring(lastEnd);
        modifiedXml = rebuiltXml;
      }
    }
  }

  return { xml: modifiedXml, replacements };
}

/**
 * Replicates an uploaded .pptx template by injecting candidate data into slide XMLs.
 */
export async function replicatePptxTemplate(
  templateFile: File | ArrayBuffer,
  member: NormalizedMember
): Promise<ReplicationResult> {
  try {
    const zip = new JSZip();
    const loadedZip = await zip.loadAsync(templateFile);
    const tokenMap = buildTokenMap(member);
    const tokensFoundSet = new Set<string>();
    let totalReplacements = 0;

    // Scan all slide XML files inside ppt/slides/
    const slideFilePaths = Object.keys(loadedZip.files).filter((path) =>
      /^ppt\/slides\/slide\d+\.xml$/i.test(path)
    );

    if (slideFilePaths.length === 0) {
      return {
        success: false,
        replacementsCount: 0,
        tokensFound: [],
        error: "No PowerPoint slide XML files found in the uploaded .pptx archive.",
      };
    }

    for (const slidePath of slideFilePaths) {
      const slideContent = await loadedZip.file(slidePath)?.async("string");
      if (!slideContent) continue;

      // Process paragraph by paragraph <a:p>...</a:p>
      const paragraphRegex = /<a:p(?:\s+[^>]*)?>[\s\S]*?<\/a:p>/gi;
      let newSlideContent = slideContent.replace(paragraphRegex, (pXml) => {
        const { xml, replacements } = replaceTokensInParagraphXml(
          pXml,
          tokenMap,
          tokensFoundSet
        );
        totalReplacements += replacements;
        return xml;
      });

      // Also process notes or general text outside paragraphs if any
      for (const [key, value] of Object.entries(tokenMap)) {
        const pattern = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, "gi");
        if (pattern.test(newSlideContent)) {
          tokensFoundSet.add(key);
          const matches = newSlideContent.match(pattern);
          if (matches) totalReplacements += matches.length;
          newSlideContent = newSlideContent.replace(pattern, escapeXml(value));
        }
      }

      loadedZip.file(slidePath, newSlideContent);
    }

    // Generate modified .pptx Blob
    const outputBlob = await loadedZip.generateAsync({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    });

    // Trigger browser download
    const safeFilename = `${member.name.replace(/[^a-zA-Z0-9_-]/g, "_")}_Profile.pptx`;
    downloadBlob(outputBlob, safeFilename);

    return {
      success: true,
      replacementsCount: totalReplacements,
      tokensFound: Array.from(tokensFoundSet),
    };
  } catch (err: any) {
    console.error("Failed to replicate PPTX template:", err);
    return {
      success: false,
      replacementsCount: 0,
      tokensFound: [],
      error: err?.message || "Failed to parse and duplicate PPTX template.",
    };
  }
}

/**
 * Browser download helper for generated Blobs.
 */
function downloadBlob(blob: Blob, filename: string) {
  if (typeof window === "undefined") return;
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
