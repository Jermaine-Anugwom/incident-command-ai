"use client";

import { useEffect, useMemo, useState } from "react";

type Scenario = "nominal" | "contradiction" | "injection" | "outage";
type EvidenceItem = { id: string; source: string; time: string; text: string; kind: "OBSERVATION" | "INFERENCE"; tone?: "alert" | "caution" };

const signalEvidence: EvidenceItem[] = [
  { id: "EV-01", source: "INC-1047", time: "14:06", text: "Login failure rate reached 37%", kind: "OBSERVATION" },
  { id: "EV-01A", source: "MON-3344", time: "14:03", text: "Baseline authentication comparison", kind: "INFERENCE" },
  { id: "EV-01B", source: "MON-3344", time: "14:03", text: "Five-percent threshold exceeded", kind: "INFERENCE" },
  { id: "EV-01C", source: "MON-3344", time: "14:04", text: "Multiple regions affected", kind: "INFERENCE" },
];

const impactEvidence: EvidenceItem[] = [
  { id: "EV-02", source: "APM-7721", time: "14:05", text: "Authentication failures confirmed", kind: "OBSERVATION" },
  { id: "EV-02A", source: "APM-7721", time: "14:06", text: "Elevated failures across regions", kind: "INFERENCE" },
  { id: "EV-02B", source: "CI-AUTH-07", time: "14:06", text: "Citizen portal services affected", kind: "INFERENCE" },
  { id: "EV-03", source: "CHG-0284", time: "14:09", text: "Errors correlate with route change", kind: "INFERENCE", tone: "alert" },
];

const recoveryEvidence: EvidenceItem[] = [
  { id: "EV-04", source: "ROL-5512", time: "14:14", text: "Rollback plan drafted for CHG-0284", kind: "OBSERVATION" },
  { id: "EV-04A", source: "ROL-5512", time: "14:15", text: "Rollback validated in staging", kind: "INFERENCE" },
  { id: "EV-04B", source: "ROL-5512", time: "14:15", text: "Estimated recovery: five checks", kind: "INFERENCE" },
  { id: "EV-04C", source: "ROL-5512", time: "14:16", text: "Proposed route weights: 50/50", kind: "INFERENCE", tone: "caution" },
];

const allEvidence = [...signalEvidence, ...impactEvidence, ...recoveryEvidence];

const scenarioCopy: Record<Scenario, { state: string; detail: string; tone: string }> = {
  nominal: { state: "EVIDENCE LOCKED", detail: "12 sources · 0 contradictions", tone: "ready" },
  contradiction: { state: "MANUAL REVIEW", detail: "1 unresolved contradiction", tone: "caution" },
  injection: { state: "INPUT QUARANTINED", detail: "Policy-manipulation pattern detected", tone: "danger" },
  outage: { state: "OFFLINE MODE", detail: "ServiceNow transport unavailable", tone: "neutral" },
};

function formatDuration(elapsed: number) {
  const seconds = elapsed % 60;
  const minutes = Math.floor(elapsed / 60) % 60;
  const hours = Math.floor(elapsed / 3600);
  return [hours, minutes, seconds].map((value) => value.toString().padStart(2, "0")).join(":");
}

function CommandClock({ elapsed }: { elapsed: number }) {
  const seconds = elapsed % 60;
  const minutes = Math.floor(elapsed / 60) % 60;
  const localHour = 14;
  const hourAngle = ((localHour % 12) + minutes / 60) * 30;
  const minuteAngle = (minutes + seconds / 60) * 6;
  const labels = ["00", "02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22"];

  return (
    <section className="clock-panel" aria-labelledby="incident-time-heading">
      <div className="clock-heading"><h2 id="incident-time-heading">Command clock</h2><span>LIVE</span></div>
      <div className="clock-face" aria-hidden="true">
        <span className="clock-arc" />
        {labels.map((label, index) => {
          const angle = index * 30;
          const radius = 39;
          const x = 50 + radius * Math.sin((angle * Math.PI) / 180);
          const y = 50 - radius * Math.cos((angle * Math.PI) / 180);
          return <b className="clock-number" key={label} style={{ left: `${x}%`, top: `${y}%` }}>{label}</b>;
        })}
        <i className="clock-hand hour" style={{ transform: `rotate(${hourAngle}deg)` }} />
        <i className="clock-hand minute" style={{ transform: `rotate(${minuteAngle}deg)` }} />
        <span className="clock-hub" />
        <strong className="local-time">14:{minutes.toString().padStart(2, "0")}</strong>
        <small>LOCAL TIME</small>
      </div>
      <output className="digital-time">{formatDuration(elapsed)}</output>
      <p>Command opened 14:06 Central</p>
    </section>
  );
}

