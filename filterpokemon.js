var click = document.getElementById('click'); //obtengo el boton
const filter = document.querySelector('#poke-filter');//filtro si existe nombre

function getPokemon() {
    if (filter.value) {
        search.render();
    }
}

const search = {
    render: () => {

        const urlApi = 'https://pokeapi.co/api/v2/pokemon/'; //api para hacer la peticion
        
        const containerApearPokemon = document.querySelector('.apear-pokemon'); //contenedor donde aparece el pokemon
        var movesBtn=document.getElementById('moves-btn');
        const movimietosContainer=document.querySelector('#tabla');
        const table=document.querySelector('.table');

        var pokemon_name = filter.value;    //valor del nombre pkmn
        pokemon_name = pokemon_name.toLowerCase();  //no distingue mayusculuas, lo parseo
        const url = urlApi + pokemon_name;  //acoplo name en el link para pedirlo
      
        let contentHTML = ``; //let para insertar los datos en el html       
        let listCount=``;
        
        
        //llamada a la api
        fetch(url)
        .then(res => res.json())
        .then((json) => {
             
                const pkmn = json; //para hacer mas visible el objeto

                let tipos= pkmn.types[0].type.name;
                
                if(pkmn.types.length==2){//para saber si tiene 2 tipos
                    tipos+=' / '+pkmn.types[1].type.name;
                }

                table.style.display="table";
                for (var i = 0; i < pkmn.moves.length; i++) {
                    listCount+=`<tr>`;
                        listCount+=`<td>`+i+`</td>`;
                        listCount+=`<td>`+pkmn.moves[i].move.name+`</td>`;                     
                        
                    listCount+=`</tr>`
                }
                
                
                //procedo a insertar los datos en el html
                contentHTML += `               

                <div class="grid" id="poke-row">
                    <div class="grid1">
                    <img src="${pkmn.sprites.front_default}" alt="${pkmn.name}" class="img">
                    </div>
                    <div class="grid2">
                    <h2>Pokémon: ${pkmn.name}</h2>
                    </div>
                    <div class="grid3">
                    <h4>Number in Pokedex: ${pkmn.id}</h4>
                    </div>                   
                    <div class="grid4">
                    <h4>Types: ${tipos}</h4>
                    </div>
                </div>`;
                    
                containerApearPokemon.innerHTML = contentHTML;
                movimietosContainer.innerHTML=listCount;
                //finalmente se inciertan
            })
            .catch(error => {
                console.log(error);
                //si hay error muestro un mensaje
                contentHTML += `
                        <p>Nombre de pokemon no valido, asegurese de escribirlo bien</p>
                 `;

                table.style.display="none";
                containerApearPokemon.innerHTML = contentHTML;
               
            })
    }
};


