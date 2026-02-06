import { useForm, ValidationError } from "@formspree/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import rocket from "../assets/rocket.png";

export default function ContactSection() {
  const [state, handleSubmit] = useForm("xlgwerbn");
  const [launch, setLaunch] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
    if (!state.errors) setLaunch(true);
  };

  return (
    <section id="contact" className="relative min-h-screen bg-black/60 text-white overflow-hidden flex items-center justify-center">
      
      {/* Title */}
      <h2 className="absolute top-24 tracking-[0.4em] text-white/60 text-3xl">
        CONTACT
      </h2>

      {/* FORM */}
      {!state.succeeded && (
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-[90%] max-w-lg mt-32 p-10
                     bg-black/10 border border-white/15 rounded-2xl
                     backdrop-blur-xl shadow-[0_0_60px_rgba(255,255,255,0.05)]"
        >
          <div className="space-y-7">
            <input
              name="name"
              placeholder="NAME"
              required
              className="w-full bg-transparent border border-white/20
                         px-4 py-3 rounded-md tracking-widest
                         focus:border-cyan-400 outline-none transition"
            />

            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              required
              className="w-full bg-transparent border border-white/20
                         px-4 py-3 rounded-md tracking-widest
                         focus:border-cyan-400 outline-none transition"
            />

            <textarea
              name="message"
              rows="4"
              placeholder="MESSAGE"
              required
              className="w-full bg-transparent border border-white/20
                         px-4 py-3 rounded-md tracking-widest
                         focus:border-cyan-400 outline-none resize-none transition"
            />

            <ValidationError errors={state.errors} />

            <button
              type="submit"
              disabled={state.submitting}
              className="w-full py-3 rounded-full bg-white text-black
                         font-semibold tracking-widest hover:scale-105 transition"
            >
              {state.submitting ? "TRANSMITTING…" : "SEND"}
            </button>
          </div>
        </motion.form>
      )}

      {/* SUCCESS */}
      {state.succeeded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute z-10 text-center mt-40"
        >
          <h3 className="text-4xl tracking-wider mb-20">
            MESSAGE RECEIVED
          </h3>
          <p className="text-white/60">
            Will connect soon…
          </p>
        </motion.div>
      )}

      {/* 🚀 ROCKET */}
      <AnimatePresence>
        {launch && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "-130vh" }}
            transition={{ duration: 1.3, ease: "easeIn" }}
            className="absolute bottom-[-160px] left-1/2 -translate-x-1/2"
          >
            {/* ROCKET */}
            <img src={rocket} className="w-20 mx-auto relative z-10" />

            {/* FIRE */}
            <div className="mx-auto w-8 h-32 -mt-2
                            bg-gradient-to-b from-yellow-200 via-orange-500 to-transparent
                            blur-sm rounded-full animate-flame" />

            {/* GLOW */}
            <div className="mx-auto -mt-24 w-24 h-24
                            bg-orange-500/30 blur-3xl rounded-full" />
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes flame {
          0% { height: 80px; opacity: 0.7 }
          50% { height: 120px; opacity: 1 }
          100% { height: 90px; opacity: 0.8 }
        }
        .animate-flame {
          animation: flame 0.12s infinite alternate;
        }
      `}</style>
    </section>
  );
}
