(() => {
  'use strict';

  /* ---------- data ---------- */
  const META = JSON.parse(document.getElementById('meta').textContent);
  const Q = META.q; // [{ id, t: topic, k: key, g: group }]
  const TOPICS = META.topics;
  const TOPIC_ORDER = META.topicOrder;
  const N = Q.length;
  const L5 = ['A', 'B', 'C', 'D', 'E'];
  const DURATION = 120 * 60;
  const STORE = 'pgre-practice-exam-v1';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const arts = $$('#questions > .q');
  const rows = $$('#rows > .row');

  /* ---------- saved progress ---------- */
  const blank = {
    practice: () => ({ ans: {}, chk: {}, flag: {}, cur: 0, topic: 'all' }),
    exam: () => ({ ans: {}, flag: {}, cur: 0, elapsed: 0, times: {}, status: 'new', timeUp: false, done: null }),
  };
  function load() {
    let raw = null;
    try { raw = JSON.parse(localStorage.getItem(STORE) || 'null'); } catch (e) { raw = null; }
    const s = raw && typeof raw === 'object' ? raw : {};
    const st = {
      practice: Object.assign(blank.practice(), s.practice || {}),
      exam: Object.assign(blank.exam(), s.exam || {}),
      view: typeof s.view === 'string' ? s.view : 'cover',
      mode: typeof s.mode === 'string' ? s.mode : null,
    };
    if (!TOPICS[st.practice.topic]) st.practice.topic = 'all';
    for (const k of ['cur']) {
      if (!(st.practice[k] >= 0 && st.practice[k] < N)) st.practice[k] = 0;
      if (!(st.exam[k] >= 0 && st.exam[k] < N)) st.exam[k] = 0;
    }
    return st;
  }
  let S = load();
  let saveTimer = 0;
  function save(now) {
    clearTimeout(saveTimer);
    const write = () => { try { localStorage.setItem(STORE, JSON.stringify(S)); } catch (e) { /* storage unavailable: progress lasts for this visit only */ } };
    if (now) write(); else saveTimer = setTimeout(write, 200);
  }

  /* ---------- session state ---------- */
  let view = 'cover';
  let mode = null; // 'practice' | 'exam' | 'review'
  let order = [];
  let cur = 0;
  let missedOnly = false;
  const solOpen = new Set();

  const data = () => (mode === 'practice' ? S.practice : S.exam);
  const idOf = (i) => Q[i].id;
  const revealed = (i) => mode === 'review' || (mode === 'practice' && !!S.practice.chk[idOf(i)]);
  const fmtClock = (sec) => {
    sec = Math.max(0, Math.ceil(sec));
    const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };
  const fmtMin = (sec) => {
    sec = Math.round(sec || 0);
    return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
  };

  /* ---------- views ---------- */
  const views = { cover: $('#view-cover'), quiz: $('#view-quiz'), results: $('#view-results') };
  function showView(v) {
    view = v;
    for (const [k, el] of Object.entries(views)) el.hidden = k !== v;
    S.view = v;
    S.mode = mode;
    save();
    renderTopbar();
    ticking();
    if (v === 'cover') renderCover();
    window.scrollTo(0, 0);
  }
  function renderTopbar() {
    const chip = $('#mode-chip');
    const label = { practice: 'Practice', exam: 'Timed exam', review: 'Review' }[mode];
    chip.hidden = view !== 'quiz' || !label;
    chip.textContent = label || '';
    renderTimer();
  }

  /* ---------- modes ---------- */
  function buildOrder() {
    const all = Q.map((_, i) => i);
    if (mode === 'practice' && S.practice.topic !== 'all') order = all.filter((i) => Q[i].t === S.practice.topic);
    else if (mode === 'review' && missedOnly) order = all.filter((i) => S.exam.ans[idOf(i)] !== Q[i].k);
    else order = all;
    if (!order.length) order = all;
  }
  function startPractice(reset) {
    if (reset) { S.practice = blank.practice(); solOpen.clear(); }
    mode = 'practice';
    $('#topic-filter').value = S.practice.topic;
    buildOrder();
    showView('quiz');
    go(order.includes(S.practice.cur) ? S.practice.cur : order[0], { noScroll: true });
  }
  function startExam(reset) {
    if (reset) { S.exam = blank.exam(); solOpen.clear(); }
    if (S.exam.status === 'done') { showResults(); return; }
    if (S.exam.status === 'new') S.exam.status = 'running';
    mode = 'exam';
    buildOrder();
    showView('quiz');
    go(S.exam.cur, { noScroll: true });
  }
  function startReview(onlyMissed, at) {
    mode = 'review';
    missedOnly = !!onlyMissed;
    buildOrder();
    showView('quiz');
    go(at != null && order.includes(at) ? at : order[0], { noScroll: true });
  }

  /* ---------- question rendering ---------- */
  function go(i, { noScroll = false } = {}) {
    if (!(i >= 0 && i < N)) return;
    if (mode === 'practice' && !order.includes(i)) {
      S.practice.topic = 'all';
      $('#topic-filter').value = 'all';
      buildOrder();
    }
    if (arts[cur]) arts[cur].hidden = true;
    cur = i;
    if (mode !== 'review') data().cur = i;
    arts[i].hidden = false;
    renderQ(i);
    renderBar();
    renderNav();
    renderSheet();
    closeSheet();
    save();
    if (!noScroll) {
      const top = $('#paper').getBoundingClientRect().top;
      if (top < 64) window.scrollBy({ top: top - 72 });
    }
  }

  function renderQ(i) {
    const a = arts[i], q = Q[i], d = data();
    const picked = d.ans[q.id] || null;
    const rev = revealed(i);
    const locked = rev || (mode === 'exam' && S.exam.status !== 'running');
    $$('.ch', a).forEach((lab, k) => {
      const L = L5[k];
      const inp = lab.querySelector('input');
      inp.checked = picked === L;
      inp.disabled = locked;
      lab.classList.toggle('locked', locked);
      lab.classList.toggle('is-key', rev && L === q.k);
      lab.classList.toggle('is-wrong', rev && picked === L && L !== q.k);
      lab.classList.toggle('is-picked', rev && picked === L);
    });
    const check = $('.act-check', a), show = $('.act-reveal', a), fb = $('.feedback', a), solBtn = $('.act-sol', a), sol = $('.sol', a);
    const practiceOpen = mode === 'practice' && !rev;
    check.hidden = !practiceOpen;
    check.disabled = !picked;
    show.hidden = !practiceOpen;
    solBtn.hidden = !rev;
    fb.hidden = !rev;
    if (rev) {
      if (!picked) { fb.className = 'feedback bad'; fb.innerHTML = `<span class="mark" aria-hidden="true">–</span>Not answered. The answer is (${q.k}).`; }
      else if (picked === q.k) { fb.className = 'feedback ok'; fb.innerHTML = '<span class="mark" aria-hidden="true">✓</span>Correct.'; }
      else { fb.className = 'feedback bad'; fb.innerHTML = `<span class="mark" aria-hidden="true">✕</span>Not quite. You chose (${picked}); the answer is (${q.k}).`; }
    } else fb.textContent = '';
    const open = rev && solOpen.has(i);
    sol.hidden = !open;
    solBtn.setAttribute('aria-expanded', String(open));
    solBtn.firstChild.textContent = open ? 'Hide solution ' : 'Show solution ';
    $('.exam-note', a).hidden = !(mode === 'exam');
  }

  function renderBar() {
    const q = Q[cur];
    $('#where').textContent = `Question ${cur + 1} of ${N}`;
    const chip = $('#topic-chip');
    chip.hidden = mode === 'exam';
    chip.textContent = TOPICS[q.t].short;
    const fb = $('#flag-btn');
    fb.hidden = mode === 'review';
    const on = !!(data().flag || {})[q.id];
    fb.setAttribute('aria-pressed', String(on));
    $('#flag-txt').textContent = on ? 'Flagged' : 'Flag';
  }

  function renderNav() {
    const pos = order.indexOf(cur);
    $('#prev').disabled = pos <= 0;
    const next = $('#next');
    const last = pos >= order.length - 1;
    if (mode === 'exam' && last) {
      next.dataset.act = 'submit';
      next.textContent = 'Submit exam';
      next.disabled = false;
    } else {
      next.dataset.act = 'next';
      next.textContent = 'Next →';
      next.disabled = last;
    }
    let mid = '';
    if (mode === 'practice' && S.practice.topic !== 'all') mid = `${pos + 1} of ${order.length} in ${TOPICS[S.practice.topic].short}`;
    else if (mode === 'review' && missedOnly) mid = `${pos + 1} of ${order.length} missed`;
    $('#nav-mid').textContent = mid;
  }

  /* ---------- answer sheet ---------- */
  function renderSheet() {
    const d = data();
    const inOrder = new Set(order);
    let answered = 0, flagged = 0, checked = 0, right = 0;
    rows.forEach((row, i) => {
      const q = Q[i], picked = d.ans[q.id], rev = revealed(i), fl = mode !== 'review' && !!(d.flag || {})[q.id];
      if (picked) answered++;
      if (fl) flagged++;
      if (rev) { checked++; if (picked === q.k) right++; }
      row.classList.toggle('cur', i === cur);
      row.classList.toggle('flag', fl);
      row.classList.toggle('ok', rev && picked === q.k);
      row.classList.toggle('bad', rev && picked !== q.k);
      row.classList.toggle('dim', !inOrder.has(i));
      for (let k = 0; k < 5; k++) {
        const b = row.children[k + 1], L = L5[k];
        b.classList.toggle('on', picked === L);
        b.classList.toggle('key', rev && q.k === L);
        b.classList.toggle('wrong', rev && picked === L && L !== q.k);
      }
      if (i === cur) row.setAttribute('aria-current', 'true'); else row.removeAttribute('aria-current');
      let lab = `Question ${i + 1}`;
      lab += picked ? `, answered ${picked}` : ', not answered';
      if (rev) lab += picked === q.k ? ', correct' : `, answer ${q.k}`;
      if (fl) lab += ', flagged';
      row.setAttribute('aria-label', lab);
    });
    const count = $('#sheet-count'), stats = $('#sheet-stats'), acts = $('#sheet-actions');
    $('#sheet-filter').hidden = mode !== 'practice';
    $('#sheet').dataset.mode = mode || '';
    if (mode === 'practice') {
      count.textContent = `${checked}/${N} checked`;
      stats.innerHTML = `<span>Checked <b>${checked}</b></span><span>Correct <b>${right}</b></span>${checked ? `<span><b>${Math.round((100 * right) / checked)}%</b></span>` : ''}${flagged ? `<span>Flagged <b>${flagged}</b></span>` : ''}`;
      acts.innerHTML = '<button type="button" class="btn quiet" data-act="practice-reset">Reset practice</button>';
    } else if (mode === 'exam') {
      count.textContent = `${answered}/${N} answered`;
      stats.innerHTML = `<span>Answered <b>${answered}</b></span><span>Left <b>${N - answered}</b></span>${flagged ? `<span>Flagged <b>${flagged}</b></span>` : ''}`;
      acts.innerHTML = '<button type="button" class="btn primary" data-act="submit">Submit exam</button>';
    } else {
      count.textContent = `${right}/${N} correct`;
      stats.innerHTML = `<span>Correct <b>${right}</b></span><span>Wrong <b>${N - right - (N - answered)}</b></span><span>Blank <b>${N - answered}</b></span>`;
      acts.innerHTML = `<button type="button" class="btn" data-act="toggle-missed">${missedOnly ? 'Show all questions' : 'Show missed only'}</button><button type="button" class="btn quiet" data-act="results">Back to results</button>`;
    }
  }
  function openSheet() { $('#sheet').classList.add('open'); $('#scrim').classList.add('open'); $('#sheet-toggle').setAttribute('aria-expanded', 'true'); }
  function closeSheet() { $('#sheet').classList.remove('open'); $('#scrim').classList.remove('open'); $('#sheet-toggle').setAttribute('aria-expanded', 'false'); }

  /* ---------- actions ---------- */
  function pick(L) {
    if (view !== 'quiz' || revealed(cur)) return;
    if (mode === 'exam' && S.exam.status !== 'running') return;
    data().ans[idOf(cur)] = L;
    renderQ(cur);
    renderSheet();
    save();
  }
  function checkAnswer() {
    if (mode !== 'practice' || revealed(cur) || !S.practice.ans[idOf(cur)]) return;
    S.practice.chk[idOf(cur)] = 1;
    renderQ(cur);
    renderSheet();
    save();
    const b = $('.act-sol', arts[cur]);
    if (b) b.focus({ preventScroll: true });
  }
  function revealAnswer() {
    if (mode !== 'practice' || revealed(cur)) return;
    S.practice.chk[idOf(cur)] = 1;
    solOpen.add(cur);
    renderQ(cur);
    renderSheet();
    save();
  }
  function toggleSolution() {
    if (!revealed(cur)) return;
    if (solOpen.has(cur)) solOpen.delete(cur); else solOpen.add(cur);
    renderQ(cur);
    if (solOpen.has(cur)) {
      const sol = $('.sol', arts[cur]);
      const r = sol.getBoundingClientRect();
      if (r.top > window.innerHeight - 120) window.scrollBy({ top: r.top - window.innerHeight / 3, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
  }
  function toggleFlag() {
    if (mode === 'review' || view !== 'quiz') return;
    const d = data(), id = idOf(cur);
    if (d.flag[id]) delete d.flag[id]; else d.flag[id] = 1;
    renderBar();
    renderSheet();
    save();
  }
  function step(dir) {
    const pos = order.indexOf(cur) + dir;
    if (pos >= 0 && pos < order.length) go(order[pos]);
  }

  /* ---------- exam clock ---------- */
  let tickId = 0, last = 0, ticks = 0;
  function ticking() {
    const should = view === 'quiz' && mode === 'exam' && S.exam.status === 'running' && document.visibilityState === 'visible';
    if (should && !tickId) { last = performance.now(); tickId = setInterval(tick, 500); }
    else if (!should && tickId) { tick(); stopTick(); save(true); }
    renderTimer();
  }
  function stopTick() { if (tickId) { clearInterval(tickId); tickId = 0; } }
  function tick() {
    const now = performance.now();
    const dt = Math.min(Math.max((now - last) / 1000, 0), 30);
    last = now;
    if (mode !== 'exam' || S.exam.status !== 'running') return;
    S.exam.elapsed += dt;
    const id = idOf(cur);
    S.exam.times[id] = (S.exam.times[id] || 0) + dt;
    if (S.exam.elapsed >= DURATION) { S.exam.elapsed = DURATION; finishExam(true); return; }
    renderTimer();
    if (++ticks % 10 === 0) save();
  }
  function renderTimer() {
    const el = $('#timer');
    const show = view === 'quiz' && mode === 'exam';
    el.hidden = !show;
    if (!show) return;
    const rem = DURATION - S.exam.elapsed;
    el.textContent = fmtClock(rem);
    el.classList.toggle('warn', rem <= 15 * 60 && rem > 5 * 60);
    el.classList.toggle('late', rem <= 5 * 60);
  }
  function askSubmit() {
    const answered = Q.filter((q) => S.exam.ans[q.id]).length;
    const flagged = Q.filter((q) => S.exam.flag[q.id]).length;
    const parts = [`You have answered ${answered} of ${N} questions.`];
    if (flagged) parts.push(`${flagged} ${flagged === 1 ? 'question is' : 'questions are'} still flagged.`);
    if (answered < N) parts.push('Blank answers count as wrong, and wrong answers cost nothing extra, so a guess is free.');
    parts.push('You cannot change answers after you submit.');
    confirmBox({ title: 'Submit the exam?', text: parts.join(' '), ok: 'Submit exam', cancel: 'Keep working' }, () => finishExam(false));
  }
  function finishExam(timeUp) {
    stopTick();
    S.exam.status = 'done';
    S.exam.done = Date.now();
    S.exam.timeUp = !!timeUp;
    save(true);
    showResults();
  }

  /* ---------- results ---------- */
  function showResults() {
    mode = 'review';
    missedOnly = false;
    renderResults();
    showView('results');
  }
  function renderResults() {
    const d = S.exam;
    let right = 0, empty = 0;
    const byT = {};
    Q.forEach((q) => {
      const t = byT[q.t] || (byT[q.t] = { n: 0, c: 0 });
      t.n++;
      const a = d.ans[q.id];
      if (!a) empty++;
      if (a === q.k) { right++; t.c++; }
    });
    const wrong = N - right - empty;
    const pct = Math.round((100 * right) / N);
    $('#r-score').innerHTML = `${right}<small> / ${N}</small>`;
    const used = Math.min(d.elapsed, DURATION);
    const answered = N - empty;
    const lines = [
      `<div class="line"><b>${pct}%</b> correct · <b>${wrong}</b> wrong · <b>${empty}</b> blank</div>`,
      `<div class="line">Time used <b>${fmtClock(used)}</b> of 2:00:00 · average <b>${fmtMin(answered ? used / answered : 0)}</b> per answered question (target 1:43)</div>`,
    ];
    if (d.done) lines.push(`<div class="line">Submitted ${new Date(d.done).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</div>`);
    if (d.timeUp) lines.unshift('<div class="timeup">Time ran out, so the exam was submitted automatically.</div>');
    $('#r-meta').innerHTML = lines.join('');

    $('#r-topics').innerHTML = TOPIC_ORDER.map((k) => {
      const t = byT[k] || { n: 0, c: 0 };
      const p = t.n ? Math.round((100 * t.c) / t.n) : 0;
      return `<tr><td>${TOPICS[k].name}<div class="meter" aria-hidden="true"><i style="width:${p}%"></i></div></td><td class="num">${t.c}/${t.n}</td><td class="num">${p}%</td></tr>`;
    }).join('');

    $('#r-cells').innerHTML = Q.map((q, i) => {
      const a = d.ans[q.id];
      const cls = !a ? '' : a === q.k ? 'ok' : 'bad';
      const what = !a ? 'blank' : a === q.k ? `correct (${a})` : `chose ${a}, answer ${q.k}`;
      return `<button type="button" class="cell ${cls}" data-i="${i}" title="Question ${i + 1}: ${what} · ${fmtMin(d.times[q.id])}" aria-label="Question ${i + 1}, ${what}">${i + 1}</button>`;
    }).join('');

    const slow = Q.map((q, i) => ({ i, s: d.times[q.id] || 0, q })).filter((x) => x.s >= 1).sort((a, b) => b.s - a.s).slice(0, 5);
    $('#r-slow').innerHTML = slow.length
      ? slow.map((x) => `<li><button type="button" class="linkish" data-i="${x.i}">Question ${x.i + 1} · ${TOPICS[x.q.t].short}</button><b>${fmtMin(x.s)}</b></li>`).join('')
      : '<li>No timing data.</li>';
    $('#r-review-missed').disabled = right === N;
  }

  /* ---------- cover ---------- */
  function renderCover() {
    const p = S.practice, e = S.exam;
    const nChk = Object.keys(p.chk).length;
    const nAns = Object.keys(p.ans).length;
    const nRight = Q.filter((q) => p.chk[q.id] && p.ans[q.id] === q.k).length;
    $('#practice-status').textContent = nChk ? `${nChk} of ${N} checked · ${nRight} correct` : nAns ? `${nAns} answered, none checked yet` : 'Not started';
    $('#practice-actions').innerHTML = nChk || nAns
      ? '<button type="button" class="btn primary" data-act="practice">Resume practice</button><button type="button" class="btn quiet" data-act="practice-reset">Start over</button>'
      : '<button type="button" class="btn primary" data-act="practice">Start practice</button>';
    $$('#mini-grid > .mb').forEach((b, i) => {
      const q = Q[i], a = p.ans[q.id], c = !!p.chk[q.id];
      b.classList.toggle('ok', c && a === q.k);
      b.classList.toggle('bad', c && a !== q.k);
      b.classList.toggle('on', !c && !!a);
      b.setAttribute('aria-label', `Question ${i + 1}${c ? (a === q.k ? ', right' : ', wrong') : a ? ', answered' : ''}`);
    });
    $('#mini-count').textContent = `${nChk}/${N} checked`;
    const eAns = Q.filter((q) => e.ans[q.id]).length;
    if (e.status === 'running') {
      $('#exam-status').textContent = `In progress · ${fmtClock(DURATION - e.elapsed)} left · ${eAns} answered`;
      $('#exam-actions').innerHTML = '<button type="button" class="btn primary" data-act="exam">Resume exam</button><button type="button" class="btn quiet" data-act="exam-reset">Start over</button>';
    } else if (e.status === 'done') {
      const right = Q.filter((q) => e.ans[q.id] === q.k).length;
      $('#exam-status').textContent = `Last score: ${right} of ${N}${e.done ? ' · ' + new Date(e.done).toLocaleDateString([], { dateStyle: 'medium' }) : ''}`;
      $('#exam-actions').innerHTML = '<button type="button" class="btn primary" data-act="results">See results</button><button type="button" class="btn quiet" data-act="exam-reset">Retake</button>';
    } else {
      $('#exam-status').textContent = 'Not started · the clock starts when you begin';
      $('#exam-actions').innerHTML = '<button type="button" class="btn primary" data-act="exam">Start the 2-hour exam</button>';
    }
  }

  /* ---------- dialogs ---------- */
  let onConfirm = null;
  function openDialog(dlg) {
    if (typeof dlg.showModal === 'function') { try { dlg.showModal(); return; } catch (e) { /* fall through */ } }
    dlg.setAttribute('open', '');
  }
  function closeDialog(dlg) {
    if (typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open');
  }
  function confirmBox({ title, text, ok, cancel = 'Cancel' }, fn) {
    $('#dlg-confirm-h').textContent = title;
    $('#dlg-confirm-text').textContent = text;
    $('#dlg-ok').textContent = ok;
    $('#dlg-cancel').textContent = cancel;
    onConfirm = fn;
    openDialog($('#dlg-confirm'));
  }
  $('#dlg-ok').addEventListener('click', () => {
    const fn = onConfirm;
    onConfirm = null;
    closeDialog($('#dlg-confirm'));
    if (fn) fn();
  });
  $('#dlg-cancel').addEventListener('click', () => { onConfirm = null; closeDialog($('#dlg-confirm')); });
  $$('dialog').forEach((dlg) => {
    dlg.addEventListener('click', (e) => { if (e.target === dlg) closeDialog(dlg); });
    $$('[data-close]', dlg).forEach((b) => b.addEventListener('click', () => closeDialog(dlg)));
  });

  /* ---------- events ---------- */
  function runAct(act) {
    switch (act) {
      case 'practice': startPractice(false); break;
      case 'practice-reset':
        confirmBox({ title: 'Reset practice?', text: 'This clears your practice answers, checks, and flags. Your timed-exam results are not affected.', ok: 'Reset practice' }, () => {
          S.practice = blank.practice();
          solOpen.clear();
          save(true);
          if (view === 'quiz') startPractice(false); else renderCover();
        });
        break;
      case 'exam': startExam(false); break;
      case 'exam-reset':
        confirmBox({ title: S.exam.status === 'done' ? 'Retake the exam?' : 'Start the exam over?', text: 'This clears your timed-exam answers, flags, and clock. Practice progress is not affected.', ok: 'Clear and start' }, () => startExam(true));
        break;
      case 'submit': askSubmit(); break;
      case 'results': showResults(); break;
      case 'toggle-missed': {
        missedOnly = !missedOnly;
        buildOrder();
        go(order.includes(cur) ? cur : order[0], { noScroll: true });
        break;
      }
      case 'next': step(1); break;
      default: break;
    }
  }
  document.addEventListener('click', (e) => {
    const t = e.target;
    const actEl = t.closest('[data-act]');
    if (actEl && !actEl.disabled) { runAct(actEl.dataset.act); return; }
    const row = t.closest('#rows > .row');
    if (row) { go(+row.dataset.i); return; }
    const mb = t.closest('#mini-grid > .mb');
    if (mb) { S.practice.cur = +mb.dataset.i; startPractice(false); go(+mb.dataset.i, { noScroll: true }); return; }
    const cell = t.closest('#r-cells .cell, #r-slow [data-i]');
    if (cell) { startReview(false, +cell.dataset.i); return; }
    if (t.closest('.act-check')) { checkAnswer(); return; }
    if (t.closest('.act-reveal')) { revealAnswer(); return; }
    if (t.closest('.act-sol')) { toggleSolution(); return; }
  });
  $('#questions').addEventListener('change', (e) => {
    const inp = e.target;
    if (!inp || inp.type !== 'radio') return;
    if (+inp.closest('.q').dataset.i !== cur) return;
    pick(inp.value);
  });
  $('#prev').addEventListener('click', () => step(-1));
  $('#flag-btn').addEventListener('click', toggleFlag);
  $('#sheet-toggle').addEventListener('click', () => ($('#sheet').classList.contains('open') ? closeSheet() : openSheet()));
  $('#scrim').addEventListener('click', closeSheet);
  $('#go-home').addEventListener('click', () => showView('cover'));
  $('#open-const').addEventListener('click', () => openDialog($('#dlg-const')));
  $('#topic-filter').addEventListener('change', (e) => {
    S.practice.topic = e.target.value;
    buildOrder();
    go(order.includes(cur) ? cur : order[0], { noScroll: true });
  });
  $('#r-review-missed').addEventListener('click', () => startReview(true));
  $('#r-review-all').addEventListener('click', () => startReview(false));
  document.addEventListener('visibilitychange', () => { ticking(); if (document.visibilityState === 'hidden') save(true); });
  window.addEventListener('pagehide', () => save(true));

  document.addEventListener('keydown', (e) => {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
    if ($('dialog[open]')) return;
    if (view !== 'quiz') return;
    const tg = e.target;
    const tag = tg.tagName;
    if (tag === 'SELECT' || tag === 'TEXTAREA' || (tag === 'INPUT' && tg.type !== 'radio')) return;
    const k = e.key;
    let L = null;
    if (/^[a-e]$/i.test(k)) L = k.toUpperCase();
    else if (/^[1-5]$/.test(k)) L = L5[+k - 1];
    if (L) {
      if (revealed(cur)) return;
      const inp = $(`input[value="${L}"]`, arts[cur]);
      if (inp && !inp.disabled) { inp.checked = true; pick(L); }
      e.preventDefault();
      return;
    }
    if (k === 'Escape') { closeSheet(); return; }
    if (tag === 'BUTTON' && (k === 'Enter' || k === ' ')) return;
    if (k === 'Enter') { if (mode === 'practice') { checkAnswer(); e.preventDefault(); } return; }
    if (tg.type === 'radio' && k.startsWith('Arrow')) return;
    if (k === 'ArrowRight' || k === 'j' || k === 'J') { step(1); e.preventDefault(); return; }
    if (k === 'ArrowLeft' || k === 'k' || k === 'K') { step(-1); e.preventDefault(); return; }
    if (k === 's' || k === 'S') { toggleSolution(); e.preventDefault(); return; }
    if (k === 'f' || k === 'F') { toggleFlag(); e.preventDefault(); }
  });

  /* ---------- start ---------- */
  function boot() {
    renderCover();
    if (S.view === 'quiz' && S.mode === 'practice') startPractice(false);
    else if (S.view === 'quiz' && S.mode === 'review' && S.exam.status === 'done') startReview(false, S.exam.cur);
    else if ((S.view === 'results' || S.mode === 'review') && S.exam.status === 'done') showResults();
    else { mode = null; showView('cover'); }
  }
  boot();
})();
