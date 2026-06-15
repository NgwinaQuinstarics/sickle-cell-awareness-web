/**
 * Renders a plain-text section `body` into styled paragraphs and bullet lists.
 * Rules: blank lines separate blocks; a block whose lines each start with
 * "- " becomes a <ul>; everything else becomes a <p>. Matches the look of the
 * original hardcoded legal pages.
 */
export function SectionBody({ text }) {
  const blocks = String(text || "")
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div className="mt-3 space-y-3 text-muted-foreground">
      {blocks.map((block, i) => {
        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
        const isList = lines.length > 0 && lines.every((l) => l.startsWith("- "));

        if (isList) {
          return (
            <ul key={i} className="list-disc space-y-2 pl-5">
              {lines.map((l, j) => (
                <li key={j}>{l.replace(/^-\s+/, "")}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={i} className="leading-relaxed">
            {block}
          </p>
        );
      })}
    </div>
  );
}
