import { useMemo, useState, useCallback, useRef } from "react";
import styles from "./Lineup.module.css";
import SankouSection from "../components/motion/SankouSection";
import { useCart } from "../components/cart/useCart";

/* Swiper */
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const SPACE_ITEMS = [
  {
    id: "halo-room",
    lane: "SPACE",
    family: "ROOM",
    name: "HALO Room",
    jp: "寝室 / 1K / 小距離",
    desc: "小さめでも、像が整って“映画になる”。",
    price: 49800,
    spec: "Full HD",
    control: "Remote + App",
    image: "/images/lineup-room.jpeg",
    imgPos: "50% 70%",
    colors: [
      { key: "Night", swatch: "rgba(243,239,230,0.72)" },
      { key: "Sand", swatch: "rgba(151,126,83,0.62)" },
      { key: "Silver", swatch: "rgba(210,214,218,0.68)" },
    ],
  },
  {
    id: "halo-living",
    lane: "SPACE",
    family: "LIVING",
    name: "HALO Living",
    jp: "リビング / 広め",
    desc: "余白のある壁に、気配ごと映す。",
    price: 69800,
    spec: "Full HD",
    control: "Remote + App",
    image: "/images/lineup-living.jpeg",
    imgPos: "50% 64%",
    colors: [
      { key: "Night", swatch: "rgba(243,239,230,0.72)" },
      { key: "Sand", swatch: "rgba(151,126,83,0.62)" },
    ],
  },
  {
    id: "halo-car",
    lane: "SPACE",
    family: "CAR",
    name: "HALO Car",
    jp: "車内 / 小空間",
    desc: "暗い空間で、締まりが一番出る。",
    price: 39800,
    spec: "HD",
    control: "Phone Link",
    image: "/images/lineup-car.jpeg",
    imgPos: "50% 62%",
    colors: [
      { key: "Night", swatch: "rgba(243,239,230,0.72)" },
      { key: "Graphite", swatch: "rgba(160,160,160,0.58)" },
    ],
  },
  {
    id: "halo-bedside",
    lane: "SPACE",
    family: "BEDSIDE",
    name: "HALO Bedside",
    jp: "ベッド横 / 深夜",
    desc: "灯りを落としたあと、静かに始まる。",
    price: 54800,
    spec: "Full HD",
    control: "App First",
    image: "/images/lineup-bedside.jpeg",
    imgPos: "50% 72%",
    colors: [
      { key: "Night", swatch: "rgba(243,239,230,0.72)" },
      { key: "Mist", swatch: "rgba(220,220,220,0.52)" },
      { key: "Silver", swatch: "rgba(210,214,218,0.68)" },
    ],
  },
];

const FEATURE_ITEMS = [
  {
    id: "halo-4k",
    lane: "FEATURE",
    family: "4K",
    name: "HALO Studio 4K",
    jp: "高解像度 / 作品鑑賞",
    desc: "解像の“気持ちよさ”を押し出す上位。",
    price: 99800,
    spec: "4K / HDR",
    control: "Remote + App",
    image: "/images/lineup-4k.jpeg",
    imgPos: "50% 62%",
    colors: [
      { key: "Night", swatch: "rgba(243,239,230,0.72)" },
      { key: "Silver", swatch: "rgba(210,214,218,0.68)" },
    ],
  },
  {
    id: "halo-smart",
    lane: "FEATURE",
    family: "SMART",
    name: "HALO Smart Link",
    jp: "スマホ連動 / 迷わせない",
    desc: "“考えさせない操作”を最優先。",
    price: 64800,
    spec: "Full HD",
    control: "App First",
    image: "/images/lineup-smart.jpeg",
    imgPos: "50% 66%",
    colors: [
      { key: "Night", swatch: "rgba(243,239,230,0.72)" },
      { key: "Mist", swatch: "rgba(220,220,220,0.52)" },
    ],
  },
  {
    id: "halo-quiet",
    lane: "FEATURE",
    family: "QUIET",
    name: "HALO Quiet",
    jp: "静音 / 深夜向け",
    desc: "沈黙に割り込まない。音を薄くする。",
    price: 74800,
    spec: "Full HD",
    control: "Remote + App",
    image: "/images/lineup-quiet.jpeg",
    imgPos: "50% 64%",
    colors: [
      { key: "Night", swatch: "rgba(243,239,230,0.72)" },
      { key: "Graphite", swatch: "rgba(160,160,160,0.58)" },
    ],
  },
  {
    id: "halo-portable",
    lane: "FEATURE",
    family: "PORTABLE",
    name: "HALO Portable",
    jp: "持ち運び / 外でも",
    desc: "夜が整う場所を、持っていける。",
    price: 59800,
    spec: "Full HD",
    control: "App + Battery",
    image: "/images/lineup-portable.jpeg",
    imgPos: "50% 68%",
    colors: [
      { key: "Night", swatch: "rgba(243,239,230,0.72)" },
      { key: "Sand", swatch: "rgba(151,126,83,0.62)" },
      { key: "Silver", swatch: "rgba(210,214,218,0.68)" },
    ],
  },
];

