const input = document.querySelector("input");
const select = document.querySelector("select");
const addBtn = document.querySelector(".btn-add");
const filterBtn = document.querySelector(".btn-filter");
const filterContainer = document.querySelector(".container__filter");
const ul = document.querySelector("ul");
const empty = document.querySelector(".empty");


addBtn.addEventListener('click', addTask);
ul.addEventListener('click', deleteTask);





filterBtn.addEventListener("click", (e) => {
  e.preventDefault();
  filterContainer.classList.toggle("hidden")
  filtrarTarea()
});
function filtrarTarea(){
  let resultado = tareas.filter( filtrarCategoria );
  if (resultado.length) {
    mostrarTareas(resultado)
  }
  else noResultado();
}
function mostrarTareas(tareas){
  tareas.forEach(tarea => {
    console.log(tarea)
  });
}

function noResultado(){
  return console.log("no hay resultado")
}

function filtrarCategoria(tarea){
  if (datosDeBusqueda.category) {
    return Tarea.category === datosDeBusqueda.category
  }
  return Tarea;
}


function showTask(){
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild)
}

if (tareas.length > 0) {
    tareas.forEach(item => {
        const elemento = document.createElement('li');
        elemento.classList.add('item-tarea');
        elemento.innerHTML = `
            <p>${item.completed ? (
                `<span class='completa'>${item.getNombre()}</span>`
            ) : (
                `<span>${item.getNombre()}</span>`
            )}</p>
            <button class="btn-done" data-id="${item.id}">?</button>
            <button class="btn-delete" data-id="${item.id}">x</button>
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


    //MODO ESTUDIO
    if(categoria.value == "estudio"){
      studyTask.push(new Tarea(text, categoria, id))
    }
    showTask();
    input.value = "";
    select.value = "defecto"
    empty.style.display = "none";
  }
}


function deleteTask(e){
  if (e.target.classList.contains("btn-delete")) {
    let btnDelete = e.target;
    let btnId =  Number(btnDelete.getAttribute("data-id"))
    let tareaDelete = buscarTarea(btnId) 

    tareas.splice(tareas.indexOf(tareaDelete))
    showTask();
    console.log(tareas)
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

const datosDeBusqueda = {
  category : ""
}






/*let totalTareas = tareas.length;
let tareasCompletas = tareas.filter(item => item.estado === true).length;

total.textContent = `Total tareas: ${totalTareas}`;
completadas.textContent = `Tareas Completadas: ${tareasCompletas}`;
*/
}


//Los datos de entrada se toman por el input y el select. Mientras que la salida se debe observar por consola

/*addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const text = input.value;
  const categoria = select.value;

  if (text !== "" && categoria !== "defecto") {
    let id = Date.now();
    tareas.push(new Tarea(text, categoria, id))
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.textContent = tareas[tareas.length - 1].getNombre();

    li.appendChild(p);
    li.appendChild(addDoneBtn());
    li.appendChild(addDeleteBtn());
    ul.appendChild(li);

    input.value = "";
    select.value = "defecto"
    empty.style.display = "none";
  }
});

const datosDeBusqueda = {
  category : ""
}

function mostrarTareas(tareas){
  tareas.forEach(tarea => {
    console.log(tarea)
  });
}

function noResultado(){
  return console.log("no hay resultado")
}

function filtrarCategoria(tarea){
  if (datosDeBusqueda.category) {
    return Tarea.category === datosDeBusqueda.category
  }
  return Tarea;
}

function filtrarTarea(){
  let resultado = tareas.filter( filtrarCategoria );
  if (resultado.length) {
    mostrarTareas(resultado)
  }
  else noResultado();
}

filterBtn.addEventListener("click", (e) => {
  e.preventDefault();

  filtrarTarea()
});



function addDeleteBtn() {
  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "X";
  deleteBtn.className = "btn-delete";

  deleteBtn.addEventListener("click", (e) => {
    const item = e.target.parentElement; 
    item.firstElementChild;
    ul.removeChild(item);
    const items = document.querySelectorAll("li");

    if (items.length === 0) {
      empty.style.display = "block";
    }
  });

  return deleteBtn;
}

function addDoneBtn() {
  const doneBtn = document.createElement("button");

  doneBtn.innerHTML = "<span class='done-icon material-symbols-outlined'>done</span>";
  doneBtn.className = "btn-done"

  doneBtn.addEventListener("click", (e) => {
    const item = e.target.parentElement; 
    ul.removeChild(item);
    
    const items = document.querySelectorAll("li");

    if (items.length === 0) {
      empty.style.display = "block";
    }
  });

  return doneBtn;
}*/

