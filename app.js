(function () {
  'use strict';
  const tasks = Object.freeze({
    press: { title: 'Press Bell', video: 'assets/videos/press_bell.mp4', poster: 'assets/images/press_bell_poster.jpg', width: 718, height: 634 },
    push: { title: 'Push Ball', video: 'assets/videos/push_ball.mp4', poster: 'assets/images/push_ball_poster.jpg', width: 718, height: 638 },
    move: { title: 'Move Sand Bag', video: 'assets/videos/move_sand_bag.mp4', poster: 'assets/images/move_sand_bag_poster.jpg', width: 720, height: 634 }
  });
  const video = document.getElementById('training-video');
  const inference = document.getElementById('inference-video');
  const panel = document.getElementById('training-panel');
  const status = document.getElementById('training-status');
  const error = document.getElementById('training-error');
  const tabs = Array.from(document.querySelectorAll('[data-task]'));
  let current = 'press';

  function playTraining() {
    const promise = video.play();
    if (promise && promise.catch) promise.catch(() => {});
  }
  function selectTask(key, autoplay) {
    if (!Object.prototype.hasOwnProperty.call(tasks, key)) throw new RangeError('Unknown training task.');
    const task = tasks[key];
    if (key !== current) {
      video.pause();
      current = key;
      video.src = task.video;
      video.poster = task.poster;
      video.width = task.width;
      video.height = task.height;
      video.setAttribute('aria-label', task.title + ' training video');
      const fallback = video.querySelector('a');
      if (fallback) fallback.href = task.video;
      video.load();
    }
    error.hidden = true;
    tabs.forEach(tab => {
      const active = tab.dataset.task === current;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active) panel.setAttribute('aria-labelledby', tab.id);
    });
    status.textContent = task.title + ' training video selected.';
    // Start on an explicit task selection. Only this one training player exists.
    if (autoplay) playTraining();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTask(tab.dataset.task, true));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      tabs[next].focus();
      selectTask(tabs[next].dataset.task, true);
    });
  });
  video.addEventListener('play', () => inference.pause());
  inference.addEventListener('play', () => video.pause());
  video.addEventListener('error', () => {
    error.hidden = false;
    error.textContent = 'Training video unavailable. Keep the complete assets folder beside index.html.';
  });
  inference.addEventListener('error', () => {
    const message = document.getElementById('inference-error');
    message.hidden = false;
    message.textContent = 'Inference video unavailable. Keep the complete assets folder beside index.html.';
  });

  const copy = document.getElementById('copy-bibtex');
  const citation = document.getElementById('bibtex-code');
  const copyStatus = document.getElementById('copy-status');
  let copyTimer;
  function copyFallback(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.cssText = 'position:fixed;left:-9999px;top:0;';
    document.body.appendChild(textarea);
    textarea.select();
    let success = false;
    try { success = document.execCommand('copy'); } catch (_) {}
    textarea.remove();
    copy.focus({ preventScroll: true });
    return success;
  }
  copy.addEventListener('click', async () => {
    const text = citation.textContent.trim();
    let success = false;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try { await navigator.clipboard.writeText(text); success = true; } catch (_) {}
    }
    if (!success) success = copyFallback(text);
    if (success) {
      copy.textContent = 'Copied';
      copyStatus.textContent = 'BibTeX copied to clipboard.';
    } else {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(citation);
      selection.removeAllRanges(); selection.addRange(range);
      copy.textContent = 'Copy selected text';
      copyStatus.textContent = 'Citation selected. Use your keyboard to copy it.';
    }
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => { copy.textContent = 'Copy BibTeX'; }, 1800);
  });
  window.OHPRLProject = Object.freeze({ selectTask: key => selectTask(key, false),
    getSelectedTask: () => current, tasks });
})();
