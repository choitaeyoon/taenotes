document.addEventListener("DOMContentLoaded",function(){
    document.getElementById("addNote").addEventListener("click",addANote);
})

function addANote() {
    let newNote = document.getElementById('writeNote').value;

    chrome.storage.sync.get('newNote', function (result) {

    });
}
