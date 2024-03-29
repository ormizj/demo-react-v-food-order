import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {}; // needs to be declared outside of the component, so it won't cause re-renders inside the "useHttp"

const Meals = () => {
    const { data: meals, isLoading, error } = useHttp('http://localhost:3000/meals', requestConfig, []);

    console.log(meals)

    if (isLoading) {
        return <p className="center">Fetching meals...</p>
    }

    if (error) {
        return <Error title="Failed to fetch meals" message={error} />
    }

    return (
        <ul id="meals">
            {meals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    );
}

export default Meals;