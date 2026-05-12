import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useTheme } from "../context/ThemeContext";

export default function Contact() {
  const { ref, revealed } = useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });
  const [sent, setSent] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const FORMSPREE_ID = "xkoyzazr"; // ← paste your Formspree form ID here
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSent(true);
    } catch { setSent(true); }
  };

  const inputBase = [
    "w-full text-sm px-4 py-3 rounded-lg border transition-colors duration-150 focus:outline-none",
    isDark
      ? "bg-ink-800 border-wire text-neutral-200 placeholder-neutral-600 focus:border-primary"
      : "bg-white border-wire-light text-neutral-900 placeholder-neutral-400 focus:border-primary",
  ].join(" ");

  const metaLabel = `font-mono text-[11px] uppercase tracking-wider block mb-2 ${isDark ? "text-neutral-500" : "text-neutral-400"}`;

  return (
    <section id="contact"
      className={`py-32 border-t transition-colors duration-300
        ${isDark ? "bg-ink-900 border-wire" : "bg-paper-100 border-wire-light"}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className={`${revealed ? "fade-up visible" : "fade-up"} grid md:grid-cols-2 gap-20`}>

          {/* Info */}
          <div>
            <p className="section-label mb-5">Contact</p>
            <h2 className={`section-title text-4xl lg:text-5xl mb-8
              ${isDark ? "text-neutral-100" : "text-neutral-900"}`}>
              Let's talk<br />
              <span className={isDark ? "text-neutral-500" : "text-neutral-400"}>about your project.</span>
            </h2>
            <div className={`space-y-5 text-[0.9375rem] leading-relaxed mb-10
              ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
              <p>
                I'm open to freelance projects, short-term contracts, and part-time
                engagements. If you have a system that needs to be built properly, not just quickly, I'm interested.
              </p>
              <p>
                Describe the problem you're trying to solve. I'll tell you honestly
                whether I can help and what the right approach looks like.
              </p>
            </div>
            <div className="space-y-5">
              {[
                { label: "Response Time", value: "Within 24–48 hours" },
                { label: "Availability",  value: "Open to remote projects" },
                { label: "Time Zone",     value: "UTC+8 (Philippines)" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className={`font-mono text-[11px] uppercase tracking-wider mb-1 ${isDark ? "text-neutral-600" : "text-neutral-400"}`}>
                    {label}
                  </p>
                  <p className={`text-sm font-medium ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div className={`rounded-xl border p-8 h-full flex flex-col justify-center
                ${isDark ? "border-wire bg-ink-800" : "border-wire-light bg-white"}`}
                   style={{ borderColor: "var(--primary-muted)" }}>
                <div className="font-semibold text-lg mb-3" style={{ color: "var(--primary)" }}>
                  ✓ Message received.
                </div>
                <p className={`text-sm leading-relaxed ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                  Thanks for reaching out. I'll review your project details and respond within 24–48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={metaLabel}>Name</label>
                    <input name="name" value={form.name} onChange={handleChange} required
                           placeholder="Your name" className={inputBase} />
                  </div>
                  <div>
                    <label className={metaLabel}>Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required
                           placeholder="your@email.com" className={inputBase} />
                  </div>
                </div>
                <div>
                  <label className={metaLabel}>Project Type</label>
                  <select name="project" value={form.project} onChange={handleChange} required className={inputBase}>
                    <option value="" disabled>Select a category</option>
                    <option value="web">Web Application</option>
                    <option value="mobile">Mobile App</option>
                    <option value="backend">Backend / Database</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className={metaLabel}>Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                            placeholder="Describe the problem you're solving and any relevant constraints..."
                            className={`${inputBase} resize-none`} />
                </div>
                <button type="submit" className="btn-primary w-full justify-center">
                  Send Message
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                  </svg>
                </button>
                <p className={`font-mono text-[11px] text-center ${isDark ? "text-neutral-700" : "text-neutral-400"}`}>
                  No spam. No marketing. Just project conversations.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
