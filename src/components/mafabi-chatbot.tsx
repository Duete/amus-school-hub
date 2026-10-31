import { Bot, MessageCircle, Send, X } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";

const quickPrompts = ["Campus life", "Health services", "Admissions", "UACE subjects"];

type ChatMessage = { from: "mafabi" | "visitor"; text: string };

function answerFor(message: string) {
  const query = message.toLowerCase();
  if (query.includes("health") || query.includes("sick") || query.includes("clinic")) {
    return "Health services are for Boarding students. They provide everyday wellbeing and illness support, with referral arrangements when care beyond school is needed. Families should confirm current clinic hours and emergency procedures with the Boarding office.";
  }
  if (
    query.includes("campus") ||
    query.includes("club") ||
    query.includes("sport") ||
    query.includes("boarding")
  ) {
    return "Campus life includes houses, clubs, sports, music, dance and drama, student leadership, faith and reflection, plus a structured Boarding routine. Visit the Campus life page for the full overview.";
  }
  if (query.includes("admission") || query.includes("apply")) {
    return "You can start an admissions enquiry from the Admissions page. The form asks for learner, guardian, previous-school, study-level, and campus information.";
  }
  if (query.includes("uace") || query.includes("a level") || query.includes("alevel")) {
    return "UACE principal subjects include Biology, Chemistry, Mathematics, Physics, History, Geography, Literature, Christian Religious Education, Local Languages, Kiswahili, Fine Art, Entrepreneurship, Islamic Religious Education, Agriculture, and Economics. Subsidiaries are General Paper, Subsidiary Mathematics, and Subsidiary ICT.";
  }
  if (query.includes("uce") || query.includes("o level") || query.includes("olevel")) {
    return "UCE compulsory subjects are Biology, Chemistry, Mathematics, Physics, English, History and Political Education, and Geography. Electives include Agriculture, Art and Design, Religious Education, Entrepreneurship, ICT, Local Languages, Kiswahili, Literature, and Physical Education.";
  }
  if (query.includes("fee") || query.includes("payment") || query.includes("finance")) {
    return "Use Fees & clearance to view a learner statement and create a payment request. The current portal is a preview until the PostgreSQL API and a verified payment gateway are connected.";
  }
  if (query.includes("govern") || query.includes("head teacher") || query.includes("leadership")) {
    return "The Governance page explains the Board of Governors role and lists Day Campus and Boarding leaders, including the Heads, Deputies, and Directors of Studies.";
  }
  return "I’m Mafabi, the Mbale Progressive School Hub assistant. Ask me about campus life, Boarding health services, UCE/UACE subjects, admissions, fees, governance, or school activities.";
}

export function MafabiChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      from: "mafabi",
      text: "Hello, I’m Mafabi. How can I help you explore Mbale Progressive Secondary School?",
    },
  ]);
  const suggestedPrompts = useMemo(
    () =>
      quickPrompts.filter(
        (prompt) =>
          !messages.some((message) => message.from === "visitor" && message.text === prompt),
      ),
    [messages],
  );

  function sendMessage(text = input) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((current) => [
      ...current,
      { from: "visitor", text: trimmed },
      { from: "mafabi", text: answerFor(trimmed) },
    ]);
    setInput("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage();
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <section
          className="w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-sm border border-border bg-background shadow-2xl"
          aria-label="Mafabi chat window"
        >
          <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <Bot size={19} />
              </span>
              <div>
                <p className="font-semibold">Mafabi</p>
                <p className="text-xs text-primary-foreground/70">School Hub assistant</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-sm p-1 hover:bg-primary-foreground/10"
              aria-label="Close Mafabi"
            >
              <X size={18} />
            </button>
          </div>
          <div className="max-h-80 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.from}-${index}`}
                className={`max-w-[90%] rounded-sm p-3 text-sm leading-6 ${message.from === "visitor" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}
              >
                {message.text}
              </div>
            ))}
            {suggestedPrompts.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground hover:border-primary hover:text-primary"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-border p-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="form-input min-w-0 flex-1"
              placeholder="Ask Mafabi..."
              aria-label="Message Mafabi"
            />
            <button
              type="submit"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-primary text-primary-foreground"
              aria-label="Send message"
            >
              <Send size={17} />
            </button>
          </form>
        </section>
      )}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-lg transition-transform hover:-translate-y-0.5"
        aria-expanded={open}
        aria-label="Open Mafabi chat"
      >
        <MessageCircle size={19} /> Chat with Mafabi
      </button>
    </div>
  );
}
