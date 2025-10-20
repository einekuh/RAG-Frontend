const submitBTN = document.getElementById("submitBTN");


submitBTN.addEventListener("click", addUserQueryToChat(getUserQuery()));



function getUserQuery() {
    var userQuery = document.getElementById("userQuery").innerHTML;
    return userQuery;
}

function addUserQueryToChat(query){
    document.getElementByClassName("chat-scroll").innerHTML = query;
}








































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