var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { API_Key, controls, mainSection } from "./nodos.js";
const limit = 20;
function render(data) {
    setTimeout(() => {
        if (data.length > 0) {
            controls.style.display = 'flex'; // Muestra los controles si hay resultados
        }
        else {
            controls.style.display = 'none';
        }
    }, 3000);
    mainSection.innerHTML = '';
    data.forEach((gif) => {
        const div = document.createElement('div');
        div.classList.add('contenedor-elementos');
        const img = document.createElement('img');
        img.classList.add('conteiner-img');
        img.src = gif.images.fixed_height.url;
        img.alt = gif.title || 'GIF';
        div.appendChild(img);
        mainSection === null || mainSection === void 0 ? void 0 : mainSection.appendChild(div);
    });
}
export function updateSearch(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_Key}&q=${query}&limit=${limit}`;
        try {
            const resApi = yield fetch(endpoint);
            const data = yield resApi.json();
            console.log(data);
            const dataSearch = yield data.data;
            console.log(dataSearch);
            render(dataSearch);
        }
        catch (error) {
            console.log(error);
        }
    });
}
export function updateTrending() {
    return __awaiter(this, void 0, void 0, function* () {
        const endpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${API_Key}&limit=${limit}`;
        try {
            const resApi = yield fetch(endpoint);
            const data = yield resApi.json();
            console.log(data);
            const dataSearch = yield data.data;
            console.log(dataSearch);
            render(dataSearch);
        }
        catch (error) {
            console.log(error);
        }
    });
}
export function fetchFind(_a) {
    return __awaiter(this, arguments, void 0, function* ({ query = '', page = 0 }) {
        const offset = page * limit;
        console.log('offset', offset);
        const baseUrl = query ?
            `https://api.giphy.com/v1/gifs/search?api_key=${API_Key}&q=${query}&limit=${limit}&offset=${offset}`
            : `https://api.giphy.com/v1/gifs/trending?api_key=${API_Key}&limit=${limit}&offset=${offset}`; // si query existe es q se estabuscando por search, si no es trending
        try {
            const res = yield fetch(baseUrl);
            const dataPage = yield res.json();
            const dataTotal = yield dataPage.data;
            render(dataTotal);
        }
        catch (error) {
            console.error('Error al cargar los GIFs:', error);
        }
    });
}
