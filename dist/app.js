import { fetchFind, updateSearch, updateTrending } from "./index.js";
import { btnNext, btnPrev, buttonSearch, indicador, input } from "./nodos.js";
let currentPage = 1;
let currentQuery = '';
document.addEventListener('DOMContentLoaded', () => {
    updateTrending();
    updateBtnPre();
});
buttonSearch === null || buttonSearch === void 0 ? void 0 : buttonSearch.addEventListener('click', (event) => {
    event.preventDefault(); // previene el comportamiento por defecto del botón
    const queryInput = input === null || input === void 0 ? void 0 : input.value.trim();
    currentPage = 1;
    indicador.textContent = `Página ${currentPage}`;
    fetchFind({ query: currentQuery, page: currentPage });
    if (queryInput) {
        currentQuery = queryInput;
        updateSearch(queryInput);
        console.log('Buscando', queryInput);
    }
    else {
        console.log('No encontrado', queryInput);
    }
    updateBtnPre();
});
btnNext === null || btnNext === void 0 ? void 0 : btnNext.addEventListener('click', () => {
    currentPage++;
    fetchFind({ query: currentQuery, page: currentPage });
    indicador.textContent = `Página ${currentPage}`;
    updateBtnPre();
    document.documentElement.scrollTop = 0;
});
btnPrev === null || btnPrev === void 0 ? void 0 : btnPrev.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchFind({ query: currentQuery, page: currentPage });
        indicador.textContent = `Página ${currentPage}`;
        updateBtnPre();
        document.documentElement.scrollTop = 0;
    }
});
function updateBtnPre() {
    if (currentPage <= 1) {
        btnPrev.disabled = true; // Deshabilita el botón "Anterior" si estamos en la primera página
    }
    else {
        btnPrev.disabled = false;
    }
}