function EvidenceTag({ item, active, onSelect }: { item: EvidenceItem; active: boolean; onSelect: () => void }) {
  return (
    <button className={`evidence-tag ${item.kind.toLowerCase()} ${item.tone ?? ""}${active ? " is-active" : ""}`} onClick={onSelect} aria-pressed={active}>
      <span className="tag-rail"><b>{item.id}</b><span className="synthetic-chip">SYNTHETIC</span></span>
      <strong>{item.text}</strong>
      <span className="tag-foot"><span>{item.source}</span><time>{item.time}</time></span>
      <span className="tag-kind">{item.kind}</span>
    </button>
  );
}

function SectorLabel({ id, title, subtitle }: { id: string; title: string; subtitle: string }) {
  return <header className="sector-title"><h2 id={id}>{title}</h2><p>{subtitle}</p></header>;
}

function EvidenceFlow({ records, selected, setSelected }: { records: EvidenceItem[]; selected: string; setSelected: (id: string) => void }) {
  return (
    <div className="evidence-flow">
      {records.map((item, index) => (
        <div className="flow-step" key={item.id}>
          <EvidenceTag item={item} active={selected === item.id} onSelect={() => setSelected(item.id)} />
          {index < records.length - 1 && <svg viewBox="0 0 44 20" aria-hidden="true"><path d="M2 10h35M30 4l8 6-8 6" /></svg>}
        </div>
      ))}
    </div>
  );
}

function ActionGate({ approval, scenario }: { approval: "pending" | "approved" | "rejected"; scenario: Scenario }) {
  const authorized = scenario === "nominal" && approval === "approved";
  return (
    <aside className={`action-gate ${authorized ? "open" : ""}`}>
      <div className="gate-proof"><span>Unsupported claims</span><strong>0</strong></div>
      <svg viewBox="0 0 40 48" aria-hidden="true"><rect x="6" y="21" width="28" height="22" rx="2" /><path d="M12 21v-7a8 8 0 0 1 16 0v7" /></svg>
      <h2>Action gate</h2>
      <strong>{authorized ? "SYNTHETIC AUTHORIZED" : approval === "rejected" ? "PLAN REJECTED" : "EXECUTION DISABLED"}</strong>
      <p>{authorized ? "Approval fingerprint matches. The public companion records the decision without writing to ServiceNow." : "Approval required to authorize this exact action."}</p>
      <dl>
        <div><dt>Plan</dt><dd>Rollback</dd></div><div><dt>Target change</dt><dd>CHG-0284</dd></div><div><dt>Risk</dt><dd>Low</dd></div><div><dt>Rollback window</dt><dd>60 minutes</dd></div><div><dt>Recovery check</dt><dd>5 samples</dd></div>
      </dl>
      <button aria-label="ServiceNow execution is disabled in the public demonstration" disabled>ServiceNow write disabled</button>
      {authorized && <div className="authorization-trace"><b>APR-PLAN-INC-1047</b><span>AUTHORIZED · NO WRITE</span><small>14:23 · synthetic commander</small></div>}
      <small>Real PDI execution exists only behind the scoped app and an authorized executor.</small>
    </aside>
  );
}

