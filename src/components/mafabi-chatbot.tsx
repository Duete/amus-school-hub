import { useRouterState } from "@tanstack/react-router";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";

const quickPrompts = [
  "What is on this page?",
  "Tell me about the school",
  "Football and table tennis",
  "Admissions criteria",
  "Fee clearance",
  "Campus life",
];

type ChatMessage = { from: "mafabi" | "visitor"; text: string };

const pageDescriptions: Record<string, string> = {
  "/": "This is the home page. It introduces the mixed day and boarding school, its two campuses, UCE/UACE pathways, school numbers, sports, debate, and the main routes for admissions and enquiries.",
  "/about":
    "This is the school profile page. It covers Mbale Progressive’s history, identity, location, motto, and the kind of education families can expect.",
  "/academics":
    "This is the academics page. It lists the UCE/O-Level and UACE/A-Level pathways, subjects, candidate numbers, assessment approach, and the route from S.1 through UACE.",
  "/admissions":
    "This is the admissions page. It explains Day Campus and boarding at Mbale Progressive Annex, entry guidance, application steps, and how to ask the school about places and fees.",
  "/admissions/apply":
    "This is the admission enquiry form. It asks for the learner’s details, previous school, intended level, campus choice, and guardian contact so the admissions office can follow up.",
  "/campus-life":
    "This is the campus-life page. It covers houses, clubs, faith associations, sports, music, dance and drama, leadership, boarding routines, and health services for boarding students.",
  "/campuses":
    "This is the campus directory. Day Campus is on Nyanza Road near Namatala in Mbale City. Mbale Progressive Annex is the boarding campus.",
  "/faculty":
    "This is the faculty directory. It introduces subject heads, teachers, academic support, and the staff responsible for learner guidance and activities.",
  "/finance":
    "This is Fees & clearance. It is a preview portal for checking a learner statement, seeing an outstanding balance, and creating a payment request.",
  "/governance":
    "This is the governance page. It explains the Board of Governors and lists Day Campus and Boarding leaders for academics, welfare, administration, and studies.",
  "/news":
    "This is the news page. It carries academic updates, leadership news, the 2025/2026 Debate Society report, the 2026 football result, and the table-tennis story.",
  "/performance":
    "This is the performance page. It presents the learner-performance dashboard concept and the academic measures the school can track.",
  "/scholarships":
    "This is the scholarships page. It explains Galiwango Foundation sponsorship and merit-based awards for strong PLE, class, and UCE performance.",
  "/sports":
    "This is Sports & debate. It covers the 2026 football championship, the Debate Society’s 2025/2026 results, the Galiwango support story, and Mbale Progressive’s table-tennis record.",
  "/contact":
    "This is the contact page. It gives the school location, office hours, visitation guidance, and the enquiry route for current details.",
};

function pageContext(pathname: string) {
  return (
    pageDescriptions[pathname] ??
    "You are viewing a Mbale Progressive School Hub page. Tell me the section or topic you want explained and I will point you to the relevant school information."
  );
}

