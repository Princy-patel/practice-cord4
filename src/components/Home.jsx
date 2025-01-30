import { Button, Card, message } from "antd";
import { addProducts } from "../redux/slice/productSlice";
import { useDispatch } from "react-redux";

const mockProducts = [
  {
    id: 1,
    name: "Smartphone",
    price: 699.99,
    description: "Latest model smartphone with advanced features",
    image: "https://source.unsplash.com/random/300x300",
  },
  {
    id: 2,
    name: "Laptop",
    price: 1299.99,
    description: "High-performance laptop for professionals",
    image: "https://source.unsplash.com/random/300x300",
  },
  {
    id: 3,
    name: "Headphones",
    price: 199.99,
    description: "Wireless noise-canceling headphones",
    image: "https://source.unsplash.com/random/300x300",
  },
];

function Home() {
  const { Meta } = Card;

  const dispatch = useDispatch();

  const addToCart = (product) => {
    dispatch(addProducts(product));
    message.success("Product added to cart successfully");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Home</h1>
      <div className="flex gap-5 mt-4">
        {mockProducts.map((product) => (
          <Card
            key={product.id}
            hoverable
            style={{ width: 240 }}
            cover={<img alt={product.name} src={product.image} />}
          >
            <Meta title={product.name} description={product.description} />
            <p className="mt-2">Price: ${product.price}</p>
            <Button
              className="mt-2"
              type="primary"
              onClick={addToCart.bind(null, product)}
            >
              Add to Cart
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Home;
