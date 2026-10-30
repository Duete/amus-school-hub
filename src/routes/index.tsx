import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, BookOpen, HeartHandshake, Sprout, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { campuses, schoolHead } from '@/lib/school';
import schoolLife from '@/assets/school-life.jpg';

export const Route = createFileRoute('/')({ head: () => schoolHead('A place to learn. A future to shape.', 'Discover Greenwood College, an original school community with City and Hillside campuses.'), component: Index });

function Index() {
  return <>
    <section className="school-hero">
      <img src={schoolLife} width={1920} height={1024} alt="Students sharing a moment together on a green school campus" className="hero-image" fetchPriority="high" />
      <div className="hero-overlay" />
      <div className="site-width relative hero-enter text-hero-foreground">
        <p className="eyebrow mb-5 flex items-center gap-3"><span className="h-px w-8 bg-secondary" /> ONE SCHOOL. TWO CAMPUSES.</p>
        <h1 className="max-w-xl text-4xl leading-[1.16] sm:text-5xl lg:text-6xl">Greenwood<br />College</h1>
        <p className="mt-5 font-display text-xl sm:text-2xl">A place to learn. A future to shape.</p>
        <p className="mt-5 max-w-md text-base leading-7 text-hero-muted">Nurturing curious minds, confident individuals, and the leaders of tomorrow. Find your place in our school community.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Button asChild variant="hero" size="lg"><Link to="/campuses">Explore our campuses <ArrowRight /></Link></Button><Button asChild variant="heroOutline" size="lg"><Link to="/about">Discover Greenwood</Link></Button></div>
      </div>
      <div className="absolute bottom-6 right-8 hidden items-center gap-2 text-xs text-hero-foreground md:flex"><MapPin size={14} /> Two campuses. One shared vision.</div>
    </section>
    <section className="border-b border-border bg-background"><div className="site-width grid gap-7 py-8 md:grid-cols-3">{[{ icon: BookOpen, title: 'Learning with purpose', text: 'Curiosity today. Possibility tomorrow.' }, { icon: HeartHandshake, title: 'Character at our core', text: 'Respect, integrity, and a sense of belonging.' }, { icon: Sprout, title: 'Every student, growing', text: 'Space to discover your own potential.' }].map(({ icon: Icon, title, text }) => <div key={title} className="flex items-center gap-4"><Icon size={30} strokeWidth={1.4} className="shrink-0 text-primary" /><div><p className="font-display text-base font-medium">{title}</p><p className="mt-1 text-xs text-muted-foreground">{text}</p></div></div>)}</div></section>
    <section className="py-16 md:py-20"><div className="site-width"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow text-primary">FIND YOUR PLACE</p><h2 className="mt-3 text-3xl md:text-4xl">Two campuses. One Greenwood.</h2></div><p className="max-w-md text-sm leading-6 text-muted-foreground">Different settings, the same commitment to a thoughtful education. Explore the community that feels right for you.</p></div><div className="mt-9 grid gap-8 md:grid-cols-2">{campuses.map((campus, i) => <article key={campus.slug} className="group overflow-hidden rounded-md border border-border bg-card"><Link to="/campuses/$campus" params={{ campus: campus.slug }} className="block overflow-hidden"><img src={campus.image} width={1024} height={768} loading="lazy" alt={`${campus.name} school buildings and grounds`} className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105" /></Link><div className="p-6"><p className="eyebrow text-muted-foreground">CAMPUS 0{i + 1}</p><div className="mt-2 flex items-center justify-between gap-4"><h3 className="text-2xl">{campus.name}</h3><Button asChild variant="outline" size="icon"><Link to="/campuses/$campus" params={{ campus: campus.slug }} aria-label={`Explore ${campus.name}`}><ArrowRight /></Link></Button></div><p className="mt-2 text-sm text-muted-foreground">{campus.setting}</p></div></article>)}</div></div></section>
    <section className="bg-muted py-16"><div className="site-width grid items-center gap-8 md:grid-cols-2"><div><p className="eyebrow text-primary">MORE THAN A CLASSROOM</p><h2 className="mt-4 text-3xl leading-snug md:text-4xl">An education for life,<br />not just examinations.</h2></div><div><p className="text-base leading-7 text-muted-foreground">We believe a great education opens minds and builds character. Through learning, creativity, sport, and service, students discover who they are — and who they can become.</p><Button asChild variant="link" className="mt-4 px-0"><Link to="/academics">Our approach to learning <ArrowRight /></Link></Button></div></div></section>
    <section className="py-16"><div className="site-width flex flex-col items-start justify-between gap-7 md:flex-row md:items-center"><div><p className="eyebrow text-primary">YOUR NEXT CHAPTER</p><h2 className="mt-3 text-3xl">A warm welcome awaits.</h2><p className="mt-3 text-sm text-muted-foreground">Take the first step towards becoming part of Greenwood.</p></div><Button asChild size="lg"><Link to="/admissions">Explore admissions <ArrowRight /></Link></Button></div></section>
  </>;
}
