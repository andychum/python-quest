'use strict';

const STORAGE_KEY = 'python-quest-reading-v1';
const main = document.querySelector('#main');
const worldNav = document.querySelector('#worldnav');
const sidebar = document.querySelector('#sidebar');
const menu = document.querySelector('#menubtn');
const totalQuestions = WORLDS.reduce((sum, world) => sum + world.quiz.length, 0);
const totalConcepts = WORLDS.reduce((sum, world) => sum + world.concepts.length, 0);

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

let progress = loadProgress();
progress.solved ??= {};
progress.answers ??= {};
let activeWorld = -1;
let mode = 'learn';

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // The current session still works if the browser disables storage.
  }
}

const escapeHtml = text => String(text)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&#39;');

const codeBlock = code => '<pre class="code"><code>' + escapeHtml(code) + '</code></pre>';
const questionId = (world, index) => world + ':' + index;
const countSolved = world => WORLDS[world].quiz.filter((_, i) => progress.solved[questionId(world, i)]).length;
const worldButton = (i, label, style = '') =>
  '<button class="btn ' + style + '" data-world="' + i + '">' + escapeHtml(label) + '</button>';

function updateNav() {
  worldNav.innerHTML = WORLDS.map((world, i) =>
    '<button class="sideitem ' + (activeWorld === i ? 'active' : '') + '" data-world="' + i + '"' +
    (activeWorld === i ? ' aria-current="true"' : '') + '><span class="number">' + (i + 1) +
    '</span><span>' + escapeHtml(world.title) + '</span><span class="tick">' +
    (countSolved(i) === world.quiz.length ? '✓' : '') + '</span></button>').join('');
}

function focusHeading() {
  main.querySelector('h1')?.focus();
}

function showHome() {
  activeWorld = -1;
  const firstIncomplete = WORLDS.findIndex((world, i) => countSolved(i) < world.quiz.length);
  const start = firstIncomplete < 0 ? 0 : firstIncomplete;
  const solved = WORLDS.reduce((sum, _, i) => sum + countSolved(i), 0);
  main.innerHTML = `
    <div class="hero"><div>
      <h1 tabindex="-1">Learn to read Python for AI</h1>
      <p>Learn a concept, follow a worked example, then choose what the code does. The examples use fictional tutoring, scheduling and AI projects.</p>
    </div></div>
    <div class="card">
      <p class="reading-count">${totalConcepts} concepts · ${solved}/${totalQuestions} questions answered correctly</p>
      <div class="btnbar">${worldButton(start, solved ? 'Continue learning' : 'Start with World 1', 'primary')}</div>
    </div>
    <h2>Choose a world</h2>
    <div class="worldgrid">${WORLDS.map((world, i) => `
      <button class="worldcard" data-world="${i}">
        <span aria-hidden="true">${world.icon}</span>
        <h3>${i + 1}. ${escapeHtml(world.title)}</h3>
        <p>${escapeHtml(world.subtitle)}</p>
        <small>${countSolved(i)}/${world.quiz.length} correct</small>
      </button>`).join('')}
    </div>`;
  updateNav();
}

function renderConcepts(world) {
  return `<p class="intro">Read the example one step at a time. Then try four quick questions.</p>
    <div class="concepts">${world.concepts.map(([title, definition, code, trace]) => `
      <article class="card">
        <h2>${escapeHtml(title)}</h2>
        <p>${escapeHtml(definition)}</p>
        ${codeBlock(code)}
        <div class="note walkthrough"><strong>What happens, step by step</strong><ol>${trace.split('\n').map(step => `<li>${escapeHtml(step)}</li>`).join('')}</ol></div>
      </article>`).join('')}
    </div><div class="btnbar"><button class="btn primary" data-mode="quiz">Start multiple-choice practice →</button></div>`;
}

function renderQuiz(world) {
  return `<p class="intro">Read the code, predict what happens, then pick an answer. You can retry any question.</p>
    ${world.quiz.map(([prompt, code, correct, choices], i) => `
      <article class="qbox" id="question-${i}" tabindex="-1">
        <span class="badge">Question ${i + 1} of ${world.quiz.length}</span>
        <h3>${escapeHtml(prompt)}</h3>
        ${codeBlock(code)}
        <div class="choices">${choices.map(([label], j) => `
          <button class="choice" data-choice="${j}" data-question="${i}" aria-pressed="false">
            ${String.fromCharCode(65 + j)}. ${escapeHtml(label)}
          </button>`).join('')}
        </div>
        <div id="feedback-${i}" aria-live="polite"></div>
        <details class="note"><summary>Show answer and explanation</summary>
          <p><strong>${escapeHtml(choices[correct][0])}</strong> ${escapeHtml(choices[correct][1])}</p>
        </details>
      </article>`).join('')}`;
}