export default function CommandBoard() {
  const [elapsed, setElapsed] = useState(18 * 60 + 42);
  const [selected, setSelected] = useState("EV-02");
  const [scenario, setScenario] = useState<Scenario>("nominal");
  const [approval, setApproval] = useState<"pending" | "approved" | "rejected">("pending");
  const status = scenarioCopy[scenario];
  const activeEvidence = useMemo(() => allEvidence.find((item) => item.id === selected) ?? allEvidence[0], [selected]);

  useEffect(() => {
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <main>
      <a className="skip-link" href="#sectors">Skip to evidence sectors</a>
      <header className="command-header">
        <div className="brand-lockup"><svg viewBox="0 0 42 42" aria-hidden="true"><path d="M4 21h9l5-12 7 24 5-12h8" /></svg><div><strong>Incident Command AI</strong><span>Operator war room</span></div></div>
        <div className="header-timer"><span>INCIDENT TIME</span><output>{formatDuration(elapsed)}</output></div>
        <div className="header-status"><span className="evidence-lock">EVIDENCE LOCKED</span><span className="approval-lock">APPROVAL REQUIRED</span></div>
        <div className="severity"><b>SEV-1</b><span>INC-1047</span></div>
      </header>
      <div className="synthetic-banner">SYNTHETIC DEMONSTRATION · NO PRODUCTION SYSTEMS OR CUSTOMER DATA</div>

      <div className="command-layout">
        <aside className="command-tower" aria-label="Incident command tower">
          <CommandClock elapsed={elapsed} />
          <section className="identity-block"><span>Incident identity · synthetic</span><h1>Citizen portal authentication degradation</h1><dl><div><dt>Service</dt><dd>Citizen Services Portal</dd></div><div><dt>Commander</dt><dd>M. Rivera</dd></div><div><dt>Opened</dt><dd>Sep 01 · 14:06 CT</dd></div></dl></section>
          <section className="objectives"><h2>Incident objectives</h2><ol><li><span>01</span>Protect payment integrity</li><li><span>02</span>Restore authentication</li><li><span>03</span>Preserve evidence trail</li></ol></section>
          <section className="scenario-controls" aria-labelledby="failure-heading"><h2 id="failure-heading">Failure injection</h2><label htmlFor="scenario">Demonstrate a guarded state</label><select id="scenario" aria-label="Demonstrate a guarded state" value={scenario} onChange={(event) => { setScenario(event.target.value as Scenario); setApproval("pending"); }}><option value="nominal">Nominal evidence</option><option value="contradiction">Contradictory note</option><option value="injection">Prompt injection</option><option value="outage">ServiceNow outage</option></select></section>
        </aside>

        <section id="sectors" className="sectors" aria-label="Evidence command sectors">
          <div className={`readiness-strip ${status.tone}`} role="status" aria-live="polite"><strong>{status.state}</strong><span>{status.detail}</span><span>Selected: {activeEvidence.id} · {activeEvidence.kind}</span></div>
          <div className="sector-board">
            <section className="sector signals-sector" aria-labelledby="signals-heading"><SectorLabel id="signals-heading" title="Signals" subtitle="What we're seeing" /><div className="sector-content"><EvidenceFlow records={signalEvidence} selected={selected} setSelected={setSelected} /></div></section>
            <section className="sector impact-sector" aria-labelledby="impact-heading"><SectorLabel id="impact-heading" title="Impact" subtitle="What's affected" /><div className="sector-content"><EvidenceFlow records={impactEvidence} selected={selected} setSelected={setSelected} /><div className="dependency-map" aria-label="Synthetic service dependency map"><strong>Dependency map</strong><div className="dependency-row"><span>Citizen portal</span><b>→</b><span>Identity gateway</span><b>→</b><span>Permit service</span><b>→</b><span>Payments</span></div><div className="change-node">CHG-0284 · ROUTE WEIGHT DEPLOYMENT</div></div></div></section>
            <section className="sector recovery-sector" aria-labelledby="recovery-heading"><SectorLabel id="recovery-heading" title="Recovery" subtitle="What we can do" /><div className="sector-content"><EvidenceFlow records={recoveryEvidence} selected={selected} setSelected={setSelected} /><div className="approval-actions"><p><strong>Exact action:</strong> request rollback of CHG-0284 to 50/50 route weights. Stop if failure rate does not decline within five synthetic checks.</p><button className="reject" onClick={() => setApproval("rejected")}>Reject plan</button><button className="approve" onClick={() => setApproval("approved")} disabled={scenario !== "nominal"}>Approve exact action</button></div></div></section>
            <ActionGate approval={approval} scenario={scenario} />
          </div>
          <footer className="audit-strip">
            <section className="assigned-units" aria-labelledby="units-heading"><h2 id="units-heading">Assigned units</h2><ul><li><b>IC</b><span>Incident Commander</span><strong>Assigned</strong></li><li><b>NET</b><span>Network</span><strong>Monitoring</strong></li><li><b>SRE</b><span>Site Reliability</span><strong>2 on duty</strong></li></ul></section>
            <section className="audit-log" aria-labelledby="audit-heading"><h2 id="audit-heading">Immutable audit trace</h2><ol><li><time>14:06:11</time><b>AlertManager</b><span>Incident admitted</span><code>EV-01</code><strong>OBSERVATION</strong></li><li><time>14:19:27</time><b>Evidence Locker</b><span>Context fingerprinted</span><code>EV-02</code><strong>LOCKED</strong></li><li><time>14:22:03</time><b>Planner</b><span>Recovery plan generated</span><code>EV-04</code><strong>INFERENCE</strong></li></ol></section>
            <div className="trace-hash"><span>Input fingerprint</span><code>9f28…4b71</code><small>Evidence 12 / 12</small></div>
          </footer>
        </section>
      </div>
    </main>
  );
}
