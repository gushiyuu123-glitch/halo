import { useMemo, useRef } from "react";
import { useSankouSectionReveal } from "../../hooks/useSankouSectionReveal";

/**
 * options を「中身ベース」で安定化するための stringify
 * - options は基本「浅い設定オブジェクト」想定（数値/文字列/boolean）
 * - 同内容なら参照が変わっても optionsKey は同じ → useMemo が効く
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
  const optionsKey = useMemo(() => stableStringify(options), [options]);

  // ✅ idPrefix を自動注入（opts側でも上書き可能）
  const stableOptions = useMemo(() => {
    return {
      idPrefix: id,
      ...(options || {}),
    };
    // options そのものではなく optionsKey で依存を張るのが肝
  }, [id, optionsKey]);

  useSankouSectionReveal(ref, stableOptions);

  return (
    <Tag ref={ref} id={id} className={className} {...rest}>
      {children}
    </Tag>
  );
}