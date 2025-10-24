//py -m http.server 5173
// python3 -m http.server 5173
// http://localhost:5173/


document.addEventListener("DOMContentLoaded", () => {
  const messageForm = document.getElementById("messageForm");
  const userInput   = document.getElementById("userQuery");
  const chatScroll  = document.querySelector(".chat-scroll");
  const dropzone   = document.getElementById("dropzone");
  const filePanel  = document.getElementById("filePanel");
  const fileInput  = document.getElementById("fileInput");
  const fileButton = document.getElementById("fileButton");
  const fileList   = document.getElementById("fileList");
  const uploadForm = document.getElementById("uploadForm");
  const API_BASE = "http://localhost:8000";

async function loadFiles() {
  try {
    const res = await fetch(`${API_BASE}/api/files`, { credentials: "include" });
    const data = await res.json();
    renderFilesFromServer(data.files || []);
  } catch (e) {
    console.error(e);
  }
}

function renderFilesFromServer(files) {
  const fileList = document.getElementById("fileList");
  fileList.innerHTML = "";
  if (!files.length) {
    fileList.innerHTML = '<div class="file-row empty">Noch keine Dateien</div>';
    return;
  }
  files.forEach(f => {
    const row = document.createElement("div");
    row.className = "file-row";
    // Zeigt Name + Größe + Download-Link
    row.innerHTML = `<a href="${API_BASE}${f.url}" target="_blank" rel="noreferrer">${f.name}</a> (${Math.ceil(f.size/1024)} KB)`;
    fileList.appendChild(row);
  });
}

  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = userInput.value.trim();
    if (!text) return;

    addMessage("user", text);                // User-Bubble (rechts)
    userInput.value = "";

    // Auto-Reply (links) – fester Text
    setTimeout(() => {
      addMessage("assistant", "Hallo! vielen Dank für deine Frage! Ich bin leider zur Zeit im Urlaub! Ich werde später auf dein Frage antworten!");
    }, 300);
  });

  function addMessage(role, text) {
    const msg = document.createElement("div");
    msg.className = `msg ${role}`;

    const bubble = document.createElement("div");
    bubble.className = "bubble";

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = `${role === "user" ? "Du" : "Assistant"} • ${formatTime(new Date())}`;

    bubble.appendChild(meta);
    bubble.appendChild(document.createTextNode(text));
    msg.appendChild(bubble);
    chatScroll.appendChild(msg);

    chatScroll.scrollTop = chatScroll.scrollHeight;
  }

  function formatTime(d){
    const h = String(d.getHours()).padStart(2, "0");
    const m = String(d.getMinutes()).padStart(2, "0");
    return `${h}:${m}`;
  }



  function renderFilesPreview(files) {
    fileList.innerHTML = "";
    if (!files || files.length === 0) {
      fileList.innerHTML = '<div class="file-row empty">Noch keine Dateien</div>';
      return;
    }
    [...files].forEach(f => {
      const row = document.createElement("div");
      row.className = "file-row";
      row.textContent = `${f.name} (${Math.ceil(f.size/1024)} KB)`;
      fileList.appendChild(row);
    });
  }

  // Drag & Drop auf den GESAMTEN Container
  if (filePanel) {
    ["dragenter","dragover","dragleave","drop"].forEach(evt =>
      filePanel.addEventListener(evt, e => { e.preventDefault(); e.stopPropagation(); }, false)
    );
    ["dragenter","dragover"].forEach(evt =>
      filePanel.addEventListener(evt, () => filePanel.classList.add("is-dragover"), false)
    );
    ["dragleave","drop"].forEach(evt =>
      filePanel.addEventListener(evt, () => filePanel.classList.remove("is-dragover"), false)
    );
    filePanel.addEventListener("drop", e => {
      const dropped = e.dataTransfer.files;
      if (!dropped || dropped.length === 0) return;

      const dt = new DataTransfer();
      [...fileInput.files].forEach(f => dt.items.add(f));  // bereits gewählte behalten
      [...dropped].forEach(f => dt.items.add(f));          // neue hinzufügen
      fileInput.files = dt.files;

      renderFilesPreview(fileInput.files);

      // Optional: sofort hochladen
      // uploadForm.requestSubmit();
    });

    // Optional: Klick auf leeren Bereich öffnet den Picker
    filePanel.addEventListener("click", (e) => {
      const clickedButton = e.target.closest("button, a, input, label");
      if (!clickedButton && fileInput) fileInput.click();
    });
  }


  // Datei-Dialog öffnen + Vorschau
  if (fileButton && fileInput) {
    fileButton.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", () => renderFilesPreview(fileInput.files));
  }

  // Upload absenden (FormData) – Backend-URL später anpassen
  if (uploadForm) {
    uploadForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!fileInput.files || fileInput.files.length === 0) return;

      const fd = new FormData();
      [...fileInput.files].forEach(f => fd.append("files", f)); // Feldname "files"

      try {
        // Wenn Backend noch nicht läuft, diesen fetch auskommentieren:
        const res = await fetch(`${API_BASE}/api/upload`, {
          method: "POST",
          body: fd,
          credentials: "include"
        });
        if (!res.ok) throw new Error(`Upload fehlgeschlagen (${res.status})`);
        await loadFiles();       // <- nach erfolgreichem Upload neu laden
        // Optional Auswahl leeren:
        fileInput.value = "";
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    });
  }




loadFiles();

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