//Listeners

document.getElementById("loan-form").addEventListener("submit", function (e) {
    //Hide results
    document.getElementById("results").style.display = "none";

    //show loader
    document.getElementById("loading").style.display = "block"

    //setTimer
    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

function calculateResults() {

    //Form Fields DOM
    const amt = document.getElementById("amount");
    const interest = document.getElementById("interest");
    const years = document.getElementById("years");
    const monthlyPMT = document.getElementById("monthly-payment");
    const totalPMT = document.getElementById("total-payment");
    const totalInterest = document.getElementById("total-interest");
    const results = document.getElementById("results");
    const loader = document.getElementById("loading");

    //Formula
    const principal = parseFloat(amt.value);
    const calcInterest = parseFloat(interest.value) / 100 / 12;
    const calcPayments = parseFloat(years.value) * 12;
    const calcMonthlyPMT = Math.pow(1 + calcInterest, calcPayments);
    const monthly = (principal * calcMonthlyPMT * calcInterest) / (calcMonthlyPMT - 1);

    //Check if monthly is finite, or error when user typed the wrong inputs.
    if (isFinite(monthly)) {
        monthlyPMT.value = monthly.toFixed(2);
        totalPMT.value = (monthly * calcPayments).toFixed(2);
        totalInterest.value = ((monthly * calcPayments) - principal).toFixed(2)
        results.style.display = "block";
        loader.style.display="none";


    } else {
        //custom error w/Bootstrap
        showError("Please Carefully Type Your Inputs")
    }
}

function clearError() {
    document.querySelector(".alert").remove();
     //Hide results
     document.getElementById("results").style.display = "none";

     //hide loader
     document.getElementById("loading").style.display = "none"
}

function showError(error) {
    const newDiv = document.createElement("div");

    //Retrieving the parent elements of this newely created div.
    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");

    //add the bootstrap class name for errors
    newDiv.className = "alert alert-danger";

    //appending
    newDiv.appendChild(document.createTextNode(error));

    //To insert a created element between 2 elements like card and heading in this case
    //parentDOM.insertBefore("our desired element", "the element we want to be followed after")
    card.insertBefore(newDiv, heading);

    //Set Timeout will get rid of our error div we created within 4000 milliseconds or 4 seconds.
    window.setTimeout(clearError, 4000);
}
