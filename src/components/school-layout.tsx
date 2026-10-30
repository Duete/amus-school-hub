import { Link, useLocation } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowRight, BookOpen, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [{ name: 'Home', to: '/' }, { name: 'Our school', to: '/about' }, { name: 'Our campuses', to: '/campuses' }, { name: 'Academics', to: '/academics' }, { name: 'Admissions', to: '/admissions' }] as const;

export function SchoolHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  return <>
    <div className="bg-primary text-primary-foreground"><div className="site-width flex min-h-9 items-center justify-between gap-3 text-xs"><span>A shared purpose. Two exceptional campuses.</span><Link to="/contact" className="flex items-center gap-2">Get in touch <ArrowRight size={13} /></Link></div></div>
    <header className="border-b border-border bg-background">
      <div className="site-width flex h-24 items-center justify-between gap-6">
        <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="Greenwood College home"><span className="flex h-12 w-11 items-center justify-center rounded-b-xl border-2 border-primary text-primary"><BookOpen size={25} strokeWidth={1.5} /></span><span><span className="block font-display text-xl font-semibold text-primary">GREENWOOD</span><span className="block text-[10px] font-bold text-muted-foreground">COLLEGE · KNOWLEDGE & CHARACTER</span></span></Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">{navigation.map(item => <Link key={item.to} to={item.to} className={`border-b-2 py-3 text-sm font-semibold transition-colors ${location.pathname === item.to ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-primary'}`}>{item.name}</Link>)}</nav>
        <Button asChild className="hidden sm:inline-flex"><Link to="/admissions">Join our school <ArrowRight /></Link></Button>
        <Button className="lg:hidden" variant="ghost" size="icon" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </div>
      {open && <nav aria-label="Mobile navigation" className="site-width flex flex-col gap-1 pb-5" onKeyDown={e => { if (e.key === 'Escape') setOpen(false); }}>{navigation.map(item => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="border-b border-border py-3 text-sm font-semibold">{item.name}</Link>)}<Link to="/contact" onClick={() => setOpen(false)} className="py-3 text-sm font-semibold">Contact us</Link></nav>}
    </header>
  </>;
}

export function SchoolFooter() {
  return <footer className="bg-primary py-12 text-primary-foreground"><div className="site-width"><div className="flex flex-col justify-between gap-8 sm:flex-row"><div><h2 className="text-2xl">Greenwood College</h2><p className="mt-3 text-sm text-primary-foreground/70">One community. Two campuses. Endless possibilities.</p></div><div className="flex flex-wrap gap-6 text-sm"><Link to="/campuses">Our campuses</Link><Link to="/admissions">Admissions</Link><Link to="/contact">Contact us</Link></div></div><div className="mt-9 flex flex-wrap justify-between gap-3 border-t border-primary-foreground/20 pt-5 text-xs text-primary-foreground/60"><span>© {new Date().getFullYear()} Greenwood College</span><span>Illustrative school · Sample names, information and imagery</span></div></div></footer>;
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return <section className="bg-muted py-16 md:py-20"><div className="site-width"><p className="eyebrow text-primary">{eyebrow}</p><h1 className="mt-4 max-w-3xl text-4xl leading-tight md:text-5xl">{title}</h1><div className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">{children}</div></div></section>;
}