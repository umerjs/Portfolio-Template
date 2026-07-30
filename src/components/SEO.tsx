import { useEffect } from 'react';
import { personalInfo, socialLinks, seo } from '../data/data';

const SITE_TITLE = seo.title;
const SITE_DESCRIPTION = seo.description;
const SITE_URL = seo.url;
const SITE_IMAGE = personalInfo.avatarUrl;

export default function SEO() {
  useEffect(() => {
    document.title = SITE_TITLE;

    const metas: Record<string, string> = {
      description: SITE_DESCRIPTION,
      author: 'Muhammad Umer',
      robots: 'index, follow, max-image-preview:large, max-snippet:-1',
      'theme-color': '#0a0f16',

      // Open Graph
      'og:type': 'website',
      'og:title': SITE_TITLE,
      'og:description': SITE_DESCRIPTION,
      'og:image': SITE_IMAGE,
      'og:url': SITE_URL,
      'og:site_name': seo.siteName,
      'og:locale': 'en_US',

      // Twitter
      'twitter:card': 'summary_large_image',
      'twitter:title': SITE_TITLE,
      'twitter:description': SITE_DESCRIPTION,
      'twitter:image': SITE_IMAGE,
    };

    const addedElements: HTMLElement[] = [];

    Object.entries(metas).forEach(([name, content]) => {
      const isOg = name.startsWith('og:');
      const isTwitter = name.startsWith('twitter:');
      const attr = isOg || isTwitter ? 'property' : 'name';

      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
        addedElements.push(el);
      }
      el.content = content;
    });

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
      addedElements.push(canonical);
    }
    canonical.href = SITE_URL;

    // JSON-LD Structured Data (Person + WebSite)
    const jsonLd = document.createElement('script');
    jsonLd.type = 'application/ld+json';
    jsonLd.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': `${SITE_URL}/#person`,
          name: personalInfo.name,
          url: SITE_URL,
          image: SITE_IMAGE,
          jobTitle: personalInfo.role,
          worksFor: { '@type': 'Organization', name: 'Freelance' },
          address: { '@type': 'PostalAddress', addressLocality: personalInfo.location, addressCountry: 'PK' },
          email: personalInfo.email,
          sameAs: [
            socialLinks.github,
            socialLinks.linkedin,
          ],
          knowsAbout: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Express.js', 'Next.js', 'Tailwind CSS', 'PostgreSQL', 'GraphQL', 'REST APIs', 'Full-Stack Development', 'Web Development'],
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: 'UMER.DEV',
          description: SITE_DESCRIPTION,
          author: { '@id': `${SITE_URL}/#person` },
        },
        {
          '@type': 'ProfilePage',
          '@id': `${SITE_URL}/#profilepage`,
          url: SITE_URL,
          name: SITE_TITLE,
          isPartOf: { '@id': `${SITE_URL}/#website` },
          about: { '@id': `${SITE_URL}/#person` },
          description: SITE_DESCRIPTION,
        },
      ],
    });
    document.head.appendChild(jsonLd);
    addedElements.push(jsonLd);

    return () => {
      addedElements.forEach(el => el.remove());
    };
  }, []);

  return null;
}
