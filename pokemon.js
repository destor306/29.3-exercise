
let baseURL = 'https://pokeapi.co/api/v2/pokemon'
function getRandomElements(arr, count){
    let randomElements = [];
    let indices = new Set();

    while(indices.size < count) {
        let randomIndex = Math.floor(Math.random() * arr.length);
        if (!indices.has(randomIndex)) {
            indices.add(randomIndex);
            randomElements.push(arr[randomIndex]);
        }
    }

    return randomElements;
}

let $btn = $('button');
let $card = $('#card');

function makePokemonCard(name, imgSrc, description){
    return `
    <div>
    <h1>${name}</h1>
    <img src=${imgSrc}>
    <p>${description}</p>
    </div>
    `
}
class Pokemon{
    constructor(){
        this.pokemons =[]
    }
    async init(){
        let resp = await $.getJSON(`${baseURL}/?limit=1000`)
        
        this.pokemons= resp.results;
        console.log(this.pokemons);
    }
    async get3pokemons(){
        let rndompokemons = getRandomElements(this.pokemons, 3);
    rndompokemons.forEach(pokemon =>{
        console.log(pokemon);
    })
    }
    async get3details() {
        let randomPokemons = getRandomElements(this.pokemons, 3);
        try {
            let detailsPromises = randomPokemons.map(async (pokemon) => {
                let resp = await $.getJSON(`${baseURL}/${pokemon.name}`);
                let resp_1 = await $.getJSON(`${resp.species.url}`);
                let flavorTexts = resp_1.flavor_text_entries.filter(ft => ft.language.name === 'en');
                if (flavorTexts.length > 0) {
                    console.log(flavorTexts[0].flavor_text);
                }
            });
            await Promise.all(detailsPromises);
        } catch (error) {
            console.error('Error fetching pokemon details:', error);
        }
    }   
    async cards() {
        let randomPokemons = getRandomElements(this.pokemons, 3);
        try {
            let detailsPromises = randomPokemons.map(async (pokemon) => {
                let resp = await $.getJSON(`${baseURL}/${pokemon.name}`);
                let imgSrc = resp.sprites.front_default;
                let resp1 = await $.getJSON(`${resp.species.url}`);
                let descriptions = resp1.flavor_text_entries
                    .filter(flavor_text => flavor_text.language.name === 'en')
                    .map(flavor_text => flavor_text.flavor_text);
    
                if (descriptions.length > 0) {
                    $('#card').append(makePokemonCard(pokemon.name, imgSrc, descriptions[0]));
                }
            });
    
            await Promise.all(detailsPromises);
        } catch (error) {
            console.error('Error fetching pokemon details:', error);
        }
    }
    
}

const pokemon = new Pokemon()
pokemon.init().then(()=>{
    pokemon.get3pokemons();
    pokemon.get3details();
    pokemon.cards();
})
// //1
// let pokemons = []
// $.getJSON(`${baseURL}/?limit=1000`,function(data){
//     pokemons=data.results
//     console.log(pokemons);

    
    
// })
//2

// $.getJSON(`${baseURL}/?limit=1000`,function(data){
    
//     let rndompokemons = getRandomElements(pokemons, 3);
//     rndompokemons.forEach(pokemon =>{
//         console.log(pokemon);
//     })
// })



//3

// $.getJSON(`${baseURL}/?limit=1000`,function(data){
    
//     let rndompokemons = getRandomElements(pokemons, 3);
//     rndompokemons.forEach(pokemon =>{
//         $.getJSON(`${baseURL}/${pokemon.name}`, function(data){
//             $.getJSON(`${data.species.url}`, function(data){
//                 data.flavor_text_entries.forEach(flavor_text=>{
//                     if (flavor_text.language.name =='en'){
//                         console.log(flavor_text.flavor_text)
//                     }
//                 })
//             })
//         })
//     })
// })


//4


// $.getJSON(`${baseURL}/?limit=1000`,function(data){
    
//     let rndompokemons = getRandomElements(pokemons, 3);
//     rndompokemons.forEach(pokemon =>{
//         let name = pokemon.name;
//         $.getJSON(`${baseURL}/${pokemon.name}`, function(data){
//             let imgSrc = data.sprites.front_default;
//             $.getJSON(`${data.species.url}`, function(data){
//                 console.log(data);
//                 let descriptions = []
//                 data.flavor_text_entries.forEach(flavor_text=>{
//                     if (flavor_text.language.name =='en'){
//                         descriptions.push(flavor_text.flavor_text);
//                     }
//                 })
//                 $card.append(makePokemonCard(name, imgSrc,descriptions[0]))

//             })
//         })
//     })
// })