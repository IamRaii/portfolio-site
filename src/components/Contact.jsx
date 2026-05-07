import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Contact() {
  const ref = useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://formspree.io/f/xkoyzazr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSent(true);
        setForm({ name: "", email: "", project: "", message: "" });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-28 border-t border-wire bg-ink-900">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="fade-up grid md:grid-cols-2 gap-16">
          {/* Left: info */}
          <div>
            <p className="section-label mb-4">Contact</p>
            <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl mb-8">
              Let's talk<br />
              <span className="text-stone-500">about your project.</span>
            </h2>

            <div className="space-y-6 mb-10">
              <p className="text-stone-400 leading-relaxed">
                I'm open to freelance projects, short-term contracts, and part-time
                engagements. If you have a system that needs to be built properly —
                not just quickly — I'm interested.
              </p>
              <p className="text-stone-400 leading-relaxed">
                Describe the problem you're trying to solve. I'll tell you honestly
                whether I can help and what the right approach looks like.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-mono text-xs text-stone-600 uppercase tracking-wider mb-1">Response Time</p>
                <p className="text-stone-300 text-sm">Within 24–48 hours</p>
              </div>
              <div>
                <p className="font-mono text-xs text-stone-600 uppercase tracking-wider mb-1">Availability</p>
                <p className="text-stone-300 text-sm">Open to remote projects</p>
              </div>
              <div>
                <p className="font-mono text-xs text-stone-600 uppercase tracking-wider mb-1">Time Zone</p>
                <p className="text-stone-300 text-sm">UTC+8 (Philippines)</p>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div>
            {sent ? (
              <div className="border border-accent-glow/30 bg-ink-800 p-8 h-full flex flex-col justify-center">
                <div className="font-mono text-accent-glow text-lg mb-3">✓ Message received.</div>
                <p className="text-stone-400 text-sm leading-relaxed">
                  Thanks for reaching out. I'll review your project details and respond
                  within 24–48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-mono text-xs text-stone-500 uppercase tracking-wider block mb-2">
                      Name
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full bg-ink-800 border border-wire text-stone-200 text-sm px-4 py-3 placeholder-stone-600 focus:outline-none focus:border-accent-dim transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-stone-500 uppercase tracking-wider block mb-2">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full bg-ink-800 border border-wire text-stone-200 text-sm px-4 py-3 placeholder-stone-600 focus:outline-none focus:border-accent-dim transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-xs text-stone-500 uppercase tracking-wider block mb-2">
                    Project Type
                  </label>
                  <select
                    name="project"
                    value={form.project}
                    onChange={handleChange}
                    required
                    className="w-full bg-ink-800 border border-wire text-stone-200 text-sm px-4 py-3 focus:outline-none focus:border-accent-dim transition-colors"
                  >
                    <option value="" disabled>Select a category</option>
                    <option value="web">Web Application</option>
                    <option value="mobile">Mobile App</option>
                    <option value="backend">Backend / Database</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-xs text-stone-500 uppercase tracking-wider block mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Describe the problem you're solving and any relevant constraints..."
                    className="w-full bg-ink-800 border border-wire text-stone-200 text-sm px-4 py-3 placeholder-stone-600 focus:outline-none focus:border-accent-dim transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center"
                >
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                  </svg>
                </button>

                <p className="font-mono text-xs text-stone-600 text-center">
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
