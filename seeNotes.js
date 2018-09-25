console.log("Showing all notes...");

function fetchNotes() {
    var dbPromise = indexedDB.open('TaeNotes', 1);

    dbPromise.onerror = function (event) {
        console.log("Error connecting to indexedDB");
    };

    dbPromise.onupgradeneeded = function (event) {
        var db = event.target.result;
        if (!db.objectStoreNames.contains('notes')) {
            var notesOS = db.createObjectStore('notes', {
                autoIncrement: true
            });
            console.log("Object Store created");
        }
    }

    dbPromise.onsuccess = function (event) {
        var db = event.target.result;
        var tx = db.transaction('notes', 'readwrite');
        var store = tx.objectStore('notes');
        var query = store.getAll();

        query.onerror = function(event){
            console.log("Failed Query...");
        }

        query.onsuccess = function(response){
            var allNotes = response.target.result;
            console.log("Fetched all notes!");
            console.log(allNotes);
            document.body.onload = addElements;

            function addElements() {
                allNotes.forEach(function(eachNote){
                    var text = document.createElement('note-text-'+eachNote.id);
                    text.type = "textarea";
                    text.value = eachNote.note;
                    console.log(text.value);
                    var deleteButton = document.createElement('delete-button-'+eachNote.id);
                    deleteButton.type = "button";
                    deleteButton.value = "Delete Note";
                    var updateButton = document.createElement('edit-button-'+eachNote.id);
                    updateButton.type = "button";
                    updateButton.value = "Update Note";
                    document.getElementById('notes-table').appendChild(text);
                    document.getElementById('notes-table').appendChild(deleteButton);
                    document.getElementById('notes-table').appendChild(updateButton);
                })
            }
        }
    };
}
fetchNotes();