function updateChoice(question, choice) {
  const [, , correct, choices] = WORLDS[activeWorld].quiz[question];
  const box = main.querySelector('#question-' + question);
  const isCorrect = choice === correct;

  box.querySelectorAll('[data-choice]').forEach(button => {
    const selected = Number(button.dataset.choice) === choice;
    button.setAttribute('aria-pressed', String(selected));
    button.classList.toggle('right', selected && isCorrect);
    button.classList.toggle('wrong', selected && !isCorrect);
  });
  box.querySelector('#feedback-' + question).innerHTML = `
    <div class="feedback ${isCorrect ? 'good' : 'bad'}">
      <strong>${isCorrect ? '✓ Correct' : 'Try again'}</strong>
      <p>${escapeHtml(choices[choice][1])}</p>
    </div>`;
}

function showWorld(index, nextMode = 'learn') {
  activeWorld = index;
  mode = nextMode;
  const world = WORLDS[index];
  main.innerHTML = `
    <div class="hero"><div>
      <span class="tag">World ${index + 1} of ${WORLDS.length}</span>
      <h1 tabindex="-1">${world.icon} ${escapeHtml(world.title)}</h1>
      <p>${escapeHtml(world.subtitle)}</p>
    </div></div>
    <div class="btnbar world-actions">
      <button class="btn" data-mode="learn" aria-pressed="${mode === 'learn'}">Learn the concepts</button>
      <button class="btn" data-mode="quiz" aria-pressed="${mode === 'quiz'}">Multiple-choice practice</button>
    </div>
    <p class="reading-count" id="world-score">${countSolved(index)}/${world.quiz.length} correct</p>
    <section>${mode === 'learn' ? renderConcepts(world) : renderQuiz(world)}</section>
    <div class="btnbar">
      ${index > 0 ? worldButton(index - 1, '← Previous world') : ''}
      <button class="btn" data-home>All worlds</button>
      ${index < WORLDS.length - 1 ? worldButton(index + 1, 'Next world →') : ''}
    </div>`;
  if (mode === 'quiz') {
    world.quiz.forEach(([, , , choices], i) => {
      const saved = progress.answers[questionId(index, i)];
      if (Number.isInteger(saved) && choices[saved]) updateChoice(i, saved);
    });
  }
  updateNav();
  focusHeading();
}

function showReview() {
  activeWorld = -1;
  const missed = WORLDS.flatMap((world, i) => world.quiz.flatMap(([prompt, , correct], j) => {
    const lastAnswer = progress.answers[questionId(i, j)];
    if (lastAnswer === undefined || lastAnswer === correct) return [];
    return [`<article class="card"><p class="small">${escapeHtml(world.title)}</p>
      <h2>${escapeHtml(prompt)}</h2><button class="btn" data-retry="${i}:${j}">Try this question again</button></article>`];
  }));
  main.innerHTML = `<h1 tabindex="-1">Review mistakes</h1>
    ${missed.join('') || '<p class="intro">Questions to retry will appear here after an incorrect answer.</p>'}
    <button class="btn" data-home>All worlds</button>`;
  updateNav();
  focusHeading();
}

function closeMenu() {
  sidebar.classList.remove('show');
  menu.setAttribute('aria-expanded', 'false');
}

menu.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', String(sidebar.classList.toggle('show')));
});

document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  const { dataset } = button;
  if ('world' in dataset) {
    closeMenu();
    showWorld(Number(dataset.world));
  } else if ('mode' in dataset) {
    showWorld(activeWorld, dataset.mode);
  } else if ('home' in dataset) {
    closeMenu();
    showHome();
    focusHeading();
  } else if ('review' in dataset) {
    closeMenu();
    showReview();
  } else if ('choice' in dataset) {
    const question = Number(dataset.question);
    const choice = Number(dataset.choice);
    const id = questionId(activeWorld, question);
    const world = WORLDS[activeWorld];
    progress.answers[id] = choice;
    if (choice === world.quiz[question][2]) progress.solved[id] = true;
    saveProgress();
    updateChoice(question, choice);
    main.querySelector('#world-score').textContent = countSolved(activeWorld) + '/' + world.quiz.length + ' correct';
    updateNav();
  } else if ('retry' in dataset) {
    const [world, question] = dataset.retry.split(':').map(Number);
    showWorld(world, 'quiz');
    main.querySelector('#question-' + question).focus();
  } else if ('reset' in dataset && confirm('Reset your Python Quest reading progress in this browser?')) {
    progress = { solved: {}, answers: {} };
    saveProgress();
    closeMenu();
    showHome();
    focusHeading();
  }
});

showHome();
