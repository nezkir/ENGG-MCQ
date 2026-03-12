import { useState, useEffect, useRef } from "react";

const questions = [
  // ── MECHANICS (15 questions) ──
  { q: "When two equal forces P act at right angles to each other, their resultant is:", opts: ["P", "2P", "√2 P", "P/√2"], ans: 2, topic: "Mechanics" },
  { q: "The angle between two forces for their resultant to be maximum is:", opts: ["180°", "90°", "0°", "45°"], ans: 2, topic: "Mechanics" },
  { q: "The angle between two forces for their resultant to be minimum is:", opts: ["0°", "90°", "180°", "60°"], ans: 2, topic: "Mechanics" },
  { q: "A body is said to be in equilibrium when the algebraic sum of moments of all forces about any point is:", opts: ["Maximum", "Minimum", "Unity", "Zero"], ans: 3, topic: "Mechanics" },
  { q: "Lami's theorem is applicable when a body is in equilibrium under how many concurrent forces?", opts: ["2", "3", "4", "5"], ans: 1, topic: "Mechanics" },
  { q: "The unit of Young's Modulus of Elasticity in the SI system is:", opts: ["N/m", "N/m²", "N·m", "N·m²"], ans: 1, topic: "Mechanics" },
  { q: "Hooke's Law states that stress is proportional to strain within the:", opts: ["Breaking point", "Yield point", "Elastic limit", "Plastic limit"], ans: 2, topic: "Mechanics" },
  { q: "Which of the following statements about Hooke's Law is INCORRECT?", opts: ["Stress is proportional to strain", "It is valid up to elastic limit", "It applies to all ranges of loading", "E = Stress/Strain"], ans: 2, topic: "Mechanics" },
  { q: "The centre of gravity of a semicircle of radius r from its base is located at:", opts: ["r/2", "4r/3π", "3r/4π", "2r/π"], ans: 1, topic: "Mechanics" },
  { q: "The centre of gravity of a quarter circle of radius R from the centre is located at:", opts: ["4R/3π from each axis", "R/2 from each axis", "2R/3π from each axis", "3R/4π from each axis"], ans: 0, topic: "Mechanics" },
  { q: "A pin (hinged) support provides how many reaction components?", opts: ["1", "2", "3", "4"], ans: 1, topic: "Mechanics" },
  { q: "A fixed support provides how many reaction components?", opts: ["1", "2", "3", "4"], ans: 2, topic: "Mechanics" },
  { q: "When two forces P and Q act at a point such that their resultant is also equal to P, the angle between Q and the resultant is:", opts: ["0°", "90°", "60°", "180°"], ans: 1, topic: "Mechanics" },
  { q: "The phenomenon of gradual increase in strain under constant stress over time is called:", opts: ["Fatigue", "Creep", "Relaxation", "Plasticity"], ans: 1, topic: "Mechanics" },
  { q: "Poisson's ratio is defined as the ratio of:", opts: ["Longitudinal strain to lateral strain", "Lateral strain to longitudinal strain", "Stress to strain", "Shear stress to shear strain"], ans: 1, topic: "Mechanics" },

  // ── THERMODYNAMICS (14 questions) ──
  { q: "Which of the following is an intensive thermodynamic property?", opts: ["Volume", "Mass", "Temperature", "Internal energy"], ans: 2, topic: "Thermodynamics" },
  { q: "Which of the following is an extensive thermodynamic property?", opts: ["Pressure", "Temperature", "Density", "Volume"], ans: 3, topic: "Thermodynamics" },
  { q: "An open thermodynamic system is one which allows transfer of:", opts: ["Energy only", "Mass only", "Both mass and energy", "Neither mass nor energy"], ans: 2, topic: "Thermodynamics" },
  { q: "An isolated system allows transfer of:", opts: ["Mass only", "Energy only", "Both mass and energy", "Neither mass nor energy"], ans: 3, topic: "Thermodynamics" },
  { q: "The zeroth law of thermodynamics defines the concept of:", opts: ["Entropy", "Enthalpy", "Temperature", "Work"], ans: 2, topic: "Thermodynamics" },
  { q: "In a Diesel cycle, heat addition occurs at:", opts: ["Constant volume", "Constant pressure", "Constant temperature", "Adiabatically"], ans: 1, topic: "Thermodynamics" },
  { q: "In a Diesel cycle, heat rejection occurs at:", opts: ["Constant pressure", "Constant volume", "Constant temperature", "Adiabatically"], ans: 1, topic: "Thermodynamics" },
  { q: "The efficiency of a Carnot engine operating between T₁ (source) and T₂ (sink) is:", opts: ["T₂/T₁", "1 − T₁/T₂", "1 − T₂/T₁", "T₁/T₂"], ans: 2, topic: "Thermodynamics" },
  { q: "To increase the efficiency of a Carnot engine, one should:", opts: ["Increase T₂ or decrease T₁", "Decrease T₂ or increase T₁", "Increase both T₁ and T₂", "Decrease both T₁ and T₂"], ans: 1, topic: "Thermodynamics" },
  { q: "Absolute pressure equals:", opts: ["Gauge pressure − Atmospheric pressure", "Gauge pressure + Atmospheric pressure", "Atmospheric pressure − Gauge pressure", "Gauge pressure × Atmospheric pressure"], ans: 1, topic: "Thermodynamics" },
  { q: "A process in which no heat is transferred to or from the system is called:", opts: ["Isothermal", "Isobaric", "Isochoric", "Adiabatic"], ans: 3, topic: "Thermodynamics" },
  { q: "The Rankine cycle is used in:", opts: ["Gas turbines", "Refrigerators", "Steam power plants", "IC engines"], ans: 2, topic: "Thermodynamics" },
  { q: "In the Brayton cycle, heat addition occurs at:", opts: ["Constant volume", "Constant pressure", "Constant temperature", "Adiabatically"], ans: 1, topic: "Thermodynamics" },
  { q: "In the Otto cycle, heat addition and rejection both occur at:", opts: ["Constant pressure", "Constant temperature", "Constant volume", "Adiabatically"], ans: 2, topic: "Thermodynamics" },

  // ── FLUID MECHANICS (12 questions) ──
  { q: "Newton's law of viscosity states that shear stress is proportional to:", opts: ["Velocity", "Pressure gradient", "Velocity gradient (du/dy)", "Density"], ans: 2, topic: "Fluid Mechanics" },
  { q: "Kinematic viscosity is equal to:", opts: ["Dynamic viscosity × Density", "Dynamic viscosity / Density", "Density / Dynamic viscosity", "Dynamic viscosity + Density"], ans: 1, topic: "Fluid Mechanics" },
  { q: "For a fluid at rest, the shear stress is:", opts: ["Maximum at boundaries", "Proportional to velocity", "Always zero", "Equal to viscosity"], ans: 2, topic: "Fluid Mechanics" },
  { q: "The continuity equation A₁V₁ = A₂V₂ is based on the principle of conservation of:", opts: ["Energy", "Momentum", "Mass", "Pressure"], ans: 2, topic: "Fluid Mechanics" },
  { q: "Which of the following is NOT a non-Newtonian fluid?", opts: ["Blood", "Ink", "Paste", "Water"], ans: 3, topic: "Fluid Mechanics" },
  { q: "The Reynolds number for turbulent flow in a pipe is greater than:", opts: ["500", "1000", "2000", "4000"], ans: 3, topic: "Fluid Mechanics" },
  { q: "Bernoulli's equation is based on the principle of conservation of:", opts: ["Mass", "Momentum", "Energy", "Angular momentum"], ans: 2, topic: "Fluid Mechanics" },
  { q: "In pumps connected in parallel, if each pump delivers discharge Q and head H, the combined result is:", opts: ["Head = 2H, Discharge = Q", "Head = H, Discharge = 2Q", "Head = 2H, Discharge = 2Q", "Head = H/2, Discharge = Q"], ans: 1, topic: "Fluid Mechanics" },
  { q: "In pumps connected in series, if each pump delivers discharge Q and head H, the combined result is:", opts: ["Head = H, Discharge = 2Q", "Head = 2H, Discharge = Q", "Head = 2H, Discharge = 2Q", "Head = H, Discharge = Q"], ans: 1, topic: "Fluid Mechanics" },
  { q: "A Pelton wheel is an example of:", opts: ["Reaction turbine", "Impulse turbine", "Mixed flow turbine", "Axial flow turbine"], ans: 1, topic: "Fluid Mechanics" },
  { q: "A Francis turbine is classified as:", opts: ["Impulse, axial flow", "Reaction, mixed flow", "Impulse, radial flow", "Reaction, axial flow"], ans: 1, topic: "Fluid Mechanics" },
  { q: "Specific gravity of a fluid is defined as the ratio of its density to the density of:", opts: ["Air at 0°C", "Mercury at 0°C", "Water at 4°C", "Water at 100°C"], ans: 2, topic: "Fluid Mechanics" },

  // ── CONSTRUCTION MATERIALS (5 questions) ──
  { q: "The major constituent of a good building brick by weight is:", opts: ["Alumina", "Silica", "Lime", "Iron oxide"], ans: 1, topic: "Construction" },
  { q: "Alumina content in a good brick is approximately:", opts: ["5–10%", "20–30%", "50–60%", "70–80%"], ans: 1, topic: "Construction" },
  { q: "Water absorption for a first class brick should not exceed:", opts: ["10%", "15%", "20%", "25%"], ans: 1, topic: "Construction" },
  { q: "M20 concrete mix ratio (Cement : Sand : Aggregate) is:", opts: ["1:2:4", "1:1.5:3", "1:3:6", "1:1:2"], ans: 1, topic: "Construction" },
  { q: "43 Grade OPC cement achieves a compressive strength of 43 N/mm² at:", opts: ["7 days", "14 days", "28 days", "90 days"], ans: 2, topic: "Construction" },
  { q: "Carbon content in cast iron ranges approximately from:", opts: ["0.02–0.8%", "0.8–1.7%", "1.7–4.5%", "4.5–6.5%"], ans: 2, topic: "Construction" },
  { q: "Which of the following is a metamorphic rock?", opts: ["Granite", "Sandstone", "Gneiss", "Basalt"], ans: 2, topic: "Construction" },
  { q: "Granite is classified as:", opts: ["Sedimentary rock", "Metamorphic rock", "Igneous rock", "Alluvial rock"], ans: 2, topic: "Construction" },
  { q: "Which type of foundation is most suitable for very poor and waterlogged soils at great depths?", opts: ["Spread footing", "Strip footing", "Mat foundation", "Well foundation"], ans: 3, topic: "Construction" },
  { q: "Wrought iron is the purest form of iron with carbon content of approximately:", opts: ["0.02–0.05%", "0.5–1.5%", "2–4%", "4–5%"], ans: 0, topic: "Construction" },

  // ── SURVEYING (9 questions) ──
  { q: "The length of Gunter's chain is:", opts: ["33 feet", "66 feet", "100 feet", "120 feet"], ans: 1, topic: "Surveying" },
  { q: "The length of the Engineer's chain is:", opts: ["33 feet", "66 feet", "100 feet", "120 feet"], ans: 2, topic: "Surveying" },
  { q: "A theodolite is an instrument used to measure:", opts: ["Horizontal angles only", "Vertical angles only", "Both horizontal and vertical angles", "Distances only"], ans: 2, topic: "Surveying" },
  { q: "The principle of surveying 'working from whole to part' means:", opts: ["Starting with detail surveys then overall", "Establishing control points first, then detailing", "Measuring offsets before chain lines", "Using GPS before manual survey"], ans: 1, topic: "Surveying" },
  { q: "If the fore bearing of a line AB is 60°30', its back bearing is:", opts: ["60°30'", "240°30'", "119°30'", "300°30'"], ans: 1, topic: "Surveying" },
  { q: "GIS stands for:", opts: ["General Information System", "Geographic Information System", "Geological Investigation System", "Geodetic Instrument Survey"], ans: 1, topic: "Surveying" },
  { q: "GLONASS is the satellite navigation system of:", opts: ["USA", "China", "Russia", "European Union"], ans: 2, topic: "Surveying" },
  { q: "Remote sensing that uses its own energy source to illuminate targets is called:", opts: ["Passive remote sensing", "Active remote sensing", "Thermal remote sensing", "Multi-spectral sensing"], ans: 1, topic: "Surveying" },
  { q: "Contour interval is defined as:", opts: ["Horizontal distance between contour lines", "Vertical distance between successive contour lines", "The length of a contour line", "The slope between two contour lines"], ans: 1, topic: "Surveying" },
];

