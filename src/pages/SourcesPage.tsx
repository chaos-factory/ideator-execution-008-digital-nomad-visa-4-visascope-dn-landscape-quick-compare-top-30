function SourcesPage() {
  const sources = [
    { country: 'Portugal', url: 'https://www.vistos.mne.gov.pt', name: 'Ministry of Foreign Affairs' },
    { country: 'Spain', url: 'https://www.inclusion.gob.es', name: 'Ministry of Inclusion' },
    { country: 'Estonia', url: 'https://www.politsei.ee', name: 'Police and Border Guard Board' },
    { country: 'Croatia', url: 'https://mup.gov.hr', name: 'Ministry of Interior' },
    { country: 'Greece', url: 'https://migration.gov.gr', name: 'Migration & Asylum Ministry' },
    { country: 'Italy', url: 'https://vistoperitalia.esteri.it', name: 'Ministry of Foreign Affairs' },
    { country: 'Malta', url: 'https://nomad.residencymalta.gov.mt', name: 'Residency Malta Agency' },
    { country: 'Czech Republic', url: 'https://www.mvcr.cz', name: 'Ministry of Interior' },
    { country: 'Iceland', url: 'https://www.utl.is', name: 'Directorate of Immigration' },
    { country: 'Norway', url: 'https://www.udi.no', name: 'Norwegian Directorate of Immigration' },
    { country: 'Romania', url: 'https://igi.mai.gov.ro', name: 'General Inspectorate for Immigration' },
    { country: 'Hungary', url: 'https://whitecard.gov.hu', name: 'White Card Programme' },
    { country: 'UAE', url: 'https://www.dubailand.gov.ae', name: 'Dubai Government' },
    { country: 'Thailand', url: 'https://ltr.boi.go.th', name: 'Board of Investment' },
    { country: 'Indonesia', url: 'https://www.imigrasi.go.id', name: 'Directorate General of Immigration' },
  ];

  return (
    <div className="page-container">
      <h1>Official Sources</h1>
      
      <section className="content-section">
        <p>
          All program information is sourced from official government websites. 
          We recommend visiting these sources directly for the most up-to-date 
          requirements and application procedures.
        </p>
      </section>

      <section className="content-section">
        <h2>Government Resources</h2>
        <ul className="sources-list">
          {sources.map((source, index) => (
            <li key={index}>
              <strong>{source.country}</strong> – {source.name}
              <br />
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                {source.url}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="content-section">
        <h2>Verification Schedule</h2>
        <p>
          We verify all program details monthly. Each entry in our comparison table 
          includes the date of last verification. If you notice outdated information, 
          please contact us.
        </p>
      </section>
    </div>
  );
}

export default SourcesPage;
