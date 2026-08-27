// Soft glowing orbs + faint ring outlines behind the glass UI, matching the
// frosted-glass reference: a dark canvas with color bleeding through blur.
export default function BackgroundDecor() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-dark-950">
      {/* Color glow blobs */}
      <div className="absolute -top-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-accent-600/25 blur-[120px]" />
      <div className="absolute bottom-[-10rem] right-[-6rem] w-[28rem] h-[28rem] rounded-full bg-teal-500/20 blur-[120px]" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-fuchsia-600/10 blur-[100px]" />

      {/* Faint concentric ring outlines, echoing the reference image */}
      <div className="absolute -top-24 -left-24 w-[26rem] h-[26rem] rounded-full border border-white/[0.06]" />
      <div className="absolute -top-10 -left-10 w-[20rem] h-[20rem] rounded-full border border-white/[0.05]" />
      <div className="absolute -bottom-24 -right-24 w-[26rem] h-[26rem] rounded-full border border-white/[0.06]" />
      <div className="absolute -bottom-10 -right-10 w-[20rem] h-[20rem] rounded-full border border-white/[0.05]" />
    </div>
  )
}
