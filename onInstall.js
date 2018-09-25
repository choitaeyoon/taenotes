chrome.runtime.onInstalled.addListener(createIndexDB);

function createIndexDB(){
    console.log("Running install script...");
    if (!('indexedDB' in window)) {
        console.log('This browser doesn\'t support IndexedDB');
        return;
    }

    var dbPromise = indexedDB.open('TaeNotes', 1, function (upgradeDb) {
        if (!upgradeDb.objectStoreNames.contains('notes')) {
            var notesOS = upgradeDb.createObjectStore('notes', {
                autoIncrement: true
            });
            console.log("Object Store created");
        }
    });
}