const yen = (n) => new Intl.NumberFormat("ja-JP").format(n);
const AUTO_OPEN_CART_ON_ADD = true;

function useStableColorMap(items) {
  return useState(() => {
    const m = {};
    items.forEach((p) => (m[p.id] = p.colors?.[0]?.key ?? "Night"));
    return m;
  });
}

function ProductSlide({ item, color, onPickColor, onAdd }) {
  return (
    <div className={styles.card} aria-label={`${item.name} product card`}>
      <div className={styles.media} style={{ "--img-pos": item.imgPos ?? "50% 66%" }}>
        <img
          src={item.image}
          alt={`${item.name} のイメージ`}
          className={styles.image}
          decoding="async"
          loading="lazy"
          draggable="false"
        />
        <div className={styles.mediaVeil} aria-hidden="true" />
        <p className={styles.familyTag} aria-hidden="true">
          {item.family}
        </p>
      </div>

      <div className={styles.body}>
        <div className={styles.headRow}>
          <div className={styles.names}>
            <p className={styles.name}>{item.name}</p>
            <p className={styles.jp}>{item.jp}</p>
          </div>

          <div className={styles.priceBlock}>
            <p className={styles.price}>¥{yen(item.price)}</p>
            <p className={styles.tax}>税込</p>
          </div>
        </div>

        <p className={styles.desc}>{item.desc}</p>

        <div className={styles.metaRow}>
          <span className={styles.metaChip}>{item.spec}</span>
          <span className={styles.metaChip}>{item.control}</span>
        </div>

        <div className={styles.actionRow}>
          <div className={styles.colors}>
            <span className={styles.colorLabel}>COLOR</span>
            <div className={styles.dots} role="list">
              {item.colors.map((c) => {
                const active = c.key === color;
                return (
                  <button
                    key={c.key}
                    type="button"
                    className={`${styles.dotBtn} ${active ? styles.dotActive : ""}`}
                    onClick={() => onPickColor(item.id, c.key)}
                    aria-label={`color ${c.key}`}
                    aria-pressed={active}
                    style={{ "--swatch": c.swatch }}
                  >
                    <span className={styles.dot} aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            className={styles.addBtn}
            onClick={() => onAdd(item)}
            aria-label={`${item.name} をカートに入れる`}
          >
            <span className={styles.addText}>カートに入れる</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Lineup() {
  const sankouOptions = useMemo(
    () => ({
      idPrefix: "lineup",
      flare: false,
      depth: true,
      start: "top 82%",
      veilFrom: 0.16,
      veilTo: 0.06,
      veilDur: 1.0,
      depthBgYPercent: -6,
      depthScrub: 1.05,
      tTitle: 0.14,
      tCopy: 0.26,
    }),
    []
  );

  const cart = useCart?.() || {};
  const openCart = cart.openCart || cart.open;
  const add = cart.addItem || cart.addToCart || cart.add || cart.push || null;

  const [spaceColor, setSpaceColor] = useStableColorMap(SPACE_ITEMS);
  const [featColor, setFeatColor] = useStableColorMap(FEATURE_ITEMS);

  const pickSpace = useCallback((id, key) => setSpaceColor((p) => ({ ...p, [id]: key })), []);
  const pickFeat = useCallback((id, key) => setFeatColor((p) => ({ ...p, [id]: key })), []);

  const handleAdd = useCallback(
    (item) => {
      const color =
        (item.lane === "SPACE" ? spaceColor[item.id] : featColor[item.id]) ||
        item.colors?.[0]?.key ||
        "Night";

      const payload = {
        id: `${item.id}:${color}`,
        sku: `${item.id}:${color}`,
        name: item.name,
        variant: color,
        family: item.family,
        price: item.price,
        qty: 1,
        image: item.image,
        meta: `${item.jp} / ${item.spec} / ${item.control}`,
      };

      if (typeof add === "function") add(payload);
      if (AUTO_OPEN_CART_ON_ADD && typeof openCart === "function") openCart();
    },
    [add, openCart, spaceColor, featColor]
  );

  // Swiper refs（rowごと）
  const spaceSwiperRef = useRef(null);
  const featSwiperRef = useRef(null);

  const [spaceNav, setSpaceNav] = useState({ prev: false, next: true });
  const [featNav, setFeatNav] = useState({ prev: false, next: true });

  const syncNav = (sw, setter) => {
    if (!sw) return;
    setter({ prev: !sw.isBeginning, next: !sw.isEnd });
  };

  // ✅ 2枚表示（PC） / 1枚（SP）で、1画面に各段2商品が成立
  const swiperBase = {
    modules: [FreeMode],
    freeMode: { enabled: true, momentum: true, momentumBounce: false },
    grabCursor: true,
    speed: 560,

    slidesPerView: 1.08,
    spaceBetween: 22,

    breakpoints: {
      640: { slidesPerView: 1.28, spaceBetween: 26 },
      960: { slidesPerView: 2, spaceBetween: 36 },
      1280: { slidesPerView: 2, spaceBetween: 42 },
      1600: { slidesPerView: 2, spaceBetween: 46 },
    },
  };

  return (
    <SankouSection
      id="lineup"
      className={styles.lineup}
      aria-label="HALO lineup section"
      options={sankouOptions}
    >
      <div className={styles.bgWord} data-sankou="bg" aria-hidden="true">
        SELECT
      </div>

      <div className={styles.veil} data-sankou="veil" aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.head}>
          <p className={styles.number} data-sankou="number">
            08
          </p>

          <div className={styles.kickerRow} data-sankou="kickerRow">
            <span className={styles.kicker}>LINEUP</span>
            <span className={styles.kickerLine} data-sankou="kickerLine" aria-hidden="true" />
          </div>
        </div>

        <div className={styles.intro}>
          <h2 className={styles.title} data-sankou="title">
            <span className={styles.titleSub}>部屋に合わせて、</span>
            <span className={styles.titleMainLine}>迎えるモデルを選ぶ。</span>
          </h2>
        </div>

        {/* ROW 1 */}
        <section className={styles.row} aria-label="Space lineup">
          <div className={styles.rowHead}>
            <div className={styles.rowTitle}>
              <span className={styles.rowTag}>SPACE LINE</span>
              <span className={styles.rowText}>空間で選ぶ</span>
            </div>
            <div className={styles.rowHint}>swipe →</div>
          </div>

          {/* ✅ 矢印：左右（青丸位置） */}
          <div className={styles.swiperShell} aria-label="Space slider shell">
            <button
              type="button"
              className={`${styles.sideArrow} ${styles.sidePrev}`}
              onClick={() => spaceSwiperRef.current?.slidePrev()}
              disabled={!spaceNav.prev}
              aria-label="前へ"
            >
              <span className={`${styles.arrowIcon} ${styles.arrowPrev}`} aria-hidden="true" />
            </button>

            <Swiper
              {...swiperBase}
              className={styles.swiper}
              onSwiper={(sw) => {
                spaceSwiperRef.current = sw;
                syncNav(sw, setSpaceNav);
              }}
              onSlideChange={(sw) => syncNav(sw, setSpaceNav)}
              onReachBeginning={(sw) => syncNav(sw, setSpaceNav)}
              onReachEnd={(sw) => syncNav(sw, setSpaceNav)}
              onFromEdge={(sw) => syncNav(sw, setSpaceNav)}
            >
              {SPACE_ITEMS.map((item) => (
                <SwiperSlide key={item.id} className={styles.slide}>
                  <ProductSlide
                    item={item}
                    color={spaceColor[item.id]}
                    onPickColor={pickSpace}
                    onAdd={handleAdd}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              type="button"
              className={`${styles.sideArrow} ${styles.sideNext}`}
              onClick={() => spaceSwiperRef.current?.slideNext()}
              disabled={!spaceNav.next}
              aria-label="次へ"
            >
              <span className={`${styles.arrowIcon} ${styles.arrowNext}`} aria-hidden="true" />
            </button>
          </div>
        </section>

        {/* ROW 2 */}
        <section className={styles.row} aria-label="Feature lineup">
          <div className={styles.rowHead}>
            <div className={styles.rowTitle}>
              <span className={styles.rowTag}>FEATURE LINE</span>
              <span className={styles.rowText}>体験で選ぶ</span>
            </div>
            <div className={styles.rowHint}>swipe →</div>
          </div>

          {/* ✅ 矢印：左右（青丸位置） */}
          <div className={styles.swiperShell} aria-label="Feature slider shell">
            <button
              type="button"
              className={`${styles.sideArrow} ${styles.sidePrev}`}
              onClick={() => featSwiperRef.current?.slidePrev()}
              disabled={!featNav.prev}
              aria-label="前へ"
            >
              <span className={`${styles.arrowIcon} ${styles.arrowPrev}`} aria-hidden="true" />
            </button>

            <Swiper
              {...swiperBase}
              className={styles.swiper}
              onSwiper={(sw) => {
                featSwiperRef.current = sw;
                syncNav(sw, setFeatNav);
              }}
              onSlideChange={(sw) => syncNav(sw, setFeatNav)}
              onReachBeginning={(sw) => syncNav(sw, setFeatNav)}
              onReachEnd={(sw) => syncNav(sw, setFeatNav)}
              onFromEdge={(sw) => syncNav(sw, setFeatNav)}
            >
              {FEATURE_ITEMS.map((item) => (
                <SwiperSlide key={item.id} className={styles.slide}>
                  <ProductSlide
                    item={item}
                    color={featColor[item.id]}
                    onPickColor={pickFeat}
                    onAdd={handleAdd}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              type="button"
              className={`${styles.sideArrow} ${styles.sideNext}`}
              onClick={() => featSwiperRef.current?.slideNext()}
              disabled={!featNav.next}
              aria-label="次へ"
            >
              <span className={`${styles.arrowIcon} ${styles.arrowNext}`} aria-hidden="true" />
            </button>
          </div>
        </section>
      </div>
    </SankouSection>
  );
}