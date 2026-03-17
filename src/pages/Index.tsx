import { useState } from "react";
import Icon from "@/components/ui/icon";

const RSVP_URL = "https://functions.poehali.dev/a142cd63-6a0a-4a44-aff4-d06fdbe145c3";

const COAT_OF_ARMS = "https://cdn.poehali.dev/projects/0aa96c6b-dbcc-48a7-8de0-43fa7dddae32/files/ebe40a92-1060-4836-a8b7-9dede641bd38.jpg";
const BG_IMAGE = "https://cdn.poehali.dev/projects/0aa96c6b-dbcc-48a7-8de0-43fa7dddae32/files/44d52ba6-e484-41f6-8fce-4c03d0fc95d0.jpg";
const UPLOAD_IMAGE = "https://cdn.poehali.dev/files/9aeea03a-688b-46bb-8d46-ab864093fb7c.png";

const SCHEDULE = [
  { time: "12:00", icon: "Crown", title: "Церемония в ЗАГСе", desc: "Торжественная регистрация союза" },
  { time: "13:00", icon: "Camera", title: "Фотосессия", desc: "Сохраним воспоминания для летописи" },
  { time: "15:00", icon: "Wine", title: "Пир в НеКлубе", desc: "Ул. Коммуны, 14 — начало торжества" },
  { time: "23:00", icon: "Moon", title: "Завершение", desc: "Конец торжества, расставание до новых встреч" },
];

const DRESSCODE = [
  { color: "#6b4c3b", name: "Коричневый", desc: "Цвет дерева и земли" },
  { color: "#c9b99a", name: "Бежевый", desc: "Цвет пергамента и песка" },
  { color: "#2d4a35", name: "Тёмно-зелёный", desc: "Цвет леса и мха" },
];

/* Пергаментная карточка */
const Scroll = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`relative rounded-sm px-8 py-7 ${className}`}
    style={{
      background: "linear-gradient(160deg, #3a1f0e 0%, #2d1709 40%, #261408 70%, #321b0c 100%)",
      boxShadow: "0 8px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(201,147,58,0.15), inset 0 -2px 0 rgba(0,0,0,0.3)",
      border: "1px solid rgba(201,147,58,0.3)",
    }}
  >
    {/* torn edge top */}
    <div className="absolute top-0 left-0 right-0 h-2 overflow-hidden" style={{ borderRadius: "4px 4px 0 0" }}>
      <svg viewBox="0 0 400 8" preserveAspectRatio="none" className="w-full h-full" style={{ opacity: 0.4 }}>
        <path d="M0,8 Q20,2 40,6 Q60,1 80,5 Q100,8 120,3 Q140,0 160,5 Q180,8 200,2 Q220,6 240,3 Q260,7 280,1 Q300,5 320,4 Q340,8 360,2 Q380,6 400,4 L400,0 L0,0 Z" fill="#6b3a1f"/>
      </svg>
    </div>
    {/* torn edge bottom */}
    <div className="absolute bottom-0 left-0 right-0 h-2 overflow-hidden" style={{ borderRadius: "0 0 4px 4px" }}>
      <svg viewBox="0 0 400 8" preserveAspectRatio="none" className="w-full h-full" style={{ opacity: 0.4 }}>
        <path d="M0,0 Q20,6 40,2 Q60,7 80,3 Q100,0 120,5 Q140,8 160,3 Q180,0 200,6 Q220,2 240,5 Q260,1 280,7 Q300,3 320,4 Q340,0 360,6 Q380,2 400,4 L400,8 L0,8 Z" fill="#6b3a1f"/>
      </svg>
    </div>
    {children}
  </div>
);

