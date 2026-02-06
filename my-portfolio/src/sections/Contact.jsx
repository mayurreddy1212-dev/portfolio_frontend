import { useForm } from "@formspree/react";
import { useState } from "react";
import rocket from "../assets/rocket.png";

export default function ContactSection() {
  const [state, handleSubmit] = useForm("xlgwerbn");
  const [launched, setLaunched] = useState(false);

  const submit = async (e) => {
    await handleSubmit(e);
    setLaunched(true);
  };

  return (
    <section className="relative h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#0b1020_0%,#04050b_60%,#000_100%)]" />

      {/* ROCKET */}
      {launched && (
        <img
          src={rocket}
          alt="rocket"
          className="absolute bottom-[-120px] left-1/2 -translate-x-1/2
                     w-20 animate-rocket"
        />
      )}

      {!state.succeeded ? (
        <form
          onSubmit={submit}
          className="relative z-10 w-[380px] p-8
                     bg-[#070b1a]/85 border border-indigo-400/30
                     shadow-[0_0_50px_rgba(0,0,0,0.7)]"
        >
          <h2 className="text-xs tracking-[0.3em] text-indigo-300 mb-6">
            CONTACT TRANSMISSION
          </h2>

          <div className="mb-6">
            <label className="block text-[11px] tracking-widest text-white/60 mb-2">
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full bg-black border border-white/15
                         px-3 py-2 text-sm text-white outline-none
                         focus:border-indigo-400 transition"
            />
          </div>

          <div className="mb-8">
            <label className="block text-[11px] tracking-widest text-white/60 mb-2">
              MESSAGE
            </label>
            <textarea
              name="message"
              rows={5}
              required
              className="w-full bg-black border border-white/15
                         px-3 py-2 text-sm text-white resize-none outline-none
                         focus:border-indigo-400 transition"
            />
          </div>

          <button
            type="submit"
            disabled={state.submitting}
            className="w-full py-3 text-xs tracking-[0.35em]
                       border border-indigo-400 text-indigo-300
                       hover:bg-indigo-400/10 transition"
          >
            TRANSMIT
          </button>
        </form>
      ) : (
        <div className="relative z-10 px-10 py-8 text-center
                        bg-[#070b1a]/85 border border-indigo-400/30">
          <h2 className="text-xs tracking-[0.35em] text-indigo-300 mb-4">
            SIGNAL RECEIVED
          </h2>
          <p className="text-sm text-white/70">
            Message received.
            <br />
            Will connect soon.
          </p>
        </div>
      )}

      {/* TAILWIND KEYFRAMES */}
      <style>
        {`
          @keyframes rocket {
            0% { transform: translate(-50%, 0) scale(1); opacity: 1; }
            100% { transform: translate(-50%, -120vh) scale(0.9); opacity: 0; }
          }
          .animate-rocket {
            animation: rocket 2.8s ease-in forwards;
          }
        `}
      </style>
    </section>
  );
}
