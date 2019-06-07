//Listeners

document.getElementById("loan-form").addEventListener("submit", calculateResults);

function calculateResults(e) {

    //Form Fields DOM
    const amt = document.getElementById("amount");
    const interest = document.getElementById("interest");
    const years = document.getElementById("years");
    const monthlyPMT = document.getElementById("monthly-payment");
    const totalPMT = document.getElementById("total-payment");
    const totalInterest = document.getElementById("total-interest");

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
    } else {
        //custom error w/Bootstrap
        showError("Please Carefully Type Your Inputs")
    }

    e.preventDefault();
}

function clearError() {
    document.querySelector(".alert").remove();
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
