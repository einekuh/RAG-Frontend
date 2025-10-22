//py -m http.server 5173
// python3 -m http.server 5173
// http://localhost:5173/


document.addEventListener("DOMContentLoaded", () => {
  const submitBTN   = document.getElementById("submitBTN");
  const messageForm = document.getElementById("messageForm");
  const userInput   = document.getElementById("userQuery");
  const chatScroll  = document.querySelector(".chat-scroll");


  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();                 // verhindert Reload
    const query = userInput.value.trim();
    if (!query) return;

    addUserQueryToChat(query);
    userInput.value = "";               // Eingabe leeren
  });


  function addUserQueryToChat(text) {
    // Neue Chat-Bubble anhängen (nicht alles überschreiben)
    const msg = document.createElement("div");
    msg.className = "msg user";

    const bubble = document.createElement("div");
    bubble.className = "bubble";

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = `Du • ${formatTime(new Date())}`;

    //bubble.textContent = text;

    bubble.appendChild(meta);
    bubble.appendChild(document.createTextNode(text));

    msg.appendChild(bubble);
    chatScroll.appendChild(msg);

    // Auto-Scroll ans Ende
    chatScroll.scrollTop = chatScroll.scrollHeight;
  }

  function formatTime(d){
  // 2-stellige Uhrzeit HH:MM, lokales Format
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
 }
 
});




































/*// ===== Konfiguration =====
// ===== Upload-Submit (API-Call) =====
if (uploadForm) {
uploadForm.addEventListener('submit', async (e) => {
e.preventDefault();
const fd = new FormData(uploadForm);
try {
const res = await fetch(`${API_BASE}/api/upload`, {
method: 'POST', body: fd, credentials: 'include'
});
if(!res.ok) throw new Error('Upload fehlgeschlagen');


// Nach Erfolg Liste aus Files neu rendern – real: vom Server holen
const names = [...fileInput.files].map(f=>f.name);
names.forEach(n => demoFiles.push(n));
renderFiles(demoFiles);
uploadForm.reset();
fileInput.value = '';
} catch (err) {
alert(err.message);
}
});
}

// ===== Nachricht senden (API-Call) =====
if (messageForm) {
messageForm.addEventListener('submit', async (e)=>{
e.preventDefault();
const text = messageInput.value.trim();
if(!text || !activeChatId) return;



// Sofort lokal anzeigen
demoMessages[activeChatId] ||= [];
demoMessages[activeChatId].push({role:'user', content:text});
chatScroll.appendChild(messageBubble('user', text));
chatScroll.scrollTop = chatScroll.scrollHeight;
messageInput.value = '';



// API-Hit (vereinfachtes Beispiel)
try{
const res = await fetch(`${API_BASE}/api/messages`, {
method:'POST',
headers:{ 'Content-Type':'application/json' },
credentials:'include',
body: JSON.stringify({ chat_id: activeChatId, message: text })
});
if(!res.ok) throw new Error('Senden fehlgeschlagen');



// Optional: WebSocket-Streaming; hier Demo: statische Antwort
const reply = 'Verstanden – hier ist die Antwort.';
demoMessages[activeChatId].push({role:'assistant', content:reply});
chatScroll.appendChild(messageBubble('assistant', reply));
chatScroll.scrollTop = chatScroll.scrollHeight;
} catch(err){
alert(err.message);
}
});
}


// ===== Suche (Client-Filter Demo) =====
if (searchForm) {
searchForm.addEventListener('submit', (e)=> e.preventDefault());
searchInput.addEventListener('input', ()=>{
const q = searchInput.value.toLowerCase();
const filtered = demoChats.filter(c => c.title.toLowerCase().includes(q));
renderChats(filtered);
});
}



// ===== Init =====
(function init(){
renderFiles([]);
activeChatId = demoChats[0].id;
renderChats(demoChats);
renderMessages(activeChatId);
})();*/