const TOPIC_COLORS = {
  "Mechanics":      { pri: "#f97316", bg: "#f9731615" },
  "Thermodynamics": { pri: "#ec4899", bg: "#ec489915" },
  "Fluid Mechanics":{ pri: "#06b6d4", bg: "#06b6d415" },
  "Construction":   { pri: "#84cc16", bg: "#84cc1615" },
  "Surveying":      { pri: "#a78bfa", bg: "#a78bfa15" },
};

const TOTAL_TIME = 50 * 60;

function formatTime(s) {
  return `${String(Math.floor(s / 60)).padStart(2,"0")}:${String(s % 60).padStart(2,"0")}`;
}

export default function App() {
  const [screen, setScreen] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(50).fill(null));
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [revealed, setRevealed] = useState(false);
  const [flagged, setFlagged] = useState(Array(50).fill(false));
  const [animKey, setAnimKey] = useState(0);
  const [shake, setShake] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (screen === "test") {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { clearInterval(timerRef.current); finishTest(answers); return 0; }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [screen]);

  const finishTest = (finalAnswers) => {
    clearInterval(timerRef.current);
    setAnswers(finalAnswers);
    setScreen("results");
  };

  const saveAndGo = (idx) => {
    const a = [...answers]; a[current] = selected; setAnswers(a);
    setCurrent(idx); setSelected(answers[idx]); setRevealed(false); setAnimKey(k => k+1);
  };

  const score = answers.filter((a, i) => a === questions[i].ans).length;
  const answered = answers.filter(a => a !== null).length;

  const topicStats = Object.keys(TOPIC_COLORS).map(topic => {
    const qs = questions.map((q,i) => ({...q,i})).filter(q => q.topic === topic);
    return { topic, total: qs.length, correct: qs.filter(q => answers[q.i] === q.ans).length };
  });

  // ─── INTRO ───
  if (screen === "intro") return (
    <div style={S.root}>
      <div style={S.introWrap}>
        <div style={S.introLeft}>
          <div style={S.introBadge}>PREDICTED EXAM</div>
          <h1 style={S.introH1}>ENGG 111</h1>
          <h2 style={S.introH2}>Engineering Science</h2>
          <p style={S.introDesc}>Full Section A practice — 50 MCQs covering all five exam topics, based on pattern analysis of past papers.</p>
          <div style={S.introStats}>
            {[["50","Questions"],["50 min","Time Limit"],["1 mark","Per Question"],["No","Negative Marking"]].map(([v,l])=>(
              <div key={l} style={S.iStat}><span style={S.iStatVal}>{v}</span><span style={S.iStatLbl}>{l}</span></div>
            ))}
          </div>
          <button style={S.startBtn} onClick={()=>setScreen("test")}>Start Test →</button>
        </div>
        <div style={S.introRight}>
          <p style={S.topicsTitle}>Topics Covered</p>
          {Object.entries(TOPIC_COLORS).map(([t,{pri,bg}])=>{
            const cnt = questions.filter(q=>q.topic===t).length;
            return (
              <div key={t} style={{...S.topicCard, background: bg, borderColor: pri+"44"}}>
                <span style={{...S.topicDot2, background: pri}}/>
                <span style={S.topicCardName}>{t}</span>
                <span style={{...S.topicCount, color: pri}}>{cnt} Qs</span>
                <div style={{...S.topicBar, background: pri+"33"}}>
                  <div style={{...S.topicBarFill, width: `${(cnt/50)*100}%`, background: pri}}/>
                </div>
              </div>
            );
          })}
          <div style={S.tipBox}>
            <span style={S.tipIcon}>💡</span>
            <span style={S.tipText}>Use "Check Answer" to reveal correct answers while practising. Flag tough questions and revisit.</span>
          </div>
        </div>
      </div>
    </div>
  );

  // ─── RESULTS ───
  if (screen === "results") {
    const pct = Math.round((score/50)*100);
    const grade = pct>=80?"Distinction":pct>=60?"First Division":pct>=45?"Second Division":pct>=32?"Pass":"Fail";
    const gColor = pct>=80?"#84cc16":pct>=60?"#06b6d4":pct>=45?"#f97316":pct>=32?"#facc15":"#ef4444";
    return (
      <div style={S.root}>
        <div style={S.resultsWrap}>
          <div style={S.resLeft}>
            <p style={S.resLabel}>Your Score</p>
            <div style={{...S.resBig, color: gColor}}>{score}<span style={S.resOf}>/50</span></div>
            <div style={{...S.resGrade, color: gColor}}>{grade}</div>
            <div style={S.resPctBar}><div style={{...S.resPctFill, width:pct+"%", background:gColor}}/></div>
            <p style={S.resPctTxt}>{pct}% — {score} correct · {50-score} wrong · {50-answered} skipped</p>
            <div style={S.resBtnRow}>
              <button style={S.reviewBtn} onClick={()=>setScreen("review")}>Review All Answers</button>
              <button style={S.retakeBtn} onClick={()=>{setAnswers(Array(50).fill(null));setTimeLeft(TOTAL_TIME);setCurrent(0);setSelected(null);setRevealed(false);setFlagged(Array(50).fill(false));setScreen("test");}}>Retake Test</button>
            </div>
          </div>
          <div style={S.resRight}>
            <p style={S.resBreakTitle}>Topic Breakdown</p>
            {topicStats.map(({topic,total,correct})=>{
              const {pri} = TOPIC_COLORS[topic];
              const tp = Math.round((correct/total)*100);
              return (
                <div key={topic} style={S.tbRow}>
                  <div style={S.tbTop}>
                    <span style={{...S.tbDot, background:pri}}/>
                    <span style={S.tbName}>{topic}</span>
                    <span style={{...S.tbScore, color:pri}}>{correct}/{total}</span>
                  </div>
                  <div style={S.tbBarBg}><div style={{...S.tbBarFill, width:tp+"%", background:pri}}/></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ─── REVIEW ───
  if (screen === "review") return (
    <div style={S.root}>
      <div style={S.reviewPage}>
        <div style={S.revHeader}>
          <h2 style={S.revTitle}>Answer Review — {score}/50 Correct</h2>
          <button style={S.backBtn} onClick={()=>setScreen("results")}>← Results</button>
        </div>
        {questions.map((q,i)=>{
          const ua = answers[i]; const ok = ua===q.ans; const skip = ua===null;
          const {pri} = TOPIC_COLORS[q.topic];
          return (
            <div key={i} style={{...S.revQ, borderLeftColor: skip?"#475569":ok?"#84cc16":"#ef4444"}}>
              <div style={S.revMeta}>
                <span style={S.revNum}>Q{i+1}</span>
                <span style={{...S.revTopic, background:pri+"20", color:pri}}>{q.topic}</span>
                <span style={{...S.revStatus, color:skip?"#64748b":ok?"#84cc16":"#ef4444"}}>{skip?"⊘ Skipped":ok?"✓ Correct":"✗ Wrong"}</span>
              </div>
              <p style={S.revQtxt}>{q.q}</p>
              <div style={S.revOpts}>
                {q.opts.map((opt,oi)=>(
                  <div key={oi} style={{
                    ...S.revOpt,
                    background: oi===q.ans?"#84cc1618":(oi===ua&&!ok)?"#ef444418":"transparent",
                    borderColor: oi===q.ans?"#84cc16":(oi===ua&&!ok)?"#ef4444":"#1e293b",
                    color: oi===q.ans?"#84cc16":(oi===ua&&!ok)?"#ef4444":"#64748b"
                  }}>
                    <span style={S.revLetter}>{String.fromCharCode(65+oi)}</span>
                    <span style={{flex:1}}>{opt}</span>
                    {oi===q.ans&&<span style={{fontSize:12,marginLeft:8}}>✓ Correct Answer</span>}
                    {oi===ua&&!ok&&<span style={{fontSize:12,marginLeft:8}}>Your answer</span>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <button style={{...S.backBtn, marginTop:20, padding:"12px 28px"}} onClick={()=>setScreen("results")}>← Back to Results</button>
      </div>
    </div>
  );

  // ─── TEST ───
  const q = questions[current];
  const {pri, bg} = TOPIC_COLORS[q.topic];
  const timerPct = (timeLeft/TOTAL_TIME)*100;
  const timerCol = timeLeft<120?"#ef4444":timeLeft<300?"#f97316":"#06b6d4";

  return (
    <div style={S.root}>
      {/* Top bar */}
      <div style={S.topBar}>
        <div>
          <div style={S.topTitle}>ENGG 111 — 50 Question MCQ</div>
          <div style={S.topSub}>{answered}/50 answered · {flagged.filter(Boolean).length} flagged</div>
        </div>
        <div style={{...S.timerBox, color:timerCol, borderColor:timerCol+"55"}}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={timerCol} strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {formatTime(timeLeft)}
        </div>
        <button style={S.submitBtn} onClick={()=>{ const a=[...answers];a[current]=selected;finishTest(a); }}>Submit All</button>
      </div>
      <div style={{width:"100%",height:3,background:"#0f172a"}}><div style={{height:3,width:timerPct+"%",background:timerCol,transition:"width 1s linear,background .5s"}}/></div>

      <div style={S.layout}>
        {/* Question */}
        <div key={animKey} style={S.qCard}>
          <div style={S.qTopRow}>
            <span style={{...S.qBadge, background:bg, color:pri, border:`1px solid ${pri}44`}}>
              Question {current+1} <span style={{opacity:.5}}>/ 50</span>
            </span>
            <span style={{...S.qTopic, background:bg, color:pri, border:`1px solid ${pri}44`}}>{q.topic}</span>
            <button style={{...S.flagBtn, color:flagged[current]?"#f97316":"#334155"}}
              onClick={()=>setFlagged(f=>{const n=[...f];n[current]=!n[current];return n;})}>
              {flagged[current]?"🚩 Flagged":"⚑ Flag"}
            </button>
          </div>
          <p style={S.qText}>{q.q}</p>
          <div style={S.opts}>
            {q.opts.map((opt,oi)=>{
              const isSel = selected===oi;
              const isCorr = oi===q.ans;
              let bg2="#0a1628", bc="#1e293b", tc="#94a3b8";
              if (isSel && !revealed) { bg2=pri+"18"; bc=pri; tc="#f1f5f9"; }
              if (revealed) {
                if (isCorr) { bg2="#84cc1618"; bc="#84cc16"; tc="#84cc16"; }
                else if (isSel) { bg2="#ef444418"; bc="#ef4444"; tc="#ef4444"; }
              }
              return (
                <button key={oi} onClick={()=>!revealed&&setSelected(oi)}
                  style={{...S.optBtn, background:bg2, borderColor:bc, color:tc, cursor:revealed?"default":"pointer"}}>
                  <span style={{...S.optCircle, borderColor:bc, background:isSel?bc:"transparent", color:isSel?"#0f172a":bc}}>
                    {String.fromCharCode(65+oi)}
                  </span>
                  <span style={S.optTxt}>{opt}</span>
                  {revealed&&isCorr&&<span style={{marginLeft:"auto",fontSize:16}}>✓</span>}
                  {revealed&&isSel&&!isCorr&&<span style={{marginLeft:"auto",fontSize:16}}>✗</span>}
                </button>
              );
            })}
          </div>
          <div style={S.navRow}>
            <button style={S.navBtn} onClick={()=>saveAndGo(current-1)} disabled={current===0}>← Prev</button>
            <button style={{...S.checkBtn, opacity:selected===null?.4:1, borderColor:revealed?"#84cc16":pri, color:revealed?"#84cc16":pri}}
              onClick={()=>selected!==null&&setRevealed(r=>!r)}>
              {revealed?"Hide Answer":"Check Answer"}
            </button>
            {current<49
              ? <button style={S.navBtn} onClick={()=>saveAndGo(current+1)}>Next →</button>
              : <button style={{...S.navBtn, background:"#84cc1618", borderColor:"#84cc16", color:"#84cc16"}}
                  onClick={()=>{const a=[...answers];a[current]=selected;finishTest(a);}}>Finish ✓</button>
            }
          </div>
        </div>

        {/* Navigator */}
        <div style={S.navPanel}>
          <p style={S.navTitle}>Navigator</p>
          <div style={S.navGrid}>
            {questions.map((_,i)=>{
              const {pri:p} = TOPIC_COLORS[questions[i].topic];
              const isAns = answers[i]!==null||(i===current&&selected!==null);
              const isCur = i===current;
              return (
                <button key={i} onClick={()=>saveAndGo(i)} style={{
                  ...S.navDot,
                  background: isCur?p:isAns?p+"44":"#0d1b2a",
                  borderColor: isCur?p:isAns?p+"88":"#1e293b",
                  color: isCur?"#0f172a":isAns?p:"#475569",
                  fontWeight: isCur?700:400,
                  boxShadow: isCur?`0 0 8px ${p}88`:"none"
                }}>
                  {i+1}
                  {flagged[i]&&<span style={{position:"absolute",top:-3,right:-3,fontSize:8}}>🚩</span>}
                </button>
              );
            })}
          </div>
          <div style={S.legendBox}>
            <div style={S.legRow}><span style={{...S.legDot,background:"#06b6d4"}}/><span style={S.legLbl}>Current</span></div>
            <div style={S.legRow}><span style={{...S.legDot,background:"#334155"}}/><span style={S.legLbl}>Answered</span></div>
            <div style={S.legRow}><span style={{...S.legDot,background:"#0d1b2a",border:"1px solid #1e293b"}}/><span style={S.legLbl}>Unanswered</span></div>
          </div>
          <div style={S.topicLegBox}>
            <p style={S.navTitle}>Topics</p>
            {Object.entries(TOPIC_COLORS).map(([t,{pri:p}])=>(
              <div key={t} style={S.legRow}><span style={{...S.legDot,background:p}}/><span style={S.legLbl}>{t}</span></div>
            ))}
          </div>
          <div style={S.progressBox}>
            <p style={S.navTitle}>Progress</p>
            <div style={S.progBarBg}><div style={{...S.progBarFill, width:`${(answered/50)*100}%`}}/></div>
            <p style={S.progTxt}>{answered} / 50 answered</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const S = {
  root: { minHeight:"100vh", background:"#060d1a", fontFamily:"'Georgia',serif", color:"#e2e8f0", display:"flex", flexDirection:"column", alignItems:"center" },

  // Intro
  introWrap: { display:"flex", gap:40, maxWidth:1000, width:"100%", padding:"48px 24px", boxSizing:"border-box", flexWrap:"wrap" },
  introLeft: { flex:1, minWidth:280 },
  introBadge: { display:"inline-block", background:"#f9731620", color:"#f97316", border:"1px solid #f9731644", borderRadius:20, padding:"3px 14px", fontSize:11, letterSpacing:2, marginBottom:16 },
  introH1: { fontSize:52, fontWeight:900, margin:"0 0 4px", lineHeight:1, color:"#f1f5f9", letterSpacing:-1 },
  introH2: { fontSize:20, fontWeight:400, color:"#64748b", margin:"0 0 20px" },
  introDesc: { fontSize:14, color:"#94a3b8", lineHeight:1.7, marginBottom:28, maxWidth:400 },
  introStats: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:32 },
  iStat: { background:"#0d1b2a", border:"1px solid #1e293b", borderRadius:10, padding:"14px", display:"flex", flexDirection:"column" },
  iStatVal: { fontSize:22, fontWeight:700, color:"#f1f5f9" },
  iStatLbl: { fontSize:12, color:"#64748b", marginTop:2 },
  startBtn: { background:"linear-gradient(135deg,#f97316,#ec4899)", color:"#fff", border:"none", borderRadius:12, padding:"14px 36px", fontSize:16, fontWeight:600, cursor:"pointer", letterSpacing:.5 },
  introRight: { flex:1, minWidth:280 },
  topicsTitle: { fontSize:12, fontWeight:600, color:"#475569", textTransform:"uppercase", letterSpacing:1, margin:"0 0 14px" },
  topicCard: { border:"1px solid", borderRadius:10, padding:"12px 14px", marginBottom:8 },
  topicDot2: { width:8, height:8, borderRadius:"50%", display:"inline-block", marginRight:8 },
  topicCardName: { fontSize:14, color:"#cbd5e1", marginRight:"auto" },
  topicCount: { fontSize:13, fontWeight:600, marginLeft:"auto", marginRight:12 },
  topicBar: { height:4, borderRadius:2, marginTop:8, overflow:"hidden" },
  topicBarFill: { height:4, borderRadius:2 },
  tipBox: { background:"#0d1b2a", border:"1px solid #1e293b", borderRadius:10, padding:"12px 14px", marginTop:16, display:"flex", gap:10, alignItems:"flex-start" },
  tipIcon: { fontSize:16, flexShrink:0, marginTop:1 },
  tipText: { fontSize:12, color:"#64748b", lineHeight:1.6 },

  // Top bar
  topBar: { position:"sticky", top:0, zIndex:50, width:"100%", background:"#060d1aee", backdropFilter:"blur(12px)", borderBottom:"1px solid #0f1f35", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 24px", boxSizing:"border-box" },
  topTitle: { fontSize:14, fontWeight:600, color:"#f1f5f9" },
  topSub: { fontSize:11, color:"#475569", marginTop:2 },
  timerBox: { fontSize:20, fontWeight:700, fontFamily:"monospace", display:"flex", alignItems:"center", gap:6, border:"1px solid", borderRadius:8, padding:"5px 12px" },
  submitBtn: { background:"#ef444418", color:"#ef4444", border:"1px solid #ef444444", borderRadius:8, padding:"7px 16px", fontSize:13, fontWeight:600, cursor:"pointer" },

  // Layout
  layout: { display:"flex", gap:18, width:"100%", maxWidth:1100, padding:"20px 18px", boxSizing:"border-box" },

  // Q card
  qCard: { flex:1, background:"#0a1628", border:"1px solid #0f2040", borderRadius:16, padding:"28px 30px", boxShadow:"0 24px 48px #00000060", animation:"fadeSlide .2s ease-out" },
  qTopRow: { display:"flex", alignItems:"center", gap:8, marginBottom:20 },
  qBadge: { fontSize:13, fontWeight:600, padding:"4px 12px", borderRadius:20, letterSpacing:.3 },
  qTopic: { fontSize:12, padding:"4px 10px", borderRadius:20 },
  flagBtn: { marginLeft:"auto", background:"none", border:"none", cursor:"pointer", fontSize:13, fontWeight:500, padding:"4px 8px" },
  qText: { fontSize:17, lineHeight:1.75, color:"#e2e8f0", marginBottom:22 },
  opts: { display:"flex", flexDirection:"column", gap:9 },
  optBtn: { display:"flex", alignItems:"center", gap:13, border:"1px solid", borderRadius:11, padding:"13px 16px", textAlign:"left", fontSize:14, lineHeight:1.5, transition:"all .18s" },
  optCircle: { width:28, height:28, borderRadius:"50%", border:"2px solid", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:13, flexShrink:0, transition:"all .18s" },
  optTxt: { flex:1 },
  navRow: { display:"flex", gap:10, marginTop:22 },
  navBtn: { background:"#0d1b2a", border:"1px solid #1e293b", color:"#64748b", borderRadius:10, padding:"10px 20px", fontSize:14, fontWeight:500, cursor:"pointer" },
  checkBtn: { flex:1, background:"transparent", border:"1px solid", borderRadius:10, padding:"10px", fontSize:14, fontWeight:500, cursor:"pointer", transition:"all .2s" },

  // Nav panel
  navPanel: { width:192, flexShrink:0, display:"flex", flexDirection:"column", gap:0 },
  navTitle: { fontSize:10, fontWeight:700, color:"#334155", textTransform:"uppercase", letterSpacing:1.2, margin:"0 0 10px" },
  navGrid: { display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:5, background:"#0a1628", border:"1px solid #0f2040", borderRadius:12, padding:12, marginBottom:10 },
  navDot: { aspectRatio:1, borderRadius:5, fontSize:10, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid", position:"relative", transition:"all .15s" },
  legendBox: { background:"#0a1628", border:"1px solid #0f2040", borderRadius:12, padding:"12px", marginBottom:10 },
  legRow: { display:"flex", alignItems:"center", gap:7, marginBottom:5 },
  legDot: { width:9, height:9, borderRadius:3, flexShrink:0 },
  legLbl: { fontSize:11, color:"#475569" },
  topicLegBox: { background:"#0a1628", border:"1px solid #0f2040", borderRadius:12, padding:"12px", marginBottom:10 },
  progressBox: { background:"#0a1628", border:"1px solid #0f2040", borderRadius:12, padding:"12px" },
  progBarBg: { height:6, background:"#0f2040", borderRadius:3, overflow:"hidden", marginBottom:6 },
  progBarFill: { height:6, background:"linear-gradient(90deg,#06b6d4,#3b82f6)", borderRadius:3, transition:"width .3s" },
  progTxt: { fontSize:11, color:"#475569", margin:0 },

  // Results
  resultsWrap: { display:"flex", gap:32, maxWidth:900, width:"100%", padding:"48px 24px", boxSizing:"border-box", flexWrap:"wrap" },
  resLeft: { flex:1, minWidth:260, background:"#0a1628", border:"1px solid #0f2040", borderRadius:16, padding:"36px 32px" },
  resLabel: { fontSize:12, color:"#475569", textTransform:"uppercase", letterSpacing:1, margin:"0 0 8px" },
  resBig: { fontSize:72, fontWeight:900, lineHeight:1, fontFamily:"monospace" },
  resOf: { fontSize:28, color:"#1e293b", fontWeight:400 },
  resGrade: { fontSize:20, fontWeight:600, marginTop:6, marginBottom:16 },
  resPctBar: { height:8, background:"#0f2040", borderRadius:4, overflow:"hidden", marginBottom:8 },
  resPctFill: { height:8, borderRadius:4, transition:"width 1s ease" },
  resPctTxt: { fontSize:12, color:"#475569", marginBottom:24 },
  resBtnRow: { display:"flex", flexDirection:"column", gap:10 },
  reviewBtn: { background:"#0d1b2a", border:"1px solid #1e293b", color:"#94a3b8", borderRadius:10, padding:"12px", fontSize:14, cursor:"pointer", fontWeight:500 },
  retakeBtn: { background:"linear-gradient(135deg,#f97316,#ec4899)", border:"none", color:"#fff", borderRadius:10, padding:"12px", fontSize:14, cursor:"pointer", fontWeight:600 },
  resRight: { flex:1, minWidth:260, background:"#0a1628", border:"1px solid #0f2040", borderRadius:16, padding:"36px 32px" },
  resBreakTitle: { fontSize:12, fontWeight:700, color:"#475569", textTransform:"uppercase", letterSpacing:1, margin:"0 0 20px" },
  tbRow: { marginBottom:16 },
  tbTop: { display:"flex", alignItems:"center", gap:8, marginBottom:6 },
  tbDot: { width:8, height:8, borderRadius:"50%", flexShrink:0 },
  tbName: { fontSize:13, color:"#94a3b8", flex:1 },
  tbScore: { fontSize:13, fontWeight:600 },
  tbBarBg: { height:5, background:"#0f2040", borderRadius:3, overflow:"hidden" },
  tbBarFill: { height:5, borderRadius:3, transition:"width 1s ease" },

  // Review
  reviewPage: { width:"100%", maxWidth:760, padding:"24px 20px", boxSizing:"border-box" },
  revHeader: { display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 },
  revTitle: { fontSize:20, fontWeight:700, margin:0 },
  backBtn: { background:"#0a1628", border:"1px solid #1e293b", color:"#64748b", borderRadius:8, padding:"8px 16px", fontSize:13, cursor:"pointer" },
  revQ: { background:"#0a1628", borderLeft:"4px solid", borderRadius:"0 12px 12px 0", padding:"18px 20px", marginBottom:12 },
  revMeta: { display:"flex", alignItems:"center", gap:8, marginBottom:8 },
  revNum: { fontSize:11, fontWeight:700, color:"#334155" },
  revTopic: { fontSize:11, padding:"2px 8px", borderRadius:10, fontWeight:500 },
  revStatus: { marginLeft:"auto", fontSize:12, fontWeight:600 },
  revQtxt: { fontSize:14, color:"#cbd5e1", lineHeight:1.6, margin:"0 0 12px" },
  revOpts: { display:"flex", flexDirection:"column", gap:5 },
  revOpt: { display:"flex", alignItems:"center", gap:8, border:"1px solid", borderRadius:7, padding:"8px 12px", fontSize:13 },
  revLetter: { fontWeight:700, width:16, flexShrink:0 },
};
