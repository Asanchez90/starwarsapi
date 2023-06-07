import './Gallery.css';
import './../Componentes/Footer/Footer.css';
import { Button } from './../Componentes/Button/Button';
import { Navbar } from '../Componentes/Navbar/Navbar';
import { Articlecontent } from '../Componentes/Articlecontent/Articlecontent';
import { Footer } from '../Componentes/Footer/Footer';

let pageNum = 1;
let info;
let type = 'characters';

const templates = () => {
  return `
    <main>
    
    <h1>UNIVERSE OF STARWARS</h1>
    <h2 class="loader">Espere...</h2>
    ${Navbar()}
    
        <div class="page-btn">
          <h3 id="pageNum"> Page: 1 </h3>
          ${Button('anteriorbtn', 'anterior')}
          ${Button('siguientebtn', 'siguiente')}
        </div>
        
        <section class="gallery-container"></section>
        ${Footer()}
      </main>
    
    `;
};
//obtenemos los datos con el async await con el fetch para que nos lleguen las cosas
const getData = async () => {
  const data = await fetch(
    //ponemos comillas francesas para la interpolacion de la variable let page numero para posteriormente
    //hacer un bucle que nos vaya repintando las paginas con el eventlistener
    `https://starwars-databank-server.vercel.app/api/v1/${type}?page=${pageNum}&limit=10`
  );

  const res = await data.json();
  //almacenamos en la variable info la informacion de cada una de las peticiones
  info = res.info;
  
  //pintamos el numero de las paginas
  document.querySelector('#pageNum').innerHTML = `Page: ${info.page}`;
  // comprobamos si tenemos que desactivar algun boton
  checkPages();
  //aqui le puedo poner mi sppiner 
  document.querySelector('.loader').innerHTML = 'Galeria StarWars'
  // console.log(res.data);
  printData(res.data);
};
//aqui ponemos todos los escuchadores de listener que vamos a usar
const addEventListener = () => {
  document.querySelector('#anteriorbtn').addEventListener('click', () => {
    //le ponemos la variable con el "--" para restar un numero
    pageNum--;
    getData();
  });

  document.querySelector('#siguientebtn').addEventListener('click', () => {
    //le ponemos la variable con el "++" para restar un numero
    pageNum++;
    getData();
  });
  //añadimos escuchadores a los botones de seleccion para poner lo que queremos,
  //¡¡¡IMPORTANTE PONER LOS NOMBRES TAL CUAL DE LA API, SINO A LA MIERDA!!!
  document.querySelector('#CharacteresBtn').addEventListener('click', () => {
    type = 'characters';
    getData();
  });
  document.querySelector('#VehiculesBtn').addEventListener('click', () => {
    type = 'vehicles';
    getData();
  });
  document.querySelector('#droidsBtn').addEventListener('click', () => {
    type = 'droids';
    getData();
  });
  //de aqui en adelante
  document.querySelector('#CreaturesBtn').addEventListener('click', () => {
    type = 'creatures';
    getData();
  });
  // document.querySelector("#Locationsbtn").addEventListener('click', () => {
  //   type="locations/"
  //   getData();
  // });
  document.querySelector('#OrganizationsBtn').addEventListener('click', () => {
    type = 'organizations';
    getData();
  });
  document.querySelector('#SpeciesBtn').addEventListener('click', () => {
    type = 'species';
    getData();
  });
};
// aqui vamos a ir pintando las cosas dentro de nuestro container
const printData = (list) => {
  const container = document.querySelector('.gallery-container');
  // limpiamos el container para que no se repitan los datos
  container.innerHTML = '';
  // pintamos una lista con los nombres
  for (const item of list) {
    const article = document.createElement('article');
    article.innerHTML = `${Articlecontent(item)}`;
    container.appendChild(article);
   
    
  }
};
//funcion comprobadora de pagina anterior o posterior
const checkPages = () => {
  const anteriorbtn = document.querySelector('#anteriorbtn');
  const siguientebtn = document.querySelector('#siguientebtn');
  //sino hay info.prev desactivamos el boton y sino lo activamos
  info.prev === null
    ? (anteriorbtn.disabled = true)
    : (anteriorbtn.disabled = false);
  //sino hay info.next desactivamos el boton y sino lo activamos
  info.next === null
    ? (siguientebtn.disabled = true)
    : (siguientebtn.disabled = false);
};

// aqui pintamos el template y añadimos la ejecucion de las funciones
export const printTemplate = () => {
  document.querySelector('#app').innerHTML = templates();
  
  // console.log(document.querySelector('#gallery-container'))
  getData();
  addEventListener();
};




