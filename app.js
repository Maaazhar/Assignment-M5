const searchBtn = document.getElementById('searchBtn');
const containerData = document.getElementById('food');
const warning = document.getElementById('warning');
warning.style.display = 'none';

searchBtn.addEventListener('click', 
    function () 
    {
        const searchArea = document.getElementById('searchArea').value;
        containerData.innerHTML = '';
        if (searchArea === '') {
            warning.style.display = 'block';
        } 
        else 
        {
            getFood(searchArea);
            warning.style.display = 'none';
        }
    }
);

function getFood(mealId) 
{

    const mainApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealId}`;

    fetch(mainApi)
        .then(res => res.json())
        .then(data => 
            {
            displayFoods(data.meals);
            }
        );

    const displayFoods = food => 
    {
        const foodsDiv = document.getElementById('food');
        if (food != null) 
        {
            food.map(food => 
                {
                const foodDiv = document.createElement('div');
                foodDiv.className = 'col-md-3';
                const foodInfo = 
                    `
                        <a href="#clicked" class="text-decoration-none text-white">
                        <div id="clicked" onclick="displayDetails('${food.idMeal}')" class="bg-info rounded text-center h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img class="img-fluid rounded-top" src="${food.strMealThumb}" alt="">
                        <h4 class=" py-4 px-2 mb-0">${food.strMeal}</h4>
                        </div>
                        </a>
                    `;
                foodDiv.innerHTML = foodInfo;
                foodsDiv.appendChild(foodDiv);
                }
            );
        } 
        else
        {
            warning.style.display = 'block';
        }
    };
}

const displayDetails = name => 
{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => 
            {
                renderFoodInfo(data.meals[0]);
            }
        );
};

const renderFoodInfo = food => 
{
    const foodDetailsDiv = document.getElementById('foodDetails');

    foodDetailsDiv.innerHTML = 
    `
        <img class="img-fluid rounded mb-4 " src="${food.strMealThumb}" alt="">
        <h3>${food.strMeal}</h3>
        <h5 class="pt-3"> Ingredients</h5><hr>
        <ul class="list-unstyled mb-0">
            <li>✅ ${food.strMeasure1}, ${food.strIngredient1}</li>
            <li>✅ ${food.strMeasure2}, ${food.strIngredient2}</li>
            <li>✅ ${food.strMeasure3}, ${food.strIngredient3}</li>
            <li>✅ ${food.strMeasure4}, ${food.strIngredient4}</li>
        </ul>
    `;
};