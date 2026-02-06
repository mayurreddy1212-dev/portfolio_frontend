import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useState } from "react";

const ContactSection = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "SERVICE_ID",
        "TEMPLATE_ID",
        e.target,
        "YOUR_PUBLIC_KEY"
      )
      .then(() => {
        setSent(true);
        setLoading(false);
        e.target.reset();
      })
      .catch(() => {
        setLoading(false);
        alert("Something went wrong. Try again.");
      });
  };

  return (
    <section className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      <h2 className="absolute top-16 text-4xl font-semibold">
        Contact
      </h2>

      <motion.form
        onSubmit={sendEmail}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-[90%] max-w-lg mt-32 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
      >
        <div className="flex flex-col gap-5">
          <input
            type="text"
            name="from_name"
            placeholder="Your Name"
            required
            className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 outline-none"
          />

          <input
            type="email"
            name="from_email"
            placeholder="Your Email"
            required
            className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 outline-none"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            required
            className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 outline-none resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-4 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : sent ? "Message Sent ✓" : "Send Message"}
          </button>
        </div>
      </motion.form>
    </section>
  );
};

export default ContactSection;
