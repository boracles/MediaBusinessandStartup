import { useMemo, useState } from "react";

const ASSET = "/assets/week3";

const terms = {
  Project: {
    meta: "ONE COMPLETED WORK",
    definition: "A work completed for a particular place, client or event.",
    example: "A light installation commissioned for one cultural venue.",
    question: "Ask: What was made this time?",
  },
  Technology: {
    meta: "TOOLS AND COMPONENTS",
    definition: "A tool or technical component used to produce an experience.",
    example: "Projection mapping, motion tracking or generative AI.",
    question: "Ask: What was used to make it work?",
  },
  Capability: {
    meta: "WHAT THE TEAM CAN REPEAT",
    definition: "A creative or production ability the studio can reliably use again.",
    example: "Designing interactive experiences for public space.",
    question: "Ask: What can this team do for another project?",
  },
  "Key item": {
    meta: "WHAT A CUSTOMER RECEIVES",
    definition: "A concrete product, service, content format, platform or repeatable experience.",
    example: "A site-specific interactive media installation package for museums.",
    question: "Ask: What can someone commission, purchase or use?",
  },
};

const revealItems = [
  ["01 · PROJECT", "Light Barrier Third Edition"],
  ["02 · CUSTOMER / COMMISSIONER", "Asia Culture Center"],
  ["03 · USER / AUDIENCE", "Exhibition visitors"],
  ["04 · TECHNOLOGY", "Projection, concave mirrors, haze, spatial calibration"],
  ["05 · CAPABILITY", "Designing large-scale spatial experiences with light"],
  ["06 · DELIVERABLE", "Concept, media content, system design and installation"],
  ["07 · POSSIBLE KEY ITEM", "A custom spatial-light installation for cultural venues"],
];

const referenceCards = [
  ["reference-card-wide", "https://www.teamlab.art/e/kyoto/", "teamlab-biovortex-kyoto.avif", "teamLab Biovortex Kyoto immersive digital installation", "PERMANENT VENUE", "teamLab Biovortex Kyoto", "Look for: a museum-scale format, spatial system and ongoing visitor experience."],
  ["", "https://www.teamlab.art/e/phenomena/", "teamlab-phenomena-abu-dhabi.avif", "teamLab Phenomena Abu Dhabi immersive artwork", "IMMERSIVE ENVIRONMENT", "teamLab Phenomena Abu Dhabi", "Look for: content, sensing, space and operations working as one deliverable."],
  ["", "https://www.teamlab.art/e/tokyo/", "teamlab-borderless-tokyo.avif", "teamLab Borderless Tokyo digital art museum", "MUSEUM EXPERIENCE", "teamLab Borderless Tokyo", "Look for: a repeatable visitor journey rather than one isolated visual effect."],
  ["", "https://www.teamlab.art/e/planets/", "teamlab-planets-tokyo.avif", "teamLab Planets Tokyo body-immersive installation", "BODY-IMMERSIVE EXPERIENCE", "teamLab Planets Tokyo", "Look for: how the audience moves, touches and becomes part of the work."],
  ["reference-card-wide", "https://www.teamlab.art/e/jeddah/", "teamlab-borderless-jeddah.avif", "teamLab Borderless Jeddah immersive digital environment", "LOCALIZED FORMAT", "teamLab Borderless Jeddah", "Look for: which parts of a studio format remain consistent in another city and context."],
];

function CompleteButton({ index, completed, onToggle, children, className = "" }) {
  return <button className={`complete-button${completed ? " completed" : ""}${className ? ` ${className}` : ""}`} type="button" onClick={() => onToggle(index)}>{completed ? "✓ " : ""}{children}</button>;
}

function SectionHeading({ number, eyebrow, title, copy }) {
  return (
    <header className="section-heading">
      <span className="section-number">{number}</span>
      <div>{eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}<h2>{title}</h2><p>{copy}</p></div>
    </header>
  );
}