export default function Index() {
  const [form, setForm] = useState({ name: "", guests: "1", coming: "yes", dietary: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(RSVP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || "Что-то пошло не так. Попробуй ещё раз.");
      }
    } catch {
      setError("Не удалось отправить свиток. Проверь соединение.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: `url(${UPLOAD_IMAGE}) center top / cover no-repeat fixed`,
        backgroundColor: "#1a0e06",
      }}
    >
      {/* dark overlay for readability */}
      <div className="min-h-screen" style={{ background: "rgba(10,5,0,0.18)" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-16">

        {/* Мечи сверху */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          <span className="font-cinzel text-xs tracking-[0.4em] uppercase" style={{ color: "var(--tavern-gold)", opacity: 0.8, textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>⚔</span>
          <span className="font-cinzel text-xs tracking-[0.4em] uppercase" style={{ color: "var(--tavern-gold)", opacity: 0.5 }}>✦ ✦ ✦</span>
          <span className="font-cinzel text-xs tracking-[0.4em] uppercase" style={{ color: "var(--tavern-gold)", opacity: 0.8, textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>⚔</span>
        </div>

        <div className="relative z-10 w-full max-w-2xl text-center animate-float-in">

          {/* Свиток-шапка с именами */}
          <Scroll className="mb-8">
            <p className="font-cinzel text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "var(--tavern-gold)", opacity: 0.7 }}>
              Приглашение на свадьбу
            </p>
            <h1 className="font-cinzel font-black leading-tight mb-2" style={{ fontSize: "clamp(2.2rem, 7vw, 4.5rem)", color: "var(--tavern-gold-bright)", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
              Катерина &amp; Кирилл
            </h1>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,147,58,0.5), transparent)" }} />
              <span className="font-cormorant italic text-lg" style={{ color: "var(--tavern-parchment)", whiteSpace: "nowrap" }}>08 августа 2026 года</span>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,147,58,0.5), transparent)" }} />
            </div>
          </Scroll>

          {/* герб */}
          <div className="relative mx-auto w-36 h-36 mb-8 animate-float-in" style={{ animationDelay: "0.2s" }}>
            <div className="absolute inset-0 rounded-full animate-glow-pulse" />
            <img
              src={COAT_OF_ARMS}
              alt="Герб"
              className="w-full h-full object-cover rounded-full border-4"
              style={{
                borderColor: "var(--tavern-gold)",
                boxShadow: "0 0 50px rgba(201,147,58,0.5), 0 0 0 2px rgba(201,147,58,0.2), 0 8px 30px rgba(0,0,0,0.8)"
              }}
            />
          </div>

          {/* подпись */}
          <div className="animate-float-in" style={{ animationDelay: "0.4s" }}>
            <Scroll>
              <p className="font-cinzel text-base leading-relaxed mb-1" style={{ color: "var(--tavern-gold)", lineHeight: 1.7 }}>
                Дорогие друзья!
              </p>
              <p className="font-cormorant italic text-xl leading-relaxed" style={{ color: "var(--tavern-parchment)", opacity: 0.85 }}>
                Приглашаем вас разделить с нами этот важный день<br />и отметить его незабываемо вместе!
              </p>
            </Scroll>
          </div>

          <div className="mt-10 animate-float-in" style={{ animationDelay: "0.6s" }}>
            <a
              href="#confirm"
              className="btn-tavern inline-block px-12 py-4 rounded-sm text-sm"
              style={{ boxShadow: "0 4px 30px rgba(0,0,0,0.8), 0 0 40px rgba(201,147,58,0.4), inset 0 1px 0 rgba(255,255,255,0.2)" }}
            >
              Подтвердить участие
            </a>
          </div>

          <div className="mt-12 animate-float-in" style={{ animationDelay: "0.75s" }}>
            <Icon name="ChevronDown" size={24} className="mx-auto animate-bounce" style={{ color: "var(--tavern-gold)", opacity: 0.6 } as React.CSSProperties} />
          </div>
        </div>
      </section>

      {/* ── ПРОГРАММА ── */}
      <section id="program" className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <Scroll>
              <p className="font-cinzel text-xs tracking-[0.4em] uppercase mb-2" style={{ color: "var(--tavern-gold)", opacity: 0.65 }}>Глава первая</p>
              <h2 className="font-cinzel font-bold text-3xl mb-1" style={{ color: "var(--tavern-gold-bright)" }}>Программа дня</h2>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,147,58,0.5), transparent)" }} />
                <span style={{ color: "var(--tavern-gold)", fontSize: "0.9rem" }}>❧ ✦ ❧</span>
                <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,147,58,0.5), transparent)" }} />
              </div>

              <div className="mt-6 space-y-5">
                {SCHEDULE.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 text-left">
                    <div className="shrink-0 w-12 h-12 rounded-sm flex items-center justify-center"
                      style={{ background: "rgba(201,147,58,0.1)", border: "1px solid rgba(201,147,58,0.3)" }}>
                      <Icon name={item.icon} size={20} style={{ color: "var(--tavern-gold)" }} />
                    </div>
                    <div>
                      <span className="font-cinzel text-base font-bold" style={{ color: "var(--tavern-gold-bright)" }}>{item.time}</span>
                      <h3 className="font-cinzel text-sm font-medium" style={{ color: "var(--tavern-parchment)" }}>{item.title}</h3>
                      <p className="font-cormorant italic text-base" style={{ color: "var(--tavern-parchment)", opacity: 0.6 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Scroll>
          </div>
        </div>
      </section>

      {/* ── МЕСТО ── */}
      <section id="place" className="py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Scroll className="text-center">
            <p className="font-cinzel text-xs tracking-[0.4em] uppercase mb-2" style={{ color: "var(--tavern-gold)", opacity: 0.65 }}>Глава вторая</p>
            <h2 className="font-cinzel font-bold text-3xl mb-4" style={{ color: "var(--tavern-gold-bright)" }}>Место пира</h2>
            <div className="w-14 h-14 mx-auto mb-4 rounded-sm flex items-center justify-center"
              style={{ background: "rgba(201,147,58,0.1)", border: "1px solid rgba(201,147,58,0.3)" }}>
              <Icon name="MapPin" size={24} style={{ color: "var(--tavern-gold)" }} />
            </div>
            <h3 className="font-cinzel text-2xl font-bold mb-1" style={{ color: "var(--tavern-gold-bright)" }}>НеКлуб</h3>
            <p className="font-cormorant italic text-xl mb-4" style={{ color: "var(--tavern-parchment)", opacity: 0.8 }}>
              ул. Коммуны, 14
            </p>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,147,58,0.5), transparent)" }} />
              <span className="font-cormorant text-base" style={{ color: "var(--tavern-parchment)", opacity: 0.7 }}>Начало торжества в 15:00</span>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,147,58,0.5), transparent)" }} />
            </div>
            <p className="font-cormorant text-lg leading-relaxed" style={{ color: "var(--tavern-parchment)", opacity: 0.65 }}>
              Великолепный зал ждёт отважных гостей.<br />
              Врата откроются ровно в назначенный час.
            </p>
          </Scroll>
        </div>
      </section>

      {/* ── ДРЕСС-КОД ── */}
      <section id="dresscode" className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <Scroll>
            <p className="font-cinzel text-xs tracking-[0.4em] uppercase mb-2 text-center" style={{ color: "var(--tavern-gold)", opacity: 0.65 }}>Глава третья</p>
            <h2 className="font-cinzel font-bold text-3xl mb-2 text-center" style={{ color: "var(--tavern-gold-bright)" }}>Дресс-код</h2>
            <p className="font-cormorant italic text-xl text-center mb-6" style={{ color: "var(--tavern-parchment)", opacity: 0.8 }}>
              Облачитесь в цвета тёмного леса и пергаментных свитков
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {DRESSCODE.map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-14 h-14 rounded-full mx-auto mb-3 border-2"
                    style={{ backgroundColor: item.color, borderColor: "rgba(201,147,58,0.4)", boxShadow: `0 4px 15px ${item.color}66` }} />
                  <p className="font-cinzel text-xs font-bold mb-0.5" style={{ color: "var(--tavern-parchment)" }}>{item.name}</p>
                  <p className="font-cormorant italic text-sm" style={{ color: "var(--tavern-parchment)", opacity: 0.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-sm text-center" style={{ background: "rgba(201,147,58,0.08)", border: "1px solid rgba(201,147,58,0.2)" }}>
              <p className="font-cormorant italic text-base" style={{ color: "var(--tavern-parchment)", opacity: 0.8 }}>
                ✨ Можно добавить средневековые аксессуары — накидки, пояса, украшения
              </p>
            </div>
          </Scroll>
        </div>
      </section>

      {/* ── ПОДАРКИ ── */}
      <section id="gifts" className="py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Scroll className="text-center">
            <p className="font-cinzel text-xs tracking-[0.4em] uppercase mb-2" style={{ color: "var(--tavern-gold)", opacity: 0.65 }}>Глава четвёртая</p>
            <h2 className="font-cinzel font-bold text-3xl mb-4" style={{ color: "var(--tavern-gold-bright)" }}>Подарки</h2>
            <div className="w-14 h-14 mx-auto mb-5 rounded-sm flex items-center justify-center"
              style={{ background: "rgba(201,147,58,0.1)", border: "1px solid rgba(201,147,58,0.3)" }}>
              <Icon name="Gift" size={24} style={{ color: "var(--tavern-gold)" }} />
            </div>
            <p className="font-cormorant text-xl leading-relaxed mb-5" style={{ color: "var(--tavern-parchment)", opacity: 0.85 }}>
              Главное для нас — видеть вас рядом в этот особенный день.
            </p>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,147,58,0.5), transparent)" }} />
              <span style={{ color: "var(--tavern-gold)", fontSize: "0.9rem" }}>❧ ✦ ❧</span>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,147,58,0.5), transparent)" }} />
            </div>
            <p className="font-cormorant italic text-lg leading-relaxed mb-4" style={{ color: "var(--tavern-parchment)", opacity: 0.75 }}>
              А если вы захотите порадовать нас подарком, мы с благодарностью примем денежный вклад.
            </p>
            <div className="p-4 rounded-sm" style={{ background: "rgba(201,147,58,0.08)", border: "1px solid rgba(201,147,58,0.2)" }}>
              <p className="font-cormorant italic text-base" style={{ color: "var(--tavern-parchment)", opacity: 0.7 }}>
                🌿 Будем очень признательны, если вы откажетесь от цветов
              </p>
            </div>
          </Scroll>
        </div>
      </section>

      {/* ── ПОДТВЕРЖДЕНИЕ ── */}
      <section id="confirm" className="py-16 px-4 pb-24">
        <div className="max-w-lg mx-auto">
          <Scroll>
            <p className="font-cinzel text-xs tracking-[0.4em] uppercase mb-2 text-center" style={{ color: "var(--tavern-gold)", opacity: 0.65 }}>Финальный свиток</p>
            <h2 className="font-cinzel font-bold text-3xl mb-2 text-center" style={{ color: "var(--tavern-gold-bright)" }}>Ваш ответ</h2>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,147,58,0.5), transparent)" }} />
              <span style={{ color: "var(--tavern-gold)" }}>❧ ✦ ❧</span>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,147,58,0.5), transparent)" }} />
            </div>

            {submitted ? (
              <div className="text-center py-6">
                <div className="w-20 h-20 mx-auto mb-5 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(201,147,58,0.15)", border: "2px solid rgba(201,147,58,0.4)" }}>
                  <Icon name="Check" size={36} style={{ color: "var(--tavern-gold-bright)" }} />
                </div>
                <h3 className="font-cinzel text-2xl font-bold mb-3" style={{ color: "var(--tavern-gold-bright)" }}>
                  Свиток получен!
                </h3>
                <p className="font-cormorant italic text-xl leading-relaxed" style={{ color: "var(--tavern-parchment)", opacity: 0.85 }}>
                  Ваш ответ принят королевской канцелярией.<br />Ждём вас на торжестве!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="font-cinzel text-xs tracking-widest uppercase block mb-2" style={{ color: "var(--tavern-gold)", opacity: 0.85 }}>
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Как вас называть на пиру?"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-sm font-cormorant text-lg outline-none transition-all"
                    style={{
                      background: "rgba(0,0,0,0.3)",
                      border: "1px solid rgba(201,147,58,0.3)",
                      color: "var(--tavern-parchment)",
                      caretColor: "var(--tavern-gold)"
                    }}
                    onFocus={e => (e.target.style.borderColor = "var(--tavern-gold)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(201,147,58,0.3)")}
                  />
                </div>

                <div>
                  <label className="font-cinzel text-xs tracking-widest uppercase block mb-2" style={{ color: "var(--tavern-gold)", opacity: 0.85 }}>
                    Присутствие
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { val: "yes", label: "Буду на пиру!" },
                      { val: "no", label: "Не смогу прийти" }
                    ].map(opt => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setForm({ ...form, coming: opt.val })}
                        className="py-3 px-4 rounded-sm font-cinzel text-xs tracking-wider uppercase transition-all"
                        style={{
                          border: form.coming === opt.val ? "1px solid var(--tavern-gold)" : "1px solid rgba(201,147,58,0.25)",
                          background: form.coming === opt.val ? "rgba(201,147,58,0.2)" : "rgba(0,0,0,0.2)",
                          color: form.coming === opt.val ? "var(--tavern-gold-bright)" : "var(--tavern-parchment)",
                          opacity: form.coming === opt.val ? 1 : 0.6,
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {form.coming === "yes" && (
                  <div>
                    <label className="font-cinzel text-xs tracking-widest uppercase block mb-2" style={{ color: "var(--tavern-gold)", opacity: 0.85 }}>
                      Количество гостей
                    </label>
                    <select
                      value={form.guests}
                      onChange={e => setForm({ ...form, guests: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm font-cormorant text-lg outline-none"
                      style={{
                        background: "#2a1a0e",
                        border: "1px solid rgba(201,147,58,0.3)",
                        color: "var(--tavern-parchment)"
                      }}
                    >
                      {[1, 2, 3, 4].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? "странник" : n < 5 ? "странника" : "странников"}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="font-cinzel text-xs tracking-widest uppercase block mb-2" style={{ color: "var(--tavern-gold)", opacity: 0.85 }}>
                    Пожелания к пиру <span style={{ opacity: 0.45 }}>(необязательно)</span>
                  </label>
                  <textarea
                    placeholder="Особые пожелания по меню или другие заметки..."
                    value={form.dietary}
                    onChange={e => setForm({ ...form, dietary: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-sm font-cormorant text-lg outline-none resize-none transition-all"
                    style={{
                      background: "rgba(0,0,0,0.3)",
                      border: "1px solid rgba(201,147,58,0.3)",
                      color: "var(--tavern-parchment)"
                    }}
                    onFocus={e => (e.target.style.borderColor = "var(--tavern-gold)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(201,147,58,0.3)")}
                  />
                </div>

                {error && (
                  <p className="font-cormorant text-lg text-center" style={{ color: "#8b1f1f" }}>{error}</p>
                )}

                <button type="submit" disabled={loading} className="btn-tavern w-full py-4 rounded-sm text-base" style={{ opacity: loading ? 0.7 : 1 }}>
                  {loading ? "Отправляем свиток..." : "Отправить свиток"}
                </button>
              </form>
            )}
          </Scroll>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="pb-12 px-4 text-center">
        <div className="pt-4">
          <p className="font-cinzel text-2xl font-bold mb-2" style={{ color: "var(--tavern-gold)", textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>К &amp; К</p>
          <p className="font-cormorant italic text-lg" style={{ color: "var(--tavern-parchment)", opacity: 0.5, textShadow: "0 2px 6px rgba(0,0,0,0.8)" }}>
            08 августа 2026 · НеКлуб
          </p>
        </div>
      </footer>

      </div>
    </div>
  );
}