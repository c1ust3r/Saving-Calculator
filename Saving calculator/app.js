const context = document.getElementById("data-set").getContext("2d");
let pie = new Chart(context, {});


//values from the form
const savingGoal = document.getElementById("savingGoal");
const intialBalance = document.getElementById("initialBalance");
const years = document.getElementById("period");
const rate = document.getElementById("rate");
const deposit = document.getElementById("inputGroupSelect01");

//message
const message = document.getElementById("message");

//the calculate button
const button = document.querySelector(".button-input button");

//attach an event listener
button.addEventListener("click", calculateSaving);


const data = [];

function calculateSaving(event){
    event.preventDefault();
    data.length = 0;
    try {
        const saving = parseInt(savingGoal.value);
        const initial = parseInt(intialBalance.value);
        const period = parseInt(years.value);
        const interest = parseInt(rate.value);
        const deposits = parseInt(deposit.value);

        const final = ((saving-initial) * ((interest / 100)/deposits)) / [(1 + (interest/100)/deposits)**(deposits * period) - 1];
        const interestEarned = saving - final*deposits*period;
        const savedAmount = final*deposits*period;

        data.push(savedAmount);
        data.push(interestEarned);
        growth = final;

        //
        message.innerText = '$'+ Math.floor(final);
        drawGraph();
    } catch (error) {
        console.error(error);
        
    }
    

}
function drawGraph(){
    pie.destroy();
    pie = new Chart(context, {
        type: 'pie',
        data: {
            labels: ['Principle','Interest'],
            datasets: [{
                lable: 'Total Saved',
                data,

                backgroundColor: [
                    'rgb(255, 255, 255, 1)',
                    'rgb(3,85,172)',
                ],

                borderWidth:0
            }]
        },
        option: {
            scales:{
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function toDecimal(value, decimals){
    return +value.toFixed(decimals);
}