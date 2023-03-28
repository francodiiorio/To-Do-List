const input = document.querySelector("input");
const select = document.querySelector("select");
const addBtn = document.querySelector(".btn-add");
const filterBtn = document.querySelector(".btn-filter");
const optionsContainer = document.querySelector(".filtro-container");
const filterContainer = document.querySelector(".container__filter");
const ul = document.querySelector(".task__container");
const empty = document.querySelector(".empty");
const filterOptions = document.getElementById("filtro-opciones");
var filterValue = "";

const datosDeBusqueda = {
  category : filterValue,
}

//EVENTOS
document.addEventListener('DOMContentLoaded', loadTask)
addBtn.addEventListener('click', addTask);
ul.addEventListener('click', deleteTask);
filterBtn.addEventListener('click', toggleFilter)
filterOptions.addEventListener('click', (e) => {
  if(e.target.classList.contains("filtro__li")){
    filterValue = e.target.innerHTML.toLowerCase();
    if(filterValue == "todas"){
      filterValue = ""
    }
    datosDeBusqueda.category = filterValue;
    showTask();
  }
})

//FUNCIONES
function loadTask(){
  let load = JSON.parse(localStorage.getItem("tareas")) || [];
  tareas = load;
  showTask();
}

document.addEventListener("click", (e) => {
  if (e.target !== optionsContainer && !optionsContainer.contains(e.target)) {
    filterOptions.classList.add("hidden")
  }
});



function toggleFilter(e){
  e.preventDefault()
  filterOptions.classList.toggle("hidden");
}

function filtrarTarea(){
  let resultado = tareas.filter( filtrarCategoria );
  return resultado;
}

function filtrarCategoria(tarea){
  if (datosDeBusqueda.category) {
    return tarea.category === datosDeBusqueda.category
  }
  return tarea;
}


function showTask(){
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild)
}
let tareasMostradas = filtrarTarea()
if (tareasMostradas.length > 0) {
  tareasMostradas.forEach(item => {
        const elemento = document.createElement('li');
        elemento.classList.add('item-tarea');
        elemento.innerHTML = `
            <p>${item.completed ? (
                `<span class='completa'>${item.nombre}</span>`
            ) : (
                `<span>${item.nombre}</span>`
            )}</p>
            <button class="btn-done" data-id="${item.id}"><span class='done-icon material-symbols-outlined'>done</span></button>
            <button class="btn-delete" data-id="${item.id}"><span class="material-symbols-outlined">close</span></button>
            `
        ul.appendChild(elemento)
        empty.style.display = "none";
    });

} else {
  empty.style.display = "block";
}
}


function addTask(e){
  e.preventDefault();
  const text = input.value;
  const categoria = select.value;

  if (text !== "" && categoria !== "defecto") {
    let id = Date.now();
    tareas.push(new Tarea(text, categoria, id))

    filterOptions.classList.add("hidden")
    showTask();
    input.value = "";
    select.value = "defecto"
    empty.style.display = "none";

    localStorage.setItem("tareas", JSON.stringify(tareas))
  }
}

//Por el momomento el marcar la tarea hecha solo la elimina de tareas pendientes. En la entrega final va a haber un contador de tareas finalizadas.1
function deleteTask(e){
  if (e.target.classList.contains("btn-delete") || e.target.classList.contains("btn-done")) {
    let btnDelete = e.target;
    let btnId =  Number(btnDelete.getAttribute("data-id"))
    let tareaDelete = buscarTarea(btnId) 

    tareas.splice(tareas.indexOf(tareaDelete), 1)

    localStorage.setItem("tareas", JSON.stringify(tareas))
    showTask();
  }
  
}

function deleteTaskArray(btnId){
  let tareaDelete = buscarTarea(btnId) 

  tareas.splice(tareas.indexOf(tareaDelete), 1)

  localStorage.setItem("tareas", JSON.stringify(tareas))
  showTask();
}

function buscarTarea(id){
  let tareaEncontrada;
  let cantElementos = tareas.length;
  let i = 0;

  while(i < cantElementos && tareas[i].id !== id){
    i++;
  }

  if(i < cantElementos){
    tareaEncontrada = tareas[i];
  }
  return tareaEncontrada;
}