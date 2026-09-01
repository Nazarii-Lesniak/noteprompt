export default function MessageTypingIndicator() {
  return (
    <div className="flex items-end gap-2.5 mr-auto max-w-[80%]">
      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-mint text-slate border border-sky shrink-0">
        <span className="font-bold">NP</span>
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-bl-xs bg-white/70 border border-sky text-slate flex items-center gap-1.5 h-11">
        <span className="w-2 h-2 rounded-full bg-slate animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 rounded-full bg-slate animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 rounded-full bg-slate animate-bounce" />
      </div>
    </div>
  );
}
