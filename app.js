let number = 9;
let URL = "http://numbersapi.com";
this.$btn = $('button');
this.$card = $('#card');

class Number{
    constructor(number){
        this.number = number;
        this.facts =[];
    }
    async getNumber(){
        let resp = await $.getJSON(`${URL}/${this.number}?json`)
        console.log(resp);
    }
    async getNumbers(nums){
        this.numbers = nums
        let resp = await $.getJSON(`${URL}/${this.numbers}?json`)
        console.log(resp);
    }
    async get4facts(){
        let r1 = await $.getJSON(`${URL}/1?json`)
        this.facts.push(r1.text);
        let r2 = await $.getJSON(`${URL}/2?json`)
        this.facts.push(r2.text);
        let r3 = await $.getJSON(`${URL}/3?json`)
        this.facts.push(r3.text);
        let r4 = await $.getJSON(`${URL}/4?json`)
        this.facts.push(r4.text);
        this.facts.forEach(fact =>{
            $("body").append(`<p>${fact}</p>`);
        })
    }
}
const num = new Number(5)
let numbers =[1,3,4,11]

num.getNumber()
num.getNumbers(numbers)
num.get4facts()
