
import { Card, CardDescription, CardTitle } from "../../atoms/attractionCard";

interface FoodCardProps {
    title: string;
    shortDescription?: string;
}
const FoodCard = ({ title, shortDescription }: FoodCardProps) => {

    return (
        <Card>
            <CardTitle title={title} />
            {shortDescription && <CardDescription description={shortDescription} />}
        </Card>
    );
};

export default FoodCard;
