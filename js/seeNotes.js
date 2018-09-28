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
            console.log('Fetched all notes!');
            console.log(allNotes);
            allNotes.forEach(function(eachNote){

                var noteDiv = document.createElement('DIV');
                noteDiv.setAttribute('id','note-1'+eachNote.id);
                noteDiv.setAttribute('class','content');

                var text = document.createElement('TEXTAREA');
                text.setAttribute('id', 'note-text-' + eachNote.id);
                text.value = eachNote.note;

                var deleteButton = document.createElement('BUTTON');
                deleteButton.setAttribute('id','delete-button-'+eachNote.id);
                deleteButton.innerHTML = 'Delete note'

                var updateButton = document.createElement('BUTTON');
                updateButton.setAttribute('id','edit-button-'+eachNote.id);
                updateButton.innerHTML = 'Update note';

                document.getElementById('notes-table').appendChild(text);
                document.getElementById('notes-table').appendChild(deleteButton);
                document.getElementById('notes-table').appendChild(updateButton);
            })
        };
    }
}
fetchNotes();
