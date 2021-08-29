// fetch data function
const fetchData = () => {
    const searchText = document.getElementById("search-input").value;
    if (searchText == "") {
        showError("empty-error", true);
        // clear previous
        clearPrevious("search-results");
        clearPrevious("specific-meal");
    } else {
        showError("empty-error", false);
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
            .then(res => res.json())
            .then(data => displayData(data.meals));

        // clear search field
        document.getElementById("search-input").value = "";
    }
}
// function display Data
const displayData = (meals) => {
    const searchResults = document.getElementById("search-results");
    // clear precvious 
    clearPrevious("search-results");
    clearPrevious("specific-meal");

    if (meals == null) {
        showError("result-error", true);
    } else {
        meals.forEach(meal => {
            const mealName = meal.strMeal;
            const imgUrl = meal.strMealThumb;

            const div = document.createElement("div");
            div.classList.add("col-lg-4");
            div.classList.add("col-md-6");
            div.innerHTML = `
            <div class = "card h-100" onclick = "getDetails(${meal.idMeal})">
                <img src = "${imgUrl}" class = "card-img-top" height = "200" >
                <div class = "card-body">
                    <h5 class = "card-title text-center"> ${mealName} </h5> 
                </div> 
            </div>
            `;
            searchResults.appendChild(div);
        });
    }

}

// function to get specific item details
const getDetails = (id) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => displaySpecificMeal(data.meals))
}

// function to display specific item details
const displaySpecificMeal = (meals) => {
    const specificMeal = document.getElementById("specific-meal");
    // clear precvious 
    clearPrevious("specific-meal");

    for (const meal of meals) {
        const mealName = meal.strMeal;
        const imgUrl = meal.strMealThumb;
        const mealInstruction = meal.strInstructions;

        const div = document.createElement("div");
        div.classList.add("col-lg-5");
        div.classList.add("col-md-8");
        div.classList.add("mx-auto");
        div.innerHTML = `
        <div class = "card">
            <img src = "${imgUrl}" class = "card-img-top" height = "200" >
            <div class = "card-body">
                <h5 class = "card-title text-center"> ${mealName} </h5>
                <p class="mt-2 mb-1">Details Instruction:</p>
                <textarea class="w-100" rows="6" readonly>${mealInstruction}</textarea>
            </div> 
        </div>
        `;
        specificMeal.appendChild(div);

        // scroll to specfic section
        document.getElementById('specific-meal-section').scrollIntoView();
    }
}

// function show or hide error
const showError = (errorId, isShow) => {
    if (isShow == true) {
        document.getElementById(errorId).style.display = "block";
    } else {
        document.getElementById(errorId).style.display = "none";
    }
}

// clear previous
const clearPrevious = (fieldId) => {
    document.getElementById(fieldId).textContent = "";
}


// Search button click handler
document.getElementById("btn-search").addEventListener("click", fetchData);