function CandidateCard({ label }) {
  const [scores, setScores] = useState([3, 3, 3, 3, 3]);
  const scoreLabels = ["Specific", "Clear customer", "Meaningful value", "Feasible", "Original"];
  const total = scores.reduce((sum, value) => sum + value, 0);
  return (
    <article className="candidate-card">
      <label>{label}<input type="text" placeholder="Name the item" /></label>
      {scoreLabels.map((scoreLabel, index) => (
        <label className="score-control" key={scoreLabel}>
          <span>{scoreLabel}</span>
          <input type="range" min="1" max="5" value={scores[index]} aria-label={`${label} ${scoreLabel}`} onChange={(event) => {
            const next = [...scores];
            next[index] = Number(event.target.value);
            setScores(next);
          }} />
        </label>
      ))}
      <div className="candidate-total"><span>Total</span><strong>{total}</strong><small>/ 25</small></div>
    </article>
  );
}

export function Week3() {
  const [activeTerm, setActiveTerm] = useState("Project");
  const [revealed, setRevealed] = useState(() => new Set());
  const [completed, setCompleted] = useState(() => new Set());
  const [fields, setFields] = useState({ customer: "", deliverable: "", context: "", value: "", capability: "" });
  const [copyStatus, setCopyStatus] = useState("");
  const term = terms[activeTerm];
  const statement = useMemo(() => `For ${fields.customer || "[customer]"}, we create ${fields.deliverable || "[deliverable]"} for ${fields.context || "[context]"}, enabling ${fields.value || "[value]"} through ${fields.capability || "[capability]"}.`, [fields]);

  function toggleSet(setter, index) {
    setter((current) => {
      const next = new Set(current);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  }

  async function copyStatement() {
    try {
      await navigator.clipboard.writeText(statement);
      setCopyStatus("Copied to clipboard");
    } catch {
      setCopyStatus("Select and copy the sentence above");
    }
    window.setTimeout(() => setCopyStatus(""), 1800);
  }

  return (
    <div data-week="3">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Key Item Studio Lab home"><span className="brand-mark">K</span><span>KEY ITEM LAB</span></a>
        <span className="course-label">MEDIA BUSINESS &amp; START-UP · WEEK 3</span>
        <div className="progress-wrap" aria-label="Workshop progress"><span>{completed.size} / 6</span><div className="progress-track"><span style={{ width: `${(completed.size / 6) * 100}%` }} /></div></div>
      </header>

      <main id="top">
        <section className="opening section-shell">
          <div className="opening-copy"><p className="eyebrow">TODAY'S QUESTION</p><h1 id="opening-title">What can your studio offer <em>again?</em></h1><p className="lead">A successful project is not automatically a business item. Today your team will turn inspiring projects into one concrete offer for a defined customer.</p></div>
          <div className="opening-map" aria-label="Lesson flow"><div className="map-card project">PROJECT<span>one completed work</span></div><div className="map-card capability">CAPABILITY<span>what we can repeat</span></div><div className="map-card item">KEY ITEM<span>what a customer receives</span></div></div>
        </section>

        <section className="visual-reference-section section-shell" aria-labelledby="reference-title">
          <div className="visual-reference-heading"><div><p className="eyebrow">VISUAL REFERENCE BOARD</p><h2 id="reference-title">Read the business clue inside the image.</h2></div><p>Do not stop at “this looks beautiful.” Ask what the studio delivered, who commissioned it, what the audience experienced and which capability can be offered again.</p></div>
          <div className="reference-gallery">
            {referenceCards.map(([wide, href, image, alt, label, title, copy]) => <a className={`reference-card ${wide}`} href={href} target="_blank" rel="noreferrer" key={title}><img src={`${ASSET}/${image}`} alt={alt} /><div className="reference-caption"><span>{label}</span><strong>{title}</strong><p>{copy}</p></div></a>)}
          </div>
          <div className="visual-prompt-strip" aria-label="Questions for reading visual references">{["What was delivered?", "Who paid for it?", "What can be repeated?", "What would you call the item?"].map((question, index) => <div key={question}><span>0{index + 1}</span><strong>{question}</strong></div>)}</div>
        </section>

        <section className="lesson-section section-shell" id="four-things">
          <SectionHeading number="01" title="Four different things" copy="Click each term. If you mix these up, the team mission will become vague." />
          <div className="term-lab">
            <div className="term-display" id="termDisplay"><span className="term-meta">{term.meta}</span><h3>{activeTerm}</h3><p className="term-definition">{term.definition}</p><p className="term-example"><span>EXAMPLE</span>{term.example}</p><p className="term-question">{term.question}</p></div>
            <div className="term-tabs" role="tablist" aria-label="Key item concepts">{Object.keys(terms).map((name) => <button key={name} className={`term-tab${activeTerm === name ? " active" : ""}`} role="tab" aria-selected={activeTerm === name} type="button" onClick={() => setActiveTerm(name)}>{name}</button>)}</div>
          </div>
          <CompleteButton index={0} completed={completed.has(0)} onToggle={(index) => toggleSet(setCompleted, index)}>I understand the four terms</CompleteButton>
        </section>

        <section className="lesson-section dark-panel" id="case-study">
          <SectionHeading number="02" title="Break one project apart" copy="Use the project as evidence. Do not copy its visual surface." />
          <div className="case-layout">
            <div className="case-visuals"><figure className="case-main-image"><img src={`${ASSET}/light-barrier-main.jpeg`} alt="Light Barrier Third Edition spatial light installation by Kimchi and Chips" /><figcaption>Kimchi and Chips · Light Barrier Third Edition</figcaption></figure><div className="process-grid"><figure><img src={`${ASSET}/light-barrier-fabrication.jpeg`} alt="Metal fabrication process for Light Barrier" /><figcaption>Fabrication</figcaption></figure><figure><img src={`${ASSET}/light-barrier-mirror-cutting.jpeg`} alt="Mirror cutting process for Light Barrier" /><figcaption>Specialized method</figcaption></figure></div></div>
            <div className="deconstruction" aria-label="Light Barrier project breakdown">{revealItems.map(([label, answer], index) => <button type="button" className={`reveal-row${revealed.has(index) ? " revealed" : ""}${index === revealItems.length - 1 ? " accent-row" : ""}`} onClick={() => toggleSet(setRevealed, index)} key={label}><span>{label}</span><strong>{answer}</strong></button>)}<p className="tap-note">Tap each row to reveal the answer.</p></div>
          </div>
          <CompleteButton index={1} completed={completed.has(1)} onToggle={(index) => toggleSet(setCompleted, index)}>I can separate the project from the item</CompleteButton>
        </section>

        <section className="lesson-section color-panel" id="customer-user">
          <SectionHeading number="03" title="The customer is not always the user" copy="Media studios often design for one group and sell to another." />
          <div className="relationship-board"><article className="actor-card customer-card"><p className="eyebrow">WHO PAYS OR COMMISSIONS?</p><h3>Customer</h3><p>Museum or cultural foundation</p><ul><li>Needs a distinctive exhibition</li><li>Controls budget and venue</li><li>Evaluates public value and feasibility</li></ul></article><div className="relationship-center"><span>COMMISSIONS</span><strong>Interactive media installation</strong><span>EXPERIENCES</span></div><article className="actor-card user-card"><p className="eyebrow">WHO EXPERIENCES IT?</p><h3>User</h3><p>Exhibition visitor</p><ul><li>Wants an engaging experience</li><li>Interacts with the installation</li><li>Creates attendance and word of mouth</li></ul></article></div>
          <div className="key-insight"><span>KEY INSIGHT</span> Your item must create value for the <strong>audience</strong> and <strong>give</strong> the commissioner a reason to fund it.</div>
          <CompleteButton index={2} completed={completed.has(2)} onToggle={(index) => toggleSet(setCompleted, index)}>I can identify both sides</CompleteButton>
        </section>

        <section className="lesson-section section-shell" id="specificity">
          <SectionHeading number="04" title="Move from a field to an offer" copy="A key item lets someone imagine what they will receive." />
          <div className="comparison-list">{[["AI media-art studio", "Interactive AI portrait installations for museum special exhibitions"], ["XR content company", "Room-scale XR safety simulations for university laboratories"], ["Projection mapping", "Architectural projection-content packages for regional night festivals"]].map(([weak, strong]) => <div className="comparison-row" key={weak}><div className="weak-side"><span>TOO BROAD</span><strong>{weak}</strong></div><div className="transform-arrow">↓</div><div className="strong-side"><span>KEY ITEM</span><strong>{strong}</strong></div></div>)}</div>
          <div className="test-strip"><span>THE QUICK TEST</span><p>Can you point to the <strong>customer</strong>, the <strong>deliverable</strong>, the <strong>context</strong> and the <strong>value</strong>?</p></div>
          <CompleteButton index={3} completed={completed.has(3)} onToggle={(index) => toggleSet(setCompleted, index)}>I can recognize a specific item</CompleteButton>
        </section>

        <section className="lesson-section dark-panel" id="builder">
          <SectionHeading number="05" title="Build one clear key-item sentence" copy="Use this before your team starts generating candidates." />
          <div className="builder-layout"><form className="sentence-form" onSubmit={(event) => event.preventDefault()}>{[["customer", "Customer"], ["deliverable", "Concrete deliverable"], ["context", "Use context"], ["value", "Value or experience"], ["capability", "Repeatable capability"]].map(([key, label]) => <label key={key}><span>{label}</span><input id={`${key}Input`} aria-label={label} value={fields[key]} onChange={(event) => setFields({ ...fields, [key]: event.target.value })} /></label>)}</form><div className="sentence-output"><p className="eyebrow">YOUR KEY ITEM STATEMENT</p><blockquote id="sentencePreview">For <mark>{fields.customer || "[customer]"}</mark>, we create <mark>{fields.deliverable || "[deliverable]"}</mark> for <mark>{fields.context || "[context]"}</mark>, enabling <mark>{fields.value || "[value]"}</mark> through <mark>{fields.capability || "[capability]"}</mark>.</blockquote><button type="button" id="copySentence" onClick={copyStatement}>Copy sentence</button><span id="copyStatus" aria-live="polite">{copyStatus}</span></div></div>
          <div className="scope-ladder"><div><span>VISION</span><strong>An entire immersive media museum</strong></div><span className="ladder-arrow">↓</span><div><span>KEY ITEM</span><strong>A motion-responsive media installation module</strong></div><span className="ladder-arrow">↓</span><div><span>FIRST TEST</span><strong>One projected wall that responds to one visitor</strong></div></div>
          <CompleteButton index={4} completed={completed.has(4)} onToggle={(index) => toggleSet(setCompleted, index)}>Our first version can be small</CompleteButton>
        </section>

        <section className="lesson-section mission-panel" id="team-mission">
          <SectionHeading number="06" eyebrow="TEAM MISSION" title="Choose one item worth developing" copy="Do not choose the first idea. Compare three candidates and record why one wins." />
          <div className="mission-steps"><article><span>1</span><h3>Pool references</h3><p>Each member adds one project image and one repeatable capability.</p></article><article><span>2</span><h3>Create three items</h3><p>Write three genuinely different customer-facing offers.</p></article><article><span>3</span><h3>Score together</h3><p>Compare specificity, customer, value, feasibility and originality.</p></article><article><span>4</span><h3>Select and pitch</h3><p>Choose one item, explain the decision and define the first test.</p></article></div>
          <div className="candidate-lab"><div className="candidate-header"><div><p className="eyebrow">QUICK COMPARISON</p><h3>Score three candidates</h3></div><p>1 = weak · 5 = strong</p></div><div className="candidate-grid"><CandidateCard label="Candidate A" /><CandidateCard label="Candidate B" /><CandidateCard label="Candidate C" /></div><label className="decision-note">Why did your team make the final choice?<textarea id="decisionReason" rows="4" placeholder="We selected this item because..." /></label></div>
          <div className="mission-actions"><CompleteButton className="mission-complete" index={5} completed={completed.has(5)} onToggle={(index) => toggleSet(setCompleted, index)}>We are ready to build the team board</CompleteButton><a className="figjam-link" href="https://www.figma.com/board/a34eUT0ahEFZeNta1QKzqI/Media-Business-and-Startup?node-id=0-1&t=m3nBwUHpkC4yrQ4K-1" target="_blank" rel="noreferrer">Open the class FigJam <span>↗</span></a></div>
        </section>
      </main>

      <footer><span>KEY ITEM STUDIO LAB</span><span>Instructor · Bora Youn</span><span>Media Business &amp; Start-up</span></footer>
    </div>
  );
}
