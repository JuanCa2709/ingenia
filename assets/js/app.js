function buildLessonStepper(wNum,uc,wIdx){
  const lessons=LESSONS[wNum];
  if(!lessons)return'';
  const steps=lessons.map((a,ai)=>{
    const arr=ai<lessons.length-1?`<div class="wls-arr">→</div>`:'';
    return`<div class="wls-step" onclick="toggleLesson(${wIdx},${ai})"><div class="wls-num" style="background:${uc.hex}">${a.n}</div><div class="wls-name">${a.title}</div><div class="wls-mode">${a.mode}</div></div>${arr}`;
  }).join('');
  const panels=lessons.map((a,ai)=>{
    const items=a.items.length?`<ul class="wls-items">${a.items.map(it=>`<li>${it}</li>`).join('')}</ul>`:'';
    const links=a.links.length?`<div class="wls-links">${a.links.map(l=>`<a class="wls-link" href="${l.url}" target="_blank" rel="noopener" style="color:${uc.hex};border-color:rgba(${uc.rgb},.3)">${l.label} ↗</a>`).join('')}</div>`:'';
    const starter=a.starter?`<div class="wls-starter"><span class="wls-slbl">Sentence Starter</span>${a.starter}</div>`:'';
    return`<div class="wls-panel" id="wlp-${wIdx}-${ai}" style="border-left-color:${uc.hex}"><div class="wls-ph"><div class="wls-pnum" style="background:${uc.hex}">${a.n}</div><div class="wls-ptitle">${a.title}</div><div class="wls-pmode">${a.mode}</div></div><p class="wls-desc">${a.desc}</p>${items}${links}${starter}</div>`;
  }).join('');
  return`<div class="wc-lessons"><div class="wls-hd"><span class="wls-title">Lesson Activities</span><span class="wls-count">${lessons.length} activities</span></div><div class="wls-row" id="wls-${wIdx}">${steps}</div><div class="wls-panels">${panels}</div></div>`;
}

function toggleLesson(wIdx,aIdx){
  const allSteps=document.querySelectorAll(`#wls-${wIdx} .wls-step`);
  const allPanels=document.querySelectorAll(`[id^="wlp-${wIdx}-"]`);
  const isOpen=allSteps[aIdx].classList.contains('open');
  allSteps.forEach(s=>s.classList.remove('open'));
  allPanels.forEach(p=>p.classList.remove('vis'));
  if(!isOpen){allSteps[aIdx].classList.add('open');document.getElementById(`wlp-${wIdx}-${aIdx}`).classList.add('vis');}
}

function buildNav(){
  const nav=document.getElementById('weekNav');
  let lastU='';
  W.forEach((w,i)=>{
    if(w.u!==lastU){
      const uc=UC[w.u];
      const sep=document.createElement('div');
      sep.className='usep';
      sep.style.color=uc.hex;
      sep.style.width='100%';
      sep.innerHTML=`<span>${uc.label}</span><div class="usep-line" style="background:${uc.hex}"></div>`;
      nav.appendChild(sep);
      lastU=w.u;
    }
    const btn=document.createElement('button');
    btn.className='wtab'+(i===0?' active':'');
    btn.dataset.i=i;
    btn.textContent=`Wk ${w.w}`;
    if(i===0){btn.style.background=UC[w.u].hex;btn.style.color='#080d1a';btn.style.borderColor='transparent';}
    btn.addEventListener('click',()=>switchWeek(i));
    nav.appendChild(btn);
  });
}

