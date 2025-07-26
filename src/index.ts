import { GifObject } from "./componentes/interface.js";
import { API_Key, controls, mainSection } from "./nodos.js";

const limit = 20;

function render(data: GifObject[]) {

  setTimeout(() => {// Simula un retraso para mostrar los GIFs
    if(data.length > 0) {
      (controls as HTMLElement).style.display = 'flex';// Muestra los controles si hay resultados
    }else {
      (controls as HTMLElement).style.display = 'none';
    }       
    }, 3000);    
  
    (mainSection as HTMLElement).innerHTML = '';
  

  data.forEach((gif: GifObject) => {
      const div = document.createElement('div');
      div.classList.add('contenedor-elementos');

      const img = document.createElement('img');
      img.classList.add('conteiner-img');
      img.src = gif.images.fixed_height.url;
      img.alt = gif.title || 'GIF';

      div.appendChild(img);
      mainSection?.appendChild(div);
      
    })
}

export async function updateSearch(query: string | number) {
  const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_Key}&q=${query}&limit=${limit}`;

  try {
    const resApi = await fetch(endpoint);
    const data = await resApi.json();
    console.log(data);
    const dataSearch: GifObject[] = await data.data;
    console.log(dataSearch);   

    render(dataSearch);
    
  } catch (error) {
    console.log(error);    
  }
}

export async function updateTrending() {
  const endpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${API_Key}&limit=${limit}`;

  try {
    const resApi = await fetch(endpoint);
    const data = await resApi.json();
    console.log(data);
    const dataSearch: GifObject[] = await data.data;
    console.log(dataSearch);   

    render(dataSearch);
    
  } catch (error) {
    console.log(error);    
  }
}

export async function fetchFind({query = '', page = 0 }) { // se hace de esta manera para enviar un solo parámetro en forma de objeto
  const offset = page * limit;
  console.log('offset', offset);  
  const baseUrl = query ? 
  `https://api.giphy.com/v1/gifs/search?api_key=${API_Key}&q=${query}&limit=${limit}&offset=${offset}`
  : `https://api.giphy.com/v1/gifs/trending?api_key=${API_Key}&limit=${limit}&offset=${offset}`; // si query existe es q se estabuscando por search, si no es trending

  try {
    const res = await fetch(baseUrl);
    const dataPage = await res.json();
    const dataTotal = await dataPage.data;
    render(dataTotal);

  } catch (error) {
    console.error('Error al cargar los GIFs:', error);
  }
}