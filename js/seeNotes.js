console.log("Showing all notes...");

// function editOrDelete(){
//     document.getElementsByClassName('delete').addEventListener('click', function () {

//     });
// }


// function fetchNotes() {
//     var dbPromise = indexedDB.open('TaeNotes', 1);

//     dbPromise.onerror = function (event) {
//         console.log("Error connecting to indexedDB");
//     };

//     dbPromise.onupgradeneeded = function (event) {
//         var db = event.target.result;
//         if (!db.objectStoreNames.contains('notes')) {
//             var notesOS = db.createObjectStore('notes', {
//                 autoIncrement: true
//             });
//             console.log("Object Store created");
//         }
//     }

//     dbPromise.onsuccess = function (event) {
//         var db = event.target.result;
//         var tx = db.transaction('notes', 'readwrite');
//         var store = tx.objectStore('notes');
//         var query = store.getAll();

//         query.onerror = function(event){
//             console.log("Failed Query...");
//         }

//         query.onsuccess = function(response){
//             var allNotes = response.target.result;
//             console.log(allNotes);
//             allNotes.forEach(function(eachNote){
//                 var text = document.createElement('TEXTAREA');
//                 text.setAttribute('id', 'note-text-' + eachNote.id);
//                 text.value = eachNote.note;

//                 var deleteButton = document.createElement('BUTTON');
//                 deleteButton.setAttribute('id','delete-button-'+eachNote.id);
//                 deleteButton.setAttribute('class','delete');
//                 deleteButton.innerHTML = 'Delete note'

//                 var updateButton = document.createElement('BUTTON');
//                 updateButton.setAttribute('id','edit-button-'+eachNote.id);
//                 deleteButton.setAttribute('class','update');
//                 updateButton.innerHTML = 'Update note';

//                 var noteDiv = document.createElement('DIV');
//                 noteDiv.setAttribute('id', 'note-' + eachNote.id);
//                 noteDiv.setAttribute('class', 'content');
//                 noteDiv.appendChild(text);
//                 noteDiv.appendChild(deleteButton);
//                 noteDiv.appendChild(updateButton);
//                 document.getElementById('notes-table').appendChild(noteDiv);
//             })
//         };
//     }
//     editOrDelete();
// }
// fetchNotes();

function connect(){
    return new Promise((resolve,reject) => {
        const dbPromise = indexedDB.open('TaeNotes',1);
        dbPromise.onerror = () => reject(dbPromise.error);
        dbPromise.onblocked = () => console.log('pending til unblocked');
        dbPromise.onupgradeneeded = () => onupgradeneeded(event);
        dbPromise.onsuccess = () => resolve(event);
    });
}

function onupgradeneeded(event){
    var db = event.target.result;
    if (!db.objectStoreNames.contains('notes')) {
        var notesOS = db.createObjectStore('notes', {
            autoIncrement: true
        });
        console.log("Object Store created");
    }
}

function fetchNotes(event){
    return new Promise((resolve,reject) =>{

    });
}

async function transactions(){
    var event = await connect();
    await fetchNotes(event);
}
