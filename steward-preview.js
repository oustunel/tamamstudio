/* AI Steward concept preview, based on the supplied design brief and film. */
(function () {
  'use strict';
  const KEY = 'steward';
  const CSS = `
    .sim-steward{position:absolute;inset:0;overflow:hidden;background:#060B17;color:#F4EFE3;font-family:'Instrument Sans',Arial,sans-serif;box-sizing:border-box}
    .sim-steward *{box-sizing:border-box}
    .sim-steward .st-serif{font-family:'Fraunces',Georgia,serif;font-weight:400}
    .sim-steward .st-mono{font-family:'IBM Plex Mono',monospace;letter-spacing:.12em;text-transform:uppercase}
    .sim-steward .st-gold{color:#D8B262}
    .sim-steward .st-meter{display:block;overflow:visible}
    .sim-steward .st-meter circle{fill:none}
    .sim-steward .st-track{stroke:rgba(216,178,98,.18)}
    .sim-steward .st-arc{stroke:#D8B262;stroke-linecap:round;transform:rotate(-90deg);transform-origin:center;stroke-dasharray:65 35}
    .sim-steward .st-core{fill:#0A1428;stroke:rgba(216,178,98,.5)}
    .sim-steward-cover{width:320px;height:200px;background:radial-gradient(circle at 79% 55%,#243B5F 0,#0A1428 29%,#060B17 68%);padding:18px 20px}
    .sim-steward-cover:after{content:'';position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(rgba(244,239,227,.10) .65px,transparent .65px);background-size:16px 16px;opacity:.45}
    .sim-steward-cover .st-mark{display:flex;align-items:center;gap:7px;position:relative;z-index:1;font:600 11px/1 'Instrument Sans',Arial,sans-serif;color:#F4EFE3}
    .sim-steward-cover .st-mark i{display:block;width:17px;height:17px;border:2px solid #D8B262;border-radius:50%;position:relative}
    .sim-steward-cover .st-mark i:after{content:'';position:absolute;width:4px;height:4px;left:5px;top:5px;background:#D8B262;border-radius:50%}
    .sim-steward-cover .st-cover-title{position:relative;z-index:1;font:400 28px/1.08 'Fraunces',Georgia,serif;letter-spacing:-.04em;margin:31px 0 0;max-width:205px}
    .sim-steward-cover .st-cover-sub{position:relative;z-index:1;font:500 8px/1.3 'IBM Plex Mono',monospace;letter-spacing:.09em;text-transform:uppercase;color:#AEB7CB;margin-top:12px}
    .sim-steward-cover .st-meter{position:absolute;width:127px;height:127px;right:-10px;top:49px;filter:drop-shadow(0 0 18px rgba(216,178,98,.20))}
    .sim-steward-cover .st-meter .st-track,.sim-steward-cover .st-meter .st-arc{stroke-width:4}
    .sim-steward-cover .st-meter .st-core{stroke-width:1}
    .sim-steward-cover .st-rule{position:absolute;left:20px;right:20px;bottom:13px;border-top:1px solid rgba(216,178,98,.3)}
    .sim-steward-screen{width:100%;height:100%;background:radial-gradient(circle at 88% 6%,rgba(216,178,98,.14),transparent 28%),linear-gradient(180deg,#0A1428,#060B17);padding:35px 48px 36px;display:flex;flex-direction:column}
    .sim-steward-screen .st-head{display:flex;justify-content:space-between;align-items:center;padding-bottom:28px;border-bottom:1px solid rgba(216,178,98,.22)}
    .sim-steward-screen .st-head strong{font:400 29px/1 'Fraunces',Georgia,serif}
    .sim-steward-screen .st-head span{font:500 12px/1.2 'IBM Plex Mono',monospace;color:#AEB7CB;letter-spacing:.12em;text-transform:uppercase}
    .sim-steward-screen .st-main{display:grid;grid-template-columns:1fr .94fr;gap:44px;align-items:center;flex:1;min-height:0}
    .sim-steward-screen .st-label{font:500 12px/1.4 'IBM Plex Mono',monospace;letter-spacing:.14em;text-transform:uppercase;color:#D8B262;margin:0 0 26px}
    .sim-steward-screen h2{font:400 76px/1.04 'Fraunces',Georgia,serif;letter-spacing:-.055em;margin:0 0 24px}
    .sim-steward-screen h2 em{font-style:normal;color:#F1D592}
    .sim-steward-screen .st-lead{font-size:23px;line-height:1.4;color:#C6CCDB;max-width:590px;margin:0 0 24px}
    .sim-steward-screen .st-note{font:500 13px/1.5 'IBM Plex Mono',monospace;color:#AEB7CB;max-width:560px;margin:0}
    .sim-steward-screen .st-film-panel{border:1px solid rgba(216,178,98,.38);border-radius:24px;overflow:hidden;background:#0A1428;box-shadow:0 24px 70px rgba(0,0,0,.3)}
    .sim-steward-screen video{display:block;width:100%;aspect-ratio:16/9;object-fit:contain;background:#060B17}
    .sim-steward-screen .st-film-foot{display:flex;justify-content:space-between;align-items:center;gap:15px;padding:14px 18px;color:#D8B262;font:500 12px/1.3 'IBM Plex Mono',monospace;text-transform:uppercase;letter-spacing:.08em}
    .sim-steward-screen .st-film-foot small{font:400 12px/1.2 'Instrument Sans',Arial,sans-serif;color:#AEB7CB;text-transform:none;letter-spacing:0}
    .sim-steward-screen .st-foot{display:flex;justify-content:space-between;align-items:center;gap:20px;padding-top:22px;border-top:1px solid rgba(216,178,98,.22);color:#AEB7CB;font:500 13px/1.3 'IBM Plex Mono',monospace;letter-spacing:.06em;text-transform:uppercase}
  `;
  function css(){
    if(document.getElementById('sim-steward'))return;
    const style=document.createElement('style');
    style.id='sim-steward';
    style.textContent=CSS;
    document.head.appendChild(style);
  }
  function meter(){return '<svg class="st-meter" viewBox="0 0 120 120" aria-hidden="true"><circle class="st-track" cx="60" cy="60" r="48"/><circle class="st-arc" cx="60" cy="60" r="48" pathLength="100"/><circle class="st-core" cx="60" cy="60" r="34"/></svg>'}
  window.TAMAM_SIMS=window.TAMAM_SIMS||{};
  window.TAMAM_SIMS[KEY]={
    key:KEY,frame:'browser',
    cover(el){
      css();
      el.innerHTML='<div class="sim-steward sim-steward-cover"><div class="st-mark"><i></i>AI Steward</div><div class="st-cover-title">Every credit has a <span class="st-gold">steward.</span></div><div class="st-cover-sub">The AI credit meter for companies</div>'+meter()+'<div class="st-rule"></div></div>';
    },
    mount(el,lang){
      css();
      const tr=lang==='tr';
      el.innerHTML='<div class="sim-steward sim-steward-screen"><div class="st-head"><strong>AI Steward</strong><span>'+(tr?'Ürün fikri / AI kredi sayacı':'Product idea / AI credit meter')+'</span></div><div class="st-main"><div><p class="st-label">'+(tr?'HER KREDİNİN BİR GÖREVİ VAR':'EVERY CREDIT HAS A JOB')+'</p><h2>'+(tr?'Her kredinin bir <em>sorumlusu var.</em>':'Every credit has a <em>steward.</em>')+'</h2><p class="st-lead">'+(tr?'Şirketler için yapay zekâ kredi sayacı. Harcamayı kişi, proje ve kullanım amacına bağlayan bir kontrol paneli fikri.':'The AI credit meter for companies. A proposed control plane that ties AI use to people, projects and purpose.')+'</p><p class="st-note">'+(tr?'Fikir aşaması · Gösterilen film bir ürün vizyonudur, çalışan uygulama değildir.':'Idea stage · The film presents a product vision, not shipped software.')+'</p></div><div class="st-film-panel"><video controls playsinline preload="metadata" aria-label="AI Steward concept film"><source src="assets/ai-steward-film.mp4" type="video/mp4"></video><div class="st-film-foot"><span>'+(tr?'Konsept filmi':'Concept film')+'</span><small>'+(tr?'Oynatmak için tıklayın':'Press play to watch')+'</small></div></div></div><div class="st-foot"><span>Get more for less.</span><span>AI Steward · Tamam Studio Technology</span></div></div>';
      const video=el.querySelector('video');
      return {destroy(){video?.pause()}};
    }
  };
})();
