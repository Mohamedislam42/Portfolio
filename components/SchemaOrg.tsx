export function SchemaOrg() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mohamed Islam Elshourbagy',
    alternateName: 'Mohamed Elshourbagy',
    jobTitle: 'Machine Learning Engineer & CS/AI Student',
    description: 'Computer Science & AI student with hands-on experience building intelligent systems, NLP pipelines, and full-stack AI applications.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mohamedelshourbagy.com',
    email: 'mailto:info.moislam@gmail.com',
    sameAs: [
      'https://www.linkedin.com/in/mohamed-islam-292269241/',
      'https://github.com/Mohamedislam42',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Al Alamein International University',
    },
    knowsAbout: ['Machine Learning', 'Deep Learning', 'NLP', 'Python', 'PyTorch', 'Computer Science'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Alexandria',
      addressCountry: 'EG',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
