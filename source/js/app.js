// first we need to get the elementById in order for us to access it in Javascript
const getMeal = document.getElementById("get_meal");
console.log(getMeal);

// now we need to select another elementById to access it so that we can actually add the meal
const mealContainer = document.getElementById("meal");
console.log(mealContainer);

// let's add and event listener so that when we click the button an event should occur
getMeal.addEventListener("click", () => {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(res => res.json())
    .then(res => {
      createMeal(res.meals[0]);
    })
    .catch(e => {
      console.warn(e);
    });
});

// let's create the function createMeal from above so that we can make use of it
// we will use a for loop to loop over the the ingredients in the meal and add an if statement so that if the ingredients add up we add it, otherwise we disgard it
const createMeal = meal => {
  // we create an empty array so that when we loop over the ingredients, they are added to the array
  const ingredients = [];

  // we can get all the ingredients from the recipe and we'll allow it to go up to 20 items
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      // stop if there are no more ingredients to add
      break;
    }
  }

  // let's display the items in html

  const newInnerHTML = `
<div class="grid">
 <div class="feature-card">
  <img src="${meal.strMealThumb}" alt="Meal Image">

 	${
    meal.strCategory
      ? `<p class="big"><strong>Category:</strong> ${meal.strCategory}</p>`
      : ""
  }
		${
      meal.strArea
        ? `<p class="big"><strong>Area:</strong> ${meal.strArea}</p>`
        : ""
    }
		${
      meal.strTags
        ? `<p class="big"><strong>Tags:</strong> ${meal.strTags
            .split(",")
            .join(", ")}</p>`
        : ""
    }

  <h5 class="big">Ingredients: </h5>
   <ul>
    ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")}
  <h4>${meal.strMeal}</h4>
  <p>${meal.strInstructions}</p>
   </ul>
 </div>
${
  meal.strYoutube
    ? `
</div>
<div>
 <div class="feature-card flex-video">
  <iframe src="https://www.youtube.com/embed/${meal.strYoutube.slice(
    -11
  )}" frameborder="0"></iframe>
 </div>
</div>`
    : ""
} `;

  mealContainer.innerHTML = newInnerHTML;
};

// SOCIAL PANEL JS
const floating_btn = document.querySelector(".floating-btn");
const close_btn = document.querySelector(".close-btn");
const social_panel_container = document.querySelector(
  ".social-panel-container"
);

floating_btn.addEventListener("click", () => {
  social_panel_container.classList.toggle("visible");
});

close_btn.addEventListener("click", () => {
  social_panel_container.classList.remove("visible");
});
