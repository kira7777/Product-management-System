let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let adds = document.getElementById('adds');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;

//get total

function getTotal(){
    if(price.value !=''){
        let result = +price.value + +taxes.value + +adds.value 
        - discount.value;
        total.innerHTML = result;
        total.style.background='green';
    }
    else{
        total.innerHTML = '';
        total.style.background='red';
    }
}

//create product

let dataPro;

if(localStorage.product !=null){
    dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
}

submit.onclick = function (){
    let newpro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        adds:adds.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value
    }

    //save at local storage
    if(mood === 'create'){
        if(newpro.count > 1){
            for(let i=0;i < newpro.count ; i++){
                dataPro.push(newpro);
            }
        }else{
            dataPro.push(newpro);
        }
    }else{
        dataPro[tmp] = newpro;
        mood = 'create';
        submit.innerHTML = 'create';
        count.style.display = 'block'
    }
    
    localStorage.setItem('product', JSON.stringify(dataPro));
    clear();
    showData();
}



//clear inputs

function clear(){
    title.value='';
    price.value='';
    taxes.value='';
    adds.value='';
    discount.value='';
    total.value='';
    count.value='';
    category.value='';
    total.innerHTML='';
    total.style.background='red';
}

//read
function showData(){
    let table = '';

    for(i=0 ; i<dataPro.length ; i++){
        table += 
        `       <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].adds}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick = "updateData(${i})" id="update">update</button></td>
                    <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
                </tr>`;
    }

    document.getElementById('tbody').innerHTML = table;

    //clean data

let btnDeleteAll = document.getElementById('deleteAll');
if(dataPro.length > 0){
    btnDeleteAll.innerHTML = `
    <button onclick = "deleteAll()">Delete All (${dataPro.length} item)</button>
    `;
    
}else{
    btnDeleteAll.innerHTML ='';
}
}



function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

showData();



//delete
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}
//count

//update
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    adds.value = dataPro[i].adds;
    discount.value = dataPro[i].discount;
    count.style.display = 'none';
    category.value = dataPro[i].category;
    getTotal();
    submit.innerHTML = 'update';

    mood = 'update';
    tmp = i;
    scroll({
        top : 0,
        behavior:'smooth'
    })
}

//search

let search = document.getElementById('search');
let searchMood = 'title';
function getSearchMood(id){
    if(id == 'searchTitle'){
        searchMood = 'title';
        search.placeholder = 'search by title';
    }else{
        searchMood = 'category';
        search.placeholder = 'search by category';
    }

    search.focus();
    search.value = '';
    showData();
    
}

function searchData(value){
    let table = '';
    if(searchMood == 'title'){
        for(let i =0 ; i<dataPro.length ; i++){
            if(dataPro[i].title.toLowerCase().includes(value.toLowerCase())){
                table += 
                `       <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].adds}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick = "updateData(${i})" id="update">update</button></td>
                            <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
                        </tr>`;

            }
        }
    }else{

        for(let i =0 ; i<dataPro.length ; i++){
            if(dataPro[i].category.toLowerCase().includes(value.toLowerCase())){
                table += 
                `       <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].adds}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick = "updateData(${i})" id="update">update</button></td>
                            <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
                        </tr>`;

            }
        }
        
    }
    document.getElementById('tbody').innerHTML = table;
}