function buildCards(){
  const cont=document.getElementById('weekCards');
  W.forEach((w,i)=>{
    const uc=UC[w.u];
    const card=document.createElement('div');
    card.className='wcard'+(i===0?' vis':'');
    card.id='wc'+i;
    const subj=w.subj.map(s=>`<span class="subj-tag">${s}</span>`).join('');
    const acts=w.acts.map(a=>`<li><span class="arr" style="color:${uc.hex}">▸</span>&nbsp;${a}</li>`).join('');
    const vocab=w.vocab.map(v=>`<span class="chip" style="background:rgba(${uc.rgb},.08);border-color:rgba(${uc.rgb},.25);color:${uc.hex}">${v}</span>`).join('');
    const lessonStepper=buildLessonStepper(w.w,uc,i);
    card.innerHTML=`
      <div class="wc-head">
        <div class="wc-meta">
          <div class="wc-badge">${uc.label}</div>
          <div class="wc-en">
            <span class="wc-emoji">${w.emoji}</span>
            <span class="wc-weeknum" style="color:${uc.hex};border-color:rgba(${uc.rgb},.35);background:rgba(${uc.rgb},.08)">WEEK ${w.w}</span>
          </div>
          <h2 class="wc-topic">${w.topic}</h2>
          <div class="clil-row">
            <span class="clil-badge" style="color:${uc.hex};border-color:rgba(${uc.rgb},.3);background:rgba(${uc.rgb},.08)">5C: ${w.clil}</span>
            <div class="subj-tags">${subj}</div>
          </div>
        </div>
        <div class="vw">
          <a class="vf vlink" href="https://www.youtube.com/watch?v=${w.vid}" target="_blank" rel="noopener" title="Watch on YouTube: ${w.vtitle}">
            <img src="https://img.youtube.com/vi/${w.vid}/hqdefault.jpg" alt="${w.vtitle}" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border:0"/>
            <div class="vplay"><svg width="54" height="54" viewBox="0 0 68 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="68" height="48" rx="10" fill="#FF0000"/><polygon points="27,14 27,34 47,24" fill="white"/></svg></div>
            <div class="voverlay"></div>
          </a>
          <p class="vlabel"><a href="https://www.youtube.com/watch?v=${w.vid}" target="_blank" rel="noopener" style="color:var(--muted);text-decoration:none">${w.vtitle}</a></p>
        </div>
      </div>
      <div class="wc-body">
        <div class="wc-col">
          <div class="blk">
            <div class="blk-lbl">Weekly Content</div>
            <div class="cnote">${w.content}</div>
          </div>
          <div class="blk">
            <div class="blk-lbl">In-Class Activities</div>
            <ul class="al">${acts}</ul>
          </div>
        </div>
        <div class="wc-col">
          <div class="blk">
            <div class="blk-lbl">Key English Vocabulary</div>
            <div class="vc">${vocab}</div>
          </div>
          <div class="blk">
            <div class="blk-lbl">Independent Work</div>
            <p class="ibox" style="border-left-color:${uc.hex}">${w.ind}</p>
          </div>
          <div class="blk">
            <div class="blk-lbl">Weekly Assessment</div>
            <p class="abox" style="border-left-color:${uc.hex}">${w.assess}</p>
          </div>
        </div>
      </div>
      ${lessonStepper}
      <div class="wc-foot">
        <div class="hbox"><div class="hv" style="color:${uc.hex}">${w.h.t}</div><div class="hl">Theoretical</div></div>
        <div class="hbox"><div class="hv" style="color:${uc.hex}">${w.h.tp}</div><div class="hl">Theory-Practice</div></div>
        <div class="hbox"><div class="hv" style="color:${uc.hex}">${w.h.p}</div><div class="hl">Practical</div></div>
        <div class="hbox"><div class="hv" style="color:${uc.hex}">${w.h.i}</div><div class="hl">Independiente</div></div>
      </div>
    `;
    cont.appendChild(card);
  });
}

function switchWeek(idx){
  document.querySelectorAll('.wcard').forEach(c=>c.classList.remove('vis'));
  document.querySelectorAll('.wtab').forEach(t=>{
    t.classList.remove('active');
    t.style.cssText='';
  });
  document.getElementById('wc'+idx).classList.add('vis');
  const tabs=document.querySelectorAll('.wtab');
  tabs[idx].classList.add('active');
  tabs[idx].style.background=UC[W[idx].u].hex;
  tabs[idx].style.color='#080d1a';
  tabs[idx].style.borderColor='transparent';
  tabs[idx].style.fontWeight='700';
  document.getElementById('schedule').scrollIntoView({behavior:'smooth',block:'start'});
}

function setupReveal(){
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('in'),i*70);obs.unobserve(e.target);}});
  },{threshold:0.08});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
}

buildNav();
buildCards();
setupReveal();