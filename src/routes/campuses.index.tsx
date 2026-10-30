import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { PageIntro } from '@/components/school-layout';
import { Button } from '@/components/ui/button';
import { campuses, schoolHead } from '@/lib/school';

export const Route = createFileRoute('/campuses/')({ head: () => schoolHead('Our two campuses', 'Explore the City and Hillside campuses of Greenwood College.'), component: Campuses });
function Campuses() { return <><PageIntro eyebrow="OUR CAMPUSES" title="Two places to belong.">One school community, with two distinct settings for learning and growing.</PageIntro><div className="site-width grid gap-10 py-16 md:grid-cols-2">{campuses.map(campus => <article key={campus.slug}><img src={campus.image} width={1024} height={768} loading="lazy" alt={campus.name} className="aspect-[4/3] w-full rounded-md object-cover" /><h2 className="mt-6 text-3xl">{campus.name}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{campus.description}</p><Button asChild variant="link" className="mt-4 px-0"><Link to="/campuses/$campus" params={{ campus: campus.slug }}>Discover {campus.name} <ArrowRight /></Link></Button></article>)}</div></>; }