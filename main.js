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
  updateChart();
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
            <span class="material-symbols-outlined btn__task btn-done" data-id="${item.id}">done</span>
            <span class="material-symbols-outlined btn__task btn-delete" data-id="${item.id}">delete</span>
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

    //PRUEBA
    console.log(tareas)
    localStorage.setItem("tareas", JSON.stringify(tareas))
    updateChart();
  }
}

//Por el momomento el marcar la tarea hecha solo la elimina de tareas pendientes. En la entrega final va a haber un contador de tareas finalizadas
function deleteTask(e){
  if (e.target.classList.contains("btn-delete")) {
    let btnDelete = e.target;
    let btnId =  Number(btnDelete.getAttribute("data-id"))
    deleteTaskArray(btnId)
    updateChart();
  }
  if (e.target.classList.contains("btn-done")) {
    let btnDone = e.target;
    let btnId =  Number(btnDone.getAttribute("data-id"))
    tareasFinalizadas.push(buscarTarea(btnId))
    deleteTaskArray(btnId)
  } 
  showTask();
}

function deleteTaskArray(btnId){
  let tareaDelete = buscarTarea(btnId) 
  tareas.splice(tareas.indexOf(tareaDelete), 1)
  localStorage.setItem("tareas", JSON.stringify(tareas))
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

function updateChart() {
  const categorias = ["Study", "Home", "Work"];
  const datosTareas = {
    Study: 0,
    Home: 0,
    Work: 0,
  };

  tareas.forEach((tarea) => {
    if (tarea.category == "estudio") {
      datosTareas.Study++;
    }
    if(tarea.category == "casa"){
      datosTareas.Home++;
    }
    if(tarea.category == "trabajo"){
      datosTareas.Work++;
    }
  });

  const data = categorias.map((categoria) => datosTareas[categoria]);
  myChart.data.datasets[0].data = data;
  myChart.update();
}