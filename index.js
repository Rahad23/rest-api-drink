
const apiSet = (search = 'lemon') =>{
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
    .then(rest => rest.json())
    .then(data =>  getApiData(data.drinks))
}

// calling function 
apiSet();

// get Input value search section
document.getElementById('search').addEventListener('click', function(){
    const getValue = document.getElementById('searchValue');
    const valueI = getValue.value;
    apiSet(valueI);
    getValue.value = '';
})


const getParentDiv = document.getElementById('parentDiv');
const getApiData = data1 =>{
    getParentDiv.innerHTML = ``;
 data1?.forEach(element => {
    const createDiv = document.createElement('div');
    createDiv.classList.add('col-4');

const boo_Card = `
        <div class="card mb-4 text-center p-3" style="width: 18rem;">
        <img src="${element.strDrinkThumb}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title mb-4">Drink: ${element.strDrink}</h5>
       
        <a onclick="productSearch(${element.idDrink})" type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <strong>BUY</strong>
        </a>
        </div>
        </div>
`;

createDiv.innerHTML = boo_Card;
getParentDiv.appendChild(createDiv);
});

}
getApiData();


// modal inner 




// Product search id

const productSearch = (idProduct)=>{
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idProduct}`)
    .then(getId => getId.json())
    .then(recive => UI(recive))
}


const UI = data =>{

    console.log(data.drinks[0]);
    // set modal title
    const modalId = document.getElementById('setTitle');
    modalId.innerText = data.drinks[0].strCategory;

    const createHtml = document.getElementById('modal-body');
    createHtml.innerHTML = ``;
    const createE = document.createElement('div');
    createE.classList.add("d-flex");
    createE.classList.add("justify-content-center")
    const modalGet = `
    <div class="card" style="width: 25rem;">
    <img src="${data.drinks[0].strDrinkThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Drink: ${data.drinks[0].strDrink}</h5>
      <p class=""><strong>*** ${data.drinks[0].strInstructions}</strong></p>
      <p><strong>*** ${data.drinks[0].strInstructionsDE}</strong></p>
    </div>
  </div>
    `;

    createE.innerHTML = modalGet;
    createHtml.appendChild(createE);
}