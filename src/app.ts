import { fetchFind, updateSearch, updateTrending } from "./index.js";
import { btnNext, btnPrev, buttonSearch, indicador, input } from "./nodos.js";

let currentPage = 1;
let currentQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  updateTrending();
  updateBtnPre();
})

buttonSearch?.addEventListener('click', (event) => { // se coloca ? para evitar errores si el elemento no existe
  event.preventDefault() // previene el comportamiento por defecto del botón
  
  const queryInput = (input as HTMLInputElement)?.value.trim();

  currentPage = 1;
  (indicador as HTMLElement).textContent = `Página ${currentPage}`

  fetchFind({query: currentQuery, page: currentPage});

  if(queryInput) {
    currentQuery = queryInput;

    updateSearch(queryInput);
    console.log('Buscando', queryInput);    
  } else {
    console.log('No encontrado', queryInput );    
  }
  updateBtnPre();
});

btnNext?.addEventListener('click', () =>{
  currentPage++;
  
  fetchFind({query: currentQuery, page: currentPage});

  (indicador as HTMLElement).textContent = `Página ${currentPage}`
  updateBtnPre();
  document.documentElement.scrollTop = 0;
})

btnPrev?.addEventListener('click', () => {
  if(currentPage > 1) {
    currentPage--;
    fetchFind({query: currentQuery, page: currentPage});
    (indicador as HTMLElement).textContent = `Página ${currentPage}`;
    updateBtnPre();
    document.documentElement.scrollTop = 0;
  }
})

function updateBtnPre() {
  if (currentPage <= 1) {
    (btnPrev as HTMLButtonElement).disabled = true; // Deshabilita el botón "Anterior" si estamos en la primera página
    
  } else {
    (btnPrev as HTMLButtonElement).disabled = false;
  }  
}