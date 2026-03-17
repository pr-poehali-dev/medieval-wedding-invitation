import { useState } from "react";
import Icon from "@/components/ui/icon";

const RSVP_URL = "https://functions.poehali.dev/a142cd63-6a0a-4a44-aff4-d06fdbe145c3";

const COAT_OF_ARMS = "https://cdn.poehali.dev/projects/0aa96c6b-dbcc-48a7-8de0-43fa7dddae32/files/ebe40a92-1060-4836-a8b7-9dede641bd38.jpg";

const SCHEDULE = [
  { time: "12:00", icon: "Crown", title: "Церемония в ЗАГСе", desc: "Торжественная регистрация союза" },
  { time: "13:00", icon: "Camera", title: "Фотосессия", desc: "Сохраним воспоминания для летописи" },
  { time: "15:00", icon: "Wine", title: "Пир в НеКлубе", desc: "Ул. Коммуны, 14 — начало торжества" },
];

const DRESSCODE = [
  { color: "#6b4c3b", name: "Коричневый", desc: "Цвет дерева и земли" },
  { color: "#c9b99a", name: "Бежевый", desc: "Цвет пергамента и песка" },
  { color: "#2d4a35", name: "Тёмно-зелёный", desc: "Цвет леса и мха" },
];

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
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #1a0e06 0%, #2a1a0e 20%, #1e1209 80%, #100a04 100%)" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #c9933a 0%, transparent 70%)" }} />
        </div>

        <div className="relative z-10 w-full max-w-2xl text-center animate-float-in" style={{ animationDelay: "0s" }}>
          <p className="font-cinzel text-xs tracking-[0.5em] uppercase mb-8" style={{ color: "var(--tavern-gold)", opacity: 0.7 }}>
            Свиток приглашения
          </p>

          <div className="relative mx-auto w-44 h-44 mb-8 animate-float-in" style={{ animationDelay: "0.2s" }}>
            <div className="absolute inset-0 rounded-full animate-glow-pulse" />
            <img
              src={COAT_OF_ARMS}
              alt="Герб"
              className="w-full h-full object-cover rounded-full border-2"
              style={{ borderColor: "var(--tavern-gold)", boxShadow: "0 0 40px rgba(201,147,58,0.3), 0 0 0 4px rgba(201,147,58,0.1)" }}
            />
          </div>

          <div className="animate-float-in" style={{ animationDelay: "0.35s" }}>
            <h1 className="font-cinzel font-black leading-none mb-2" style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)", color: "var(--tavern-gold-bright)", textShadow: "0 0 30px rgba(232,184,75,0.4), 0 4px 8px rgba(0,0,0,0.8)" }}>
              Катерина
            </h1>
            <p className="font-cormorant italic text-2xl mb-2" style={{ color: "var(--tavern-parchment)", opacity: 0.6 }}>&amp;</p>
            <h1 className="font-cinzel font-black leading-none mb-8" style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)", color: "var(--tavern-gold-bright)", textShadow: "0 0 30px rgba(232,184,75,0.4), 0 4px 8px rgba(0,0,0,0.8)" }}>
              Кирилл
            </h1>
          </div>

          <div className="ornament-line mb-6 animate-float-in" style={{ animationDelay: "0.45s" }}>
            <span className="font-cinzel text-sm tracking-widest" style={{ color: "var(--tavern-gold)", whiteSpace: "nowrap" }}>
              08 · 08 · 2026
            </span>
          </div>

          <p className="font-cormorant italic text-xl leading-relaxed animate-float-in" style={{ color: "var(--tavern-parchment)", opacity: 0.8, animationDelay: "0.55s" }}>
            Двое странников встретили свою судьбу<br />и зовут тебя разделить этот час с ними
          </p>

          <div className="mt-10 animate-float-in" style={{ animationDelay: "0.65s" }}>
            <a href="#confirm" className="btn-tavern inline-block px-10 py-4 rounded-sm">
              Принять приглашение
            </a>
          </div>

          <div className="mt-16 animate-float-in" style={{ animationDelay: "0.75s" }}>
            <Icon name="ChevronDown" size={24} className="mx-auto animate-bounce" style={{ color: "var(--tavern-gold)", opacity: 0.4 } as React.CSSProperties} />
          </div>
        </div>
      </section>

      {/* ── ПРОГРАММА ── */}
      <section id="program" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-cinzel text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "var(--tavern-gold)", opacity: 0.6 }}>Глава первая</p>
            <h2 className="font-cinzel font-bold text-4xl gold-text mb-3">Программа дня</h2>
            <div className="rune-divider text-center" />
          </div>

          <div className="section-card rounded-sm p-8 space-y-8">
            {SCHEDULE.map((item, i) => (
              <div key={i} className="timeline-item">
                <div className="flex items-start gap-5">
                  <div className="shrink-0 w-14 h-14 rounded-sm flex items-center justify-center"
                    style={{ background: "linear-gradient(145deg, var(--tavern-green), var(--tavern-green-light))", border: "1px solid rgba(201,147,58,0.3)" }}>
                    <Icon name={item.icon} size={22} style={{ color: "var(--tavern-gold)" }} />
                  </div>
                  <div>
                    <span className="font-cinzel text-lg font-semibold gold-text">{item.time}</span>
                    <h3 className="font-cinzel text-base font-medium mt-0.5" style={{ color: "var(--tavern-parchment)" }}>{item.title}</h3>
                    <p className="font-cormorant italic text-lg mt-1" style={{ color: "var(--tavern-parchment)", opacity: 0.6 }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── МЕСТО ── */}
      <section id="place" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-cinzel text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "var(--tavern-gold)", opacity: 0.6 }}>Глава вторая</p>
            <h2 className="font-cinzel font-bold text-4xl gold-text mb-3">Место пира</h2>
            <div className="rune-divider text-center" />
          </div>

          <div className="section-card rounded-sm p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-sm flex items-center justify-center"
              style={{ background: "linear-gradient(145deg, var(--tavern-green), var(--tavern-green-light))", border: "1px solid rgba(201,147,58,0.3)" }}>
              <Icon name="MapPin" size={28} style={{ color: "var(--tavern-gold)" }} />
            </div>
            <h3 className="font-cinzel text-2xl font-bold mb-2" style={{ color: "var(--tavern-gold-bright)" }}>НеКлуб</h3>
            <p className="font-cormorant italic text-xl mb-6" style={{ color: "var(--tavern-parchment)", opacity: 0.7 }}>
              ул. Коммуны, 14
            </p>
            <div className="ornament-line mb-6">
              <span className="font-cormorant text-base" style={{ color: "var(--tavern-parchment)", opacity: 0.5 }}>Начало торжества в 15:00</span>
            </div>
            <p className="font-cormorant text-lg leading-relaxed" style={{ color: "var(--tavern-parchment)", opacity: 0.65 }}>
              Великолепный зал ждёт отважных гостей.<br />
              Врата откроются ровно в назначенный час.
            </p>
          </div>
        </div>
      </section>

      {/* ── ДРЕСС-КОД ── */}
      <section id="dresscode" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-cinzel text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "var(--tavern-gold)", opacity: 0.6 }}>Глава третья</p>
            <h2 className="font-cinzel font-bold text-4xl gold-text mb-3">Дресс-код</h2>
            <div className="rune-divider text-center" />
          </div>

          <div className="section-card rounded-sm p-8">
            <p className="font-cormorant italic text-xl text-center mb-8" style={{ color: "var(--tavern-parchment)", opacity: 0.7 }}>
              Облачитесь в цвета тёмного леса и пергаментных свитков
            </p>
            <div className="grid grid-cols-3 gap-4">
              {DRESSCODE.map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-3 border-2"
                    style={{ backgroundColor: item.color, borderColor: "rgba(201,147,58,0.4)", boxShadow: `0 0 20px ${item.color}44` }} />
                  <p className="font-cinzel text-sm font-medium mb-1" style={{ color: "var(--tavern-parchment)" }}>{item.name}</p>
                  <p className="font-cormorant italic text-base" style={{ color: "var(--tavern-parchment)", opacity: 0.5 }}>{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-5 rounded-sm text-center" style={{ background: "rgba(45,74,53,0.3)", border: "1px solid rgba(201,147,58,0.15)" }}>
              <Icon name="Sparkles" size={18} className="mx-auto mb-2" style={{ color: "var(--tavern-gold)" }} />
              <p className="font-cormorant italic text-lg" style={{ color: "var(--tavern-parchment)", opacity: 0.8 }}>
                Вы можете добавить любые средневековые аксессуары — накидки, пояса, украшения
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ПОДТВЕРЖДЕНИЕ ── */}
      <section id="confirm" className="py-20 px-4 pb-32">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-14">
            <p className="font-cinzel text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "var(--tavern-gold)", opacity: 0.6 }}>Финальный свиток</p>
            <h2 className="font-cinzel font-bold text-4xl gold-text mb-3">Ваш ответ</h2>
            <div className="rune-divider text-center" />
          </div>

          <div className="section-card rounded-sm p-8">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(145deg, var(--tavern-green), var(--tavern-green-light))", border: "1px solid rgba(201,147,58,0.3)" }}>
                  <Icon name="Check" size={36} style={{ color: "var(--tavern-gold-bright)" }} />
                </div>
                <h3 className="font-cinzel text-2xl font-bold mb-3" style={{ color: "var(--tavern-gold-bright)" }}>
                  Свиток получен!
                </h3>
                <p className="font-cormorant italic text-xl leading-relaxed" style={{ color: "var(--tavern-parchment)", opacity: 0.8 }}>
                  Ваш ответ принят королевской канцелярией.<br />Ждём вас на торжестве!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="font-cinzel text-xs tracking-widest uppercase block mb-2" style={{ color: "var(--tavern-gold)", opacity: 0.8 }}>
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
                  <label className="font-cinzel text-xs tracking-widest uppercase block mb-2" style={{ color: "var(--tavern-gold)", opacity: 0.8 }}>
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
                          opacity: form.coming === opt.val ? 1 : 0.6
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {form.coming === "yes" && (
                  <div>
                    <label className="font-cinzel text-xs tracking-widest uppercase block mb-2" style={{ color: "var(--tavern-gold)", opacity: 0.8 }}>
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
                  <label className="font-cinzel text-xs tracking-widest uppercase block mb-2" style={{ color: "var(--tavern-gold)", opacity: 0.8 }}>
                    Пожелания к пиру <span style={{ opacity: 0.4 }}>(необязательно)</span>
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
                  <p className="font-cormorant text-lg text-center" style={{ color: "#e05555" }}>{error}</p>
                )}

                <button type="submit" disabled={loading} className="btn-tavern w-full py-4 rounded-sm text-base" style={{ opacity: loading ? 0.7 : 1 }}>
                  {loading ? "Отправляем свиток..." : "Отправить свиток"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="pb-12 px-4 text-center" style={{ borderTop: "1px solid rgba(201,147,58,0.15)" }}>
        <div className="pt-10">
          <p className="font-cinzel text-2xl font-bold mb-2" style={{ color: "var(--tavern-gold)", opacity: 0.6 }}>К &amp; К</p>
          <p className="font-cormorant italic text-lg" style={{ color: "var(--tavern-parchment)", opacity: 0.35 }}>
            08 августа 2026 · НеКлуб
          </p>
        </div>
      </footer>
    </div>
  );
}