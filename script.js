const containerElement=document.getElementById("container");
const btnAdd=document.getElementsByClassName("btn-add")[0];

function getAppStorage(){
    return JSON.parse(localStorage.getItem("sticky-app")||"[]");
}
getAppStorage().forEach(element => {
   const textElement=createTextElement(element.id,element.content);
   containerElement.insertBefore(textElement,btnAdd);
});

function createTextElement(id,content){
const textElement=document.createElement("textarea");
textElement.classList.add("sticky");
textElement.value=content;
textElement.placeholder="Enter your text";

textElement.addEventListener("change",()=>{
    updateNote(id,textElement.value);
});

textElement.addEventListener("dblclick",()=>{
const check=confirm("Are ypu sure to Delete ?");
if(check){
    deleteNotes(id,textElement)
}
});

return textElement;
}


//add new sticky note
function addSticky(){
    const notes=getAppStorage();
    const noteObject={
        id:Math.floor(Math.random()*100000),
        content:""
    }
    const textElement=createTextElement(noteObject.id,noteObject.content);
    containerElement.insertBefore(textElement,btnAdd);
    notes.push(noteObject);
    saveNotes(notes);
}
btnAdd.addEventListener("click",()=>addSticky());

// save sticky notes
function saveNotes(notes){
localStorage.setItem("sticky-app",JSON.stringify(notes));
}


//update sticky notes
function updateNote(id,content){
    const notes=getAppStorage();
    const updateElement=notes.filter((note)=>note.id==id)[0];
    updateElement.content=content;
    saveNotes(notes);
}


// delete sticky notes
function deleteNotes(id,textElement){
    const notes=getAppStorage().filter((note)=>note.id!=id);
    saveNotes(notes);
    containerElement.removeChild(textElement);
}

