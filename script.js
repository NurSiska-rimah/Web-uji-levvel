const form = document.getElementById("form");
const catatanContainer = document.getElementById("catatan");
const judulInput = document.getElementById("judul");
const kontenInput = document.getElementById("konten");
const idInput = document.getElementById("note-id");

let notes = JSON.parse(localStorage.getItem("catatanKu")) || [];

function renderNotes() {
  catatanContainer.innerHTML = "";
  notes.forEach((note, index) => {
    const card = document.createElement("div");
    card.className = "note-card";
    card.innerHTML = `
      <div class="note-title">${note.judul}</div>
      <div class="note-content">${note.konten}</div>
      <div class="note-meta">Dibuat pada: ${note.created}</div>
      <div class="note-actions">
        <button onclick="editNote(${index})">Edit</button>
        <button onclick="deleteNote(${index})">Hapus</button>
      </div>
    `;
    catatanContainer.appendChild(card);
  });
}

function saveNotes() {
  localStorage.setItem("catatanKu", JSON.stringify(notes));
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const id = idInput.value;
  const judul = judulInput.value.trim();
  const konten = kontenInput.value.trim();

  if (judul && konten) {
    if (id === "") {
      // Tambah baru
      notes.unshift({
        judul,
        konten,
        created: new Date().toLocaleDateString("id-ID")
      });
    } else {
      // Update
      notes[id].judul = judul;
      notes[id].konten = konten;
    }

    saveNotes();
    renderNotes();
    form.reset();
    idInput.value = "";
    form.querySelector('input[type="submit"]').value = "Tambahkan";
  }
});

function editNote(index) {
  const note = notes[index];
  judulInput.value = note.judul;
  kontenInput.value = note.konten;
  idInput.value = index;
  form.querySelector('input[type="submit"]').value = "Update";
}

function deleteNote(index) {
  if (confirm("Yakin ingin menghapus catatan ini?")) {
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
  }
}

renderNotes();