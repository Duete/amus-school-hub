import cityCampus from '@/assets/city-campus.jpg';
import hillsideCampus from '@/assets/hillside-campus.jpg';

export const campuses = [
  { slug: 'city', name: 'City Campus', setting: 'Connected. Vibrant. Inspiring.', image: cityCampus, description: 'A lively learning community with space to discover, collaborate, and grow. Our city campus brings classroom learning together with the world around us.', features: ['Day school community', 'Science & technology spaces', 'Arts, sport & student clubs'] },
  { slug: 'hillside', name: 'Hillside Campus', setting: 'Room to learn. Space to grow.', image: hillsideCampus, description: 'Surrounded by green hills, our residential campus offers a peaceful place to focus, build lasting friendships, and discover new possibilities.', features: ['Residential school community', 'Open grounds & outdoor learning', 'Pastoral care & student wellbeing'] },
];

export function schoolHead(title: string, description: string) {
  return { meta: [{ title: `${title} | Greenwood College` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} | Greenwood College` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
}