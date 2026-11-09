const notes = [
  {id:'active-recall',title:'主動回想：把記憶從腦中拿出來',category:'讀書方法',minutes:5,tags:['複習','記憶'],summary:'讀完先闔上筆記，試著說出自己記得什麼。',content:'<p>主動回想是先嘗試從記憶中提取資訊，再回頭檢查遺漏。它能讓複習從「重新看過」變成「確認自己能不能想起來」。</p><h3>怎麼做</h3><ul><li>讀完一小段後先把書闔上。</li><li>用自己的話寫下三個重點，或畫出概念關係。</li><li>打開資料核對，補上忘記或理解不清楚的地方。</li></ul><h3>小提醒</h3><div class="dialog-tip">想不起來是找出盲點的線索，不是對能力的評價。先從短短一段開始就好。</div>'},
  {id:'pomodoro',title:'番茄鐘：為專注設定一個邊界',category:'時間規劃',minutes:4,tags:['專注','休息'],summary:'把任務切成一段段可開始的時間，降低拖延門檻。',content:'<p>番茄鐘用一段專注時間搭配短暫休息，幫助你把模糊的「要讀書」變成明確的開始與結束。</p><h3>怎麼做</h3><ul><li>選一項具體任務，例如整理一頁課堂筆記。</li><li>設定 25 分鐘計時，期間只處理這件事。</li><li>時間到後休息 5 分鐘；完成四輪後安排較長休息。</li></ul><h3>小提醒</h3><div class="dialog-tip">25 分鐘只是常見起點。若不合你的狀態，可以縮短或延長專注區段。</div>'},
  {id:'weekly-plan',title:'每週回顧：讓計畫貼近真實生活',category:'時間規劃',minutes:6,tags:['規劃','回顧'],summary:'用十分鐘看看進度，再安排下一週的優先順序。',content:'<p>好的計畫會為變動留空間。每週簡短回顧，能把注意力帶回真正重要的事情，也看見哪些安排需要調整。</p><h3>怎麼做</h3><ul><li>記下本週完成的一件事與一個卡住的地方。</li><li>選出下週最重要的一至三項任務。</li><li>先排固定課程，再放入讀書時段、休息與緩衝。</li></ul><h3>小提醒</h3><div class="dialog-tip">如果一週計畫總是塞不下，先減少承諾的事情，不必把休息拿掉。</div>'},
  {id:'study-space',title:'打造能開始的讀書環境',category:'讀書方法',minutes:4,tags:['環境','專注'],summary:'先移開一個干擾，再把當下需要的材料放在手邊。',content:'<p>環境不必完美才開始。稍微減少干擾、讓教材和工具容易取得，就能省下每次開始前的準備力氣。</p><h3>怎麼做</h3><ul><li>選一個相對固定、容易回到的讀書位置。</li><li>把手機放到看不到或需要起身才拿得到的地方。</li><li>桌面只留這一段任務需要的資料與工具。</li></ul><h3>小提醒</h3><div class="dialog-tip">如果住處吵雜，圖書館或系館公共空間也可以成為你的固定起點。</div>'},
  {id:'sleep-and-study',title:'休息不是中斷，是學習的一部分',category:'身心照顧',minutes:5,tags:['休息','狀態'],summary:'留意精神與睡眠狀況，調整當天的學習強度。',content:'<p>學習需要注意力，而注意力也會受到疲累、壓力與生活狀態影響。把休息納入規劃，是讓節奏可以持續的一種方式。</p><h3>怎麼做</h3><ul><li>長時間讀書時安排短暫起身、喝水或伸展。</li><li>睡前把明天的第一個小任務寫下來，減少反覆惦記。</li><li>若今天狀態很差，先完成最低限度的一步，再評估是否繼續。</li></ul><h3>小提醒</h3><div class="dialog-tip">這不是醫療建議。如果身心困擾持續影響生活，可以找可信任的人或校內資源聊聊。</div>'},
  {id:'start-small',title:'五分鐘起步：先做最小的一步',category:'讀書方法',minutes:3,tags:['開始','習慣'],summary:'把「準備考試」縮小成一個五分鐘內能完成的動作。',content:'<p>任務很大時，最難的常是開始。把它拆成一個很小、很具體的動作，可以先跨過起步的門檻。</p><h3>怎麼做</h3><ul><li>把「讀完這一章」改成「打開課本，讀第一個小節」。</li><li>設定五分鐘，只承諾先做這麼久。</li><li>時間到後重新決定：繼續、休息，或調整任務。</li></ul><h3>小提醒</h3><div class="dialog-tip">完成五分鐘已經算完成一次開始。是否繼續，由你依當下狀態決定。</div>'}
];

const grid = document.querySelector('#note-grid');
const search = document.querySelector('#search-input');
const dialog = document.querySelector('#note-dialog');
const dialogContent = document.querySelector('#dialog-content');
let activeCategory = '全部';

function renderNotes() {
  const query = search.value.trim().toLocaleLowerCase();
  const visible = notes.filter(note => {
    const matchesCategory = activeCategory === '全部' || note.category === activeCategory;
    const text = [note.title, note.category, note.summary, ...note.tags].join(' ').toLocaleLowerCase();
    return matchesCategory && text.includes(query);
  });
  grid.innerHTML = visible.length ? visible.map((note, index) => {
    const typeClass = note.category === '時間規劃' ? 'time' : note.category === '身心照顧' ? 'care' : '';
    return `<article class="note-card" tabindex="0" role="button" aria-label="閱讀：${note.title}" data-note="${note.id}">
      <div class="card-top"><span class="category ${typeClass}">${note.category}</span><span class="reading-time">${String(index + 1).padStart(2,'0')} / ${note.minutes} MIN</span></div>
      <h3>${note.title}</h3><p>${note.summary}</p><div class="card-bottom">${note.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}<span class="card-arrow">↗</span></div>
    </article>`;
  }).join('') : '<div class="empty-state">找不到符合條件的筆記，試試其他關鍵字或分類。</div>';
}

function openNote(id) {
  const note = notes.find(item => item.id === id);
  if (!note) return;
  dialogContent.innerHTML = `<div class="dialog-meta">${note.category}　/　約 ${note.minutes} 分鐘</div><h2>${note.title}</h2><div class="dialog-tags">${note.tags.map(tag => `<span>#${tag}</span>`).join('')}</div><div class="dialog-body">${note.content}</div>`;
  dialog.showModal();
}

grid.addEventListener('click', event => {
  const card = event.target.closest('[data-note]');
  if (card) openNote(card.dataset.note);
});
grid.addEventListener('keydown', event => {
  if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[data-note]')) {
    event.preventDefault();
    openNote(event.target.dataset.note);
  }
});
search.addEventListener('input', renderNotes);
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.filter.active')?.classList.remove('active');
  button.classList.add('active');
  activeCategory = button.dataset.category;
  renderNotes();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
document.addEventListener('keydown', event => {
  if (event.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
    event.preventDefault();
    search.focus();
  }
});
const now = new Date();
document.querySelector('#today-date').textContent = new Intl.DateTimeFormat('zh-TW', {month:'2-digit',day:'2-digit'}).format(now);
document.querySelector('#stat-notes').textContent = String(notes.length).padStart(2,'0');
document.querySelector('#nav-count').textContent = String(notes.length).padStart(2,'0');
document.querySelector('#all-count').textContent = String(notes.length).padStart(2,'0');
renderNotes();
