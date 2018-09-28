console.log('Running popup script...');

function listen(){
    document.addEventListener('DOMContentLoaded', addNewNote);
}

function addNewNote(){
    document.getElementById('addNote').addEventListener('click',function(){
        var newNote = document.getElementById('writeNote').value;
        var newInput = {
            note: newNote,
            current: false,
            created: new Date().getTime()
        };
        insertNote(newInput);
    });
    document.getElementById('seeNotes').addEventListener('click', function () {
        location.href = 'seeNotes.html';
    })
}

function insertNote(newNote) {
    var dbPromise = indexedDB.open('TaeNotes', 1);

    dbPromise.onerror = function (event) {
        console.log('Error connecting to indexedDB');
    };

    dbPromise.onupgradeneeded = function (event) {
        var db = event.target.result;
        if (!db.objectStoreNames.contains('notes')) {
            var notesOS = db.createObjectStore('notes', {
                autoIncrement: true
            });
            console.log('Object Store created');
        }
    }

    dbPromise.onsuccess = function (event) {
        var db = event.target.result;
        var tx = db.transaction('notes', 'readwrite');
        var store = tx.objectStore('notes');
        store.add(newNote);
        console.log('Added' + newNote);
        return tx.complete;
    };


}

listen();
