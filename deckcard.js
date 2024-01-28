
let cards = []
let baseURL ='https://deckofcardsapi.com/api/deck'

this.$btn = $('button');
this.$card = $('#card');
class deck{
    constructor(){
        this.deck_id = 0
        this.cards =[]
        this.draw = this.draw.bind(this);

    }
    async init(){
        let res = await $.getJSON(`${baseURL}/new/shuffle/?deck_count=1`);
        this.deck_id = res.deck_id;
        console.log(res);    
    }
    async draw(){
        let resp = await $.getJSON(`${baseURL}/${this.deck_id}/draw`)
        this.cards.push(resp.cards[0]);
            
        $card.append(`<img src="${resp.cards[0].image}">`)
        console.log(resp);
        if (resp.remaining == 0){
            $btn.remove();
        }
    }
}

const newCard = new deck()
newCard.init()
$btn.on('click', newCard.draw)