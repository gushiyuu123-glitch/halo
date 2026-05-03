import { useMemo, useRef } from "react";
import { useSankouSectionReveal } from "../../hooks/useSankouSectionReveal";

/**
 * options を「中身ベース」で安定化する stringify
 * - options は基本「浅い設定オブジェクト」想定（数値/文字列/boolean）
 * - 同内容なら参照が変わっても optionsKey は同じ → stableOptions が増殖しない
 */
function stableStringify(value) {
  const seen = new WeakSet();

  const normalize = (v) => {
    if (v == null) return v;

    const t = typeof v;
    if (t === "number" || t === "string" || t === "boolean") return v;

    // 関数やSymbolは安定化対象外（無視）
    if (t === "function" || t === "symbol") return undefined;

    if (Array.isArray(v)) return v.map(normalize);

    if (t === "object") {
      if (seen.has(v)) return undefined;
      seen.add(v);

      const out = {};
      for (const k of Object.keys(v).sort()) {
        const nv = normalize(v[k]);
        if (nv !== undefined) out[k] = nv;
      }
      return out;
    }

    return undefined;
  };

  try {
    return JSON.stringify(normalize(value) ?? {});
  } catch {
    return "{}";
  }
}

export default function SankouSection({
  as: Tag = "section",
  id,
  className,
  options,
  children,
  ...rest
}) {
  const ref = useRef(null);

  // ✅ options の“中身”で依存を決める（親がインラインで渡しても増殖しにくい）
  // NOTE: options が毎回 new でも、結果の文字列が同じなら stableOptions は再生成されない
  const optionsKey = useMemo(() => stableStringify(options), [options]);

  // ✅ idPrefix を自動注入（opts側でも上書き可能）
  // - id が無い場合でも opts.idPrefix があるならそれを使える
  const stableOptions = useMemo(() => {
    const basePrefix = id || options?.idPrefix || "sankou";

    return {
      idPrefix: basePrefix,
      ...(options || {}),
    };
    // options そのものではなく optionsKey で依存を張るのが肝
  }, [id, optionsKey]);

  // ✅ ここで “像が整う” 登場セットを適用
  useSankouSectionReveal(ref, stableOptions);

  return (
    <Tag ref={ref} id={id} className={className} {...rest}>
      {children}
    </Tag>
  );
}