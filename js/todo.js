import { HIDDEN_CLASS, TODOS_KEY } from "./const.js";

const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

let toDos = [];

export function paintToDoForm () {
    toDoForm.classList.remove(HIDDEN_CLASS);
    toDoList.classList.remove(HIDDEN_CLASS);
}

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); 
}

function deleteToDo(event){
    const li = event.target.parentElement; 
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id)); 
    saveToDos();
}

function finishToDo(event){
    const li = event.target.parentElement;
    event.target.remove();
    toDos.forEach((toDo) => {
        if(toDo.id === parseInt(li.id)){
            toDo.finish= true;
            console.log(toDo);
        }
    });
    saveToDos();
    li.classList.add("finish-todo");
}

function paintToDo(newToDoObj){
    const li = document.createElement("li");
    li.id = newToDoObj.id;
    const span = document.createElement("span");
    span.innerText = newToDoObj.text;
    span.style.padding = "50px";
    li.appendChild(span);
    if(!newToDoObj.finish){
        const finishButton = document.createElement("button");
        finishButton.innerText = "finish"
        finishButton.addEventListener("click", finishToDo);
        li.appendChild(finishButton);
    }
    else {
        li.classList.add("finish-todo");
    }
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "delete";
    deleteButton.addEventListener("click", deleteToDo);
    li.appendChild(deleteButton);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event){
    event.preventDefault();
    const newToDo = toDoInput.value;
    toDoInput.value = "";
    const newToDoObj = {
        text: newToDo,
        id: Date.now(), 
        finish: false,
    }
    toDos.push(newToDoObj);
    paintToDo(newToDoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo); 
}