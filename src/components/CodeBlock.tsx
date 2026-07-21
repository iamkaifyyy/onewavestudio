import { useState, useMemo } from "react";
import { Copy, Check } from "lucide-react";

// ─── Token Colors (VSCode Dark+ / Light+ inspired based on active theme) ───
const darkColors = {
  bg:         "#0d1117",
  border:     "#2d2d2d",
  tabBg:      "#121212",
  tabBorder:  "#2d2d2d",
  gutterBg:   "#0d1117",
  gutterText: "#484f58",
  codeText:   "#e2e8f0",
  keyword:    "#c586c0",  // purple-pink
  declaration:"#569cd6",  // blue
  string:     "#ce9178",  // warm salmon
  comment:    "#6a9955",  // green
  number:     "#b5cea8",  // soft green
  constant:   "#d7ba7d",  // gold
  type:       "#4ec9b0",  // teal
  property:   "#9cdcfe",  // light blue
  function:   "#dcdcaa",  // yellow
  decorator:  "#dcdcaa",  // yellow
  operator:   "#d4d4d4",  // light gray
  envKey:     "#9cdcfe",  // light blue
  envValue:   "#ce9178",  // salmon
  envComment: "#6a9955",  // green
};

const lightColors = {
  bg:         "#fcfcfc",
  border:     "#ebebeb",
  tabBg:      "#f4f4f5",
  tabBorder:  "#ebebeb",
  gutterBg:   "#fafafa",
  gutterText: "#a1a1a1",
  codeText:   "#171717",
  keyword:    "#af00db",  // purple
  declaration:"#0000ff",  // blue
  string:     "#a31515",  // dark red
  comment:    "#008000",  // green
  number:     "#098658",  // green-teal
  constant:   "#811f3f",  // dark red-purple
  type:       "#267f99",  // blue-teal
  property:   "#0451a5",  // rich blue
  function:   "#795e26",  // brown-yellow
  decorator:  "#795e26",  // brown-yellow
  operator:   "#3b3b3b",  // dark gray
  envKey:     "#0451a5",  // rich blue
  envValue:   "#a31515",  // dark red
  envComment: "#008000",  // green
};

// ─── Language Detection ─────────────────────────────────────────────────────
type Lang = "ts" | "prisma" | "env" | "yaml" | "text";

function detectLang(filename: string): Lang {
  const f = filename.toLowerCase();
  if (f.includes(".prisma")) return "prisma";
  if (f.includes(".env") || f === ".env.local") return "env";
  if (f.includes(".yml") || f.includes(".yaml")) return "yaml";
  if (f.includes(".ts") || f.includes(".tsx") || f.includes(".js") || f.includes("route")) return "ts";
  return "ts";
}

// ─── Tokenizer ──────────────────────────────────────────────────────────────

function tokenizeLine(line: string, lang: Lang, c: typeof darkColors): React.ReactNode[] {
  if (lang === "env") return tokenizeEnv(line, c);
  if (lang === "prisma") return tokenizePrisma(line, c);
  return tokenizeTS(line, c);
}

function tokenizeTS(line: string, c: typeof darkColors): React.ReactNode[] {
  const regex = /(\/\/.*$)|(\/\*.*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b(?:import|export|from|const|let|var|return|if|else|async|await|new|throw|try|catch|default|switch|case|break|null|undefined|true|false|void|typeof|instanceof|as|in|of|this|super|static|readonly|yield|delete|extends|implements)\b)|(\b(?:function|class|interface|type|enum)\b)|(\b(?:string|number|boolean|any|never|unknown|Promise|Record|Partial|Array)\b)|(\b\d+(?:_\d+)*(?:\.\d+)?\b)|(\b[A-Z][A-Z_0-9]{2,}\b)|(@\w+)/g;

  return applyRegex(line, regex, c.codeText, (match) => {
    if (match[1] || match[2]) return c.comment;
    if (match[3]) return c.string;
    if (match[4]) return c.keyword;
    if (match[5]) return c.declaration;
    if (match[6]) return c.type;
    if (match[7]) return c.number;
    if (match[8]) return c.constant;
    if (match[9]) return c.decorator;
    return null;
  });
}

function tokenizePrisma(line: string, c: typeof darkColors): React.ReactNode[] {
  const regex = /(\/\/.*$)|("(?:[^"\\]|\\.)*")|(\b(?:model|datasource|generator|enum)\b)|(\b(?:String|Int|Float|Boolean|DateTime|Json|BigInt|Bytes|Decimal)\b)|(@@?\w+(?:\([^)]*\))?)|(\b(?:true|false|null|env)\b)|(\b(?:provider|url|directUrl|client|output|previewFeatures|fields|references|onDelete|onUpdate|map|default|unique|id|relation|index|ignore|updatedAt)\b)|(\b\d+\b)/g;

  return applyRegex(line, regex, c.codeText, (match) => {
    if (match[1]) return c.comment;
    if (match[2]) return c.string;
    if (match[3]) return c.declaration;
    if (match[4]) return c.type;
    if (match[5]) return c.decorator;
    if (match[6]) return c.keyword;
    if (match[7]) return c.property;
    if (match[8]) return c.number;
    return null;
  });
}

