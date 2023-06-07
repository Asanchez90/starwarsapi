import './Articlecontent.css';


export const Articlecontent = (item) => {
    return `
        <img class ="img-card" src="${item.image}" alt=${item.name}>
        <h2 class ="h2-card">${item.name}</h2>  
        <p class ="p-card">${item.description}</p>
        
  `
}




