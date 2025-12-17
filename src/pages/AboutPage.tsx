function AboutPage() {
  return (
    <div className="page-container">
      <h1>About VisaScope</h1>
      
      <section className="content-section">
        <h2>Methodology</h2>
        <p>
          VisaScope aggregates official digital nomad visa and remote work permit information 
          from government sources worldwide. Our team regularly verifies program details including 
          duration, income requirements, and application processes.
        </p>
      </section>

      <section className="content-section">
        <h2>Scope</h2>
        <p>
          This comparison focuses on the top 30 digital nomad visa programs globally, 
          prioritizing established programs with clear application pathways. We include 
          both dedicated digital nomad visas and relevant long-term residence permits 
          for remote workers.
        </p>
      </section>

      <section className="content-section">
        <h2>Definitions</h2>
        <dl>
          <dt>Duration</dt>
          <dd>Initial visa validity period in months.</dd>
          
          <dt>Renewable</dt>
          <dd>Whether the visa can be extended or renewed after initial period.</dd>
          
          <dt>Min Income</dt>
          <dd>Minimum income or savings requirement, shown in original currency.</dd>
          
          <dt>Dependents</dt>
          <dd>Whether family members can be included in the application.</dd>
          
          <dt>Insurance Req</dt>
          <dd>Whether health insurance is mandatory.</dd>
          
          <dt>Application Channel</dt>
          <dd>Primary method for applying (Online, In person, or Hybrid).</dd>
        </dl>
      </section>

      <section className="content-section">
        <h2>Data Freshness</h2>
        <p>
          Each program entry includes an "as of" date indicating when the information was 
          last verified. Visa requirements can change; always check official sources before 
          making travel decisions.
        </p>
      </section>
    </div>
  );
}

export default AboutPage;