function tokenizeEnv(line: string, c: typeof darkColors): React.ReactNode[] {
  const trimmed = line.trimStart();

  if (trimmed.startsWith("#")) {
    return [<span key={0} style={{ color: c.envComment }}>{line}</span>];
  }

  const eqIdx = line.indexOf("=");
  if (eqIdx > 0) {
    const key = line.slice(0, eqIdx);
    const eq = "=";
    const value = line.slice(eqIdx + 1);
    return [
      <span key={0} style={{ color: c.envKey }}>{key}</span>,
      <span key={1} style={{ color: c.operator }}>{eq}</span>,
      <span key={2} style={{ color: c.envValue }}>{value}</span>,
    ];
  }

  return [<span key={0} style={{ color: c.codeText }}>{line}</span>];
}

function applyRegex(
  line: string,
  regex: RegExp,
  fallbackColor: string,
  colorFn: (match: RegExpExecArray) => string | null
): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  regex.lastIndex = 0;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      result.push(<span key={key++} style={{ color: fallbackColor }}>{line.slice(lastIndex, match.index)}</span>);
    }

    const color = colorFn(match);
    result.push(
      <span key={key++} style={{ color: color || fallbackColor }}>
        {match[0]}
      </span>
    );
    lastIndex = regex.lastIndex;

    if (match[0].length === 0) {
      regex.lastIndex++;
      break;
    }
  }

  if (lastIndex < line.length) {
    result.push(<span key={key} style={{ color: fallbackColor }}>{line.slice(lastIndex)}</span>);
  }

  return result;
}

// ─── CodeBlock Component ────────────────────────────────────────────────────

interface CodeBlockProps {
  code: string;
  filename: string;
  showLineNumbers?: boolean;
}

export const CodeBlock = ({ code, filename, showLineNumbers = true }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const lang = detectLang(filename);

  // Read the active theme from the HTML class element
  const isDark = useMemo(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return true;
  }, []); // Run once on initialization; handles static theme context safely

  const c = isDark ? darkColors : lightColors;
  const lines = useMemo(() => code.split("\n"), [code]);

  const highlighted = useMemo(() => {
    return lines.map((line, i) => ({
      number: i + 1,
      tokens: tokenizeLine(line, lang, c),
    }));
  }, [lines, lang, c]);

  const gutterWidth = String(lines.length).length;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="rounded-lg overflow-hidden border transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
      style={{ borderColor: c.border }}
    >
      {/* ── Window Chrome ─────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b transition-colors duration-300"
        style={{ backgroundColor: c.tabBg, borderColor: c.border }}
      >
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-800" />
            <div className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-800" />
            <div className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-800" />
          </div>

          {/* Filename tab */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded border transition-colors duration-300 bg-white dark:bg-[#121212]"
            style={{ borderColor: c.border }}
          >
            <FileIcon lang={lang} />
            <span
              className="text-[10px] font-mono font-medium transition-colors duration-300"
              style={{ color: c.gutterText }}
            >
              {filename}
            </span>
          </div>
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono cursor-pointer transition-all duration-300 border bg-white dark:bg-[#121212] hover:bg-neutral-50 dark:hover:bg-neutral-900"
          style={{ borderColor: c.border, color: c.gutterText }}
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-500" />
              <span className="text-emerald-500 font-bold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" style={{ color: c.gutterText }} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* ── Code Body ─────────────────────────────────────────────────── */}
      <div
        className="overflow-x-auto transition-colors duration-300"
        style={{ backgroundColor: c.bg }}
      >
        <table className="w-full border-collapse">
          <tbody>
            {highlighted.map(({ number, tokens }) => (
              <tr
                key={number}
                className="hover:bg-black/[0.01] dark:hover:bg-white/[0.02] transition-colors duration-75"
              >
                {/* Line number gutter */}
                {showLineNumbers && (
                  <td
                    className="select-none text-right pr-4 pl-4 text-[11px] font-mono align-top leading-[1.7] border-r sticky left-0 transition-colors duration-300"
                    style={{
                      width: `${gutterWidth + 2}ch`,
                      minWidth: "3ch",
                      borderColor: `${c.border}20`,
                      color: c.gutterText,
                      backgroundColor: c.bg,
                    }}
                  >
                    {number}
                  </td>
                )}

                {/* Code content */}
                <td
                  className="pl-4 pr-6 text-[12.5px] font-mono leading-[1.7] whitespace-pre align-top transition-colors duration-300"
                  style={{ color: c.codeText }}
                >
                  {tokens.length > 0 ? tokens : "\u00A0"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── File Icon ──────────────────────────────────────────────────────────────

function FileIcon({ lang }: { lang: Lang }) {
  const colors: Record<Lang, string> = {
    ts: "#3178c6",
    prisma: "#2d3748",
    env: "#eab308",
    yaml: "#cb171e",
    text: "#6b7280",
  };

  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <rect x="2" y="1" width="12" height="14" rx="2" fill={colors[lang]} fillOpacity="0.15" stroke={colors[lang]} strokeOpacity="0.4" strokeWidth="1" />
      <rect x="4.5" y="5" width="7" height="1" rx="0.5" fill={colors[lang]} fillOpacity="0.5" />
      <rect x="4.5" y="8" width="5" height="1" rx="0.5" fill={colors[lang]} fillOpacity="0.35" />
      <rect x="4.5" y="11" width="6" height="1" rx="0.5" fill={colors[lang]} fillOpacity="0.25" />
    </svg>
  );
}