function answerFor(message: string, pathname: string) {
  const query = message.toLowerCase();
  if (
    query.includes("this page") ||
    query.includes("current page") ||
    query.includes("what is here") ||
    query === "page information"
  ) {
    return pageContext(pathname);
  }
  if (
    query.includes("about the school") ||
    query.includes("school profile") ||
    query.includes("who are you") ||
    query.includes("where is the school") ||
    query.includes("founded") ||
    query.includes("motto")
  ) {
    return "Mbale Progressive Secondary School is a mixed day and boarding school in Mbale City, Uganda. It was established in 1993 and serves more than 1,500 learners from S.1 through UACE. The Day Campus is on Nyanza Road near Namatala; Mbale Progressive Annex is the boarding campus. The school motto is ‘The Love of Education Brought Us Here.’ The footer taglines are ‘We Unlock the Future’ and ‘The Temple of Knowledge.’";
  }
  if (query.includes("football") || query.includes("soccer")) {
    return "Mbale Progressive represented the Bugisu Region at the 2026 National Boys’ Football Championship in Lira, held from 10 to 20 May. The team reached the Round of 16 and finished 14th nationally. Open the Sports & debate page for the full football article.";
  }
  if (
    query.includes("table tennis") ||
    query.includes("ping pong") ||
    query.includes("ping-pong")
  ) {
    return "Mbale Progressive has a strong table-tennis record. A 2016 Kawowo report says the school won the women’s team event at the Kenya Thika Open International Table Tennis event, with Halima Nambozo retaining the women’s singles title and helping the team beat Mbale Tigers 3–2. The Sports & debate page links the report and a public NTV Uganda event video.";
  }
  if (query.includes("debate") || query.includes("debating") || query.includes("orator")) {
    return "In 2025/2026, the Debate Society reached the national knockout rounds at the NIRA National Schools Debate Championship, finished First Runners-Up at the fourth 93.1 IUIU FM Inter-School Debate Championship, and performed strongly at the Mbale District UNSA Debate Championship. The News page includes public event links, including the IUIU FM championship video.";
  }
  if (query.includes("sport") || query.includes("activity")) {
    return "Sports and student activities include football, table tennis, debate, music, dance and drama, clubs, houses, faith associations, and student leadership. The school represented Bugisu Region in football and has a documented table-tennis record in Uganda and the Kenya Thika Open.";
  }
  if (query.includes("scholarship") || query.includes("sponsor") || query.includes("bursary")) {
    return "The Galiwango Foundation sponsors more than 50 students across all levels at both Day Campus and the boarding campus. Other merit support includes awards for strong PLE entrants joining S.1, the best student in each class, and full A-Level scholarships for top UCE performers, subject to confirmation by the school.";
  }
  if (
    query.includes("house") ||
    query.includes("club") ||
    query.includes("faith") ||
    query.includes("religion")
  ) {
    return "The houses are Galiwango, Mukongoni, Nantume, and Kaggwa. Clubs include Red Cross, Writers’ Club, Science Club, Interact Club, and Debate Society. Faith associations are the Muslim Students Association, Young Catholics Association, and Scripture Union.";
  }
  if (
    query.includes("leader") ||
    query.includes("govern") ||
    query.includes("head teacher") ||
    query.includes("deputy") ||
    query.includes("dos")
  ) {
    return "The governance page lists the Board of Governors and campus leadership. Day Campus leaders include Mr. Ocukul Julius, Mr. Ssempala Nathan, Ms. Nabukwasi Patience, Mr. Sahamali Elias, and Mr. Gwire Muhammad. Boarding leaders include Mr. Mudebo Ali Masai, Mrs. Buyi Alice Lamwaka, Mr. Wamboga Asuman, and Mr. Wangota Joshua.";
  }
  if (query.includes("faculty") || query.includes("teacher") || query.includes("staff")) {
    return "The Faculty page lists subject heads, teachers, and activity leadership across O-Level and A-Level. For a named subject lead or teacher, open Faculty and search the directory rather than relying on a general chat answer.";
  }
  if (query.includes("location") || query.includes("address") || query.includes("office")) {
    return "The Day Campus is on Nyanza Road near Namatala in Mbale City. Mbale Progressive Annex is the boarding campus. The usual office window is Monday to Friday, 08:00–17:00. Confirm term, holiday, and visitation arrangements before travelling.";
  }
  if (query.includes("health") || query.includes("sick") || query.includes("clinic")) {
    return "Health services are for Boarding students. They provide everyday wellbeing and illness support, with referral arrangements when care beyond school is needed. Families should confirm current clinic hours and emergency procedures with the Boarding office.";
  }
  if (
    query.includes("criteria") ||
    query.includes("requirement") ||
    query.includes("qualify") ||
    query.includes("admission") ||
    query.includes("apply")
  ) {
    return "Admissions criteria vary by entry level. Start with the application form and prepare the learner’s full name, previous school, intended level (O’level/UCE or A’level/UACE), campus choice, guardian contacts, and recent academic information. The Admissions office should confirm the latest entry requirements and available places before a final decision.";
  }
  if (query.includes("visitation") || query.includes("visit day") || query.includes("visiting")) {
    return "Visitation day is intended for families to connect with boarding students and the school team. Please contact the school before travelling to confirm the current Saturday visitation time, visitor guidance, and any term-specific arrangements.";
  }
  if (query.includes("campus") || query.includes("boarding")) {
    return "Campus life includes houses, clubs, sports, music, dance and drama, student leadership, faith and reflection, plus a structured Boarding routine. Visit the Campus life page for the full overview.";
  }
  if (query.includes("uace") || query.includes("a level") || query.includes("alevel")) {
    return "UACE principal subjects include Biology, Chemistry, Mathematics, Physics, History, Geography, Literature, Christian Religious Education, Local Languages, Kiswahili, Fine Art, Entrepreneurship, Islamic Religious Education, Agriculture, and Economics. Subsidiaries are General Paper, Subsidiary Mathematics, and Subsidiary ICT.";
  }
  if (query.includes("uce") || query.includes("o level") || query.includes("olevel")) {
    return "UCE compulsory subjects are Biology, Chemistry, Mathematics, Physics, English, History and Political Education, and Geography. Electives include Agriculture, Art and Design, Religious Education, Entrepreneurship, ICT, Local Languages, Kiswahili, Literature, and Physical Education.";
  }
  if (
    query.includes("fee") ||
    query.includes("payment") ||
    query.includes("finance") ||
    query.includes("clearance") ||
    query.includes("balance") ||
    query.includes("statement")
  ) {
    return "For fee clearance, open Fees & clearance, enter the learner ID, review the statement and outstanding balance, then create a payment request. Keep the payment reference for follow-up. The portal is currently a preview until the PostgreSQL API and verified payment gateway are connected.";
  }
  if (query.includes("hours") || query.includes("open")) {
    return "The school information strip lists the usual office window as Monday to Friday, 08:00–17:00. Please confirm holiday and term-time arrangements before visiting.";
  }
  return "I’m Mafabi, the Mbale Progressive School Hub assistant. I can explain the page you are viewing, school history and locations, UCE/UACE subjects, admissions, fees, scholarships, governance, faculty, houses, clubs, faith associations, football, debate, table tennis, and boarding health services.";
}

export function MafabiChatbot() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
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
      { from: "mafabi", text: answerFor(trimmed, pathname) },
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
