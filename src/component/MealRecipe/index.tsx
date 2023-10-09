import { useEffect, useState } from 'react';

interface MealData {
  meals: {
    strCategory: string;
    strInstructions: string;
    strMealThumb: string;
    strMeal: string;
    strIngredient1: string;
    strIngredient2: string;
    strMeasure1: string;
    strMeasure2: string;
  }[];
}

const MealRecipe = () => {
  const [mealData, setMealData] = useState<MealData | null>(null);
  const [mealName, setMealName] = useState<string>('');
  const apiKey = '1';

  useEffect(() => {
    if (mealName.trim() !== '') {
      fetchMealData();
    } else {
      setMealData(null);
    }
  }, [mealName]);

  const fetchMealData = () => {
    fetch(
      `https://www.themealdb.com/api/json/v1/${apiKey}/search.php?s=${mealName}`,
    )
      .then((response) => response.json())
      .then((data) => {
        const mealData: MealData = data;
        console.log(data);
        console.log(mealData);
        setMealData(mealData);
      })
      .catch((error) => {
        console.error('Error fetching meal data: ', error);
        setMealData(null);
      });
  };

  return (
    <>
      <div className="mealContainer">
        <p className="introText">
          Discover delicious recipes for every palate. <br />
          Search, cook, and savor your culinary creations with us!
        </p>
        <div>
          <input
            type="text"
            placeholder="Enter meal name"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
          />
          <button onClick={fetchMealData}>Search</button>
        </div>
        {mealData && mealData.meals && mealData.meals.length > 0 ? (
          <div>
            <p className="searchResultText">Search results for: {mealName}</p>
            <ul>
              {mealData.meals.map((meal, index) => {
                const ingredientsAndMeasures = [];

                for (let i = 1; i <= 20; i++) {
                  const ingredientKey =
                    `strIngredient${i}` as keyof typeof meal;
                  const measureKey = `strMeasure${i}` as keyof typeof meal;
                  const ingredient = meal[ingredientKey];
                  const measure = meal[measureKey];

                  if (ingredient) {
                    const ingredientText = measure
                      ? `${measure} ${ingredient}`
                      : ingredient;
                    ingredientsAndMeasures.push(ingredientText);
                  }
                }

                const formatInstructions = (instructions: string): string[] => {
                  const steps = instructions
                    .split('.')
                    .map((step) => step.trim());

                  const formattedSteps = steps.filter(
                    (step) => step.length > 0,
                  );

                  return formattedSteps;
                };

                const instructions = formatInstructions(meal.strInstructions);

                return (
                  <>
                    <li className="mealNameList" key={index}>
                      <h4 className="mealNameText">
                        Meal name:
                        <br /> {meal.strMeal}
                      </h4>
                      <p className="categoryText">
                        Category: {meal.strCategory}
                      </p>
                      <img
                        className="mealImage"
                        src={meal.strMealThumb}
                        alt={`Image of ${meal.strCategory}`}
                      />

                      <div className="listInstructionContainer">
                        <ol className="instructionList">
                          {instructions.map((instruction, instructionIndex) => (
                            <li key={instructionIndex}>{instruction}</li>
                          ))}
                        </ol>
                        <ul className="ingredientsList">
                          {ingredientsAndMeasures.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
        ) : (
          <div>No meal data avalible</div>
        )}
      </div>
    </>
  );
};

export default MealRecipe;
