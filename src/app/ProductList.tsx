import { products } from "@/db";

function ProductList({ ...props }) {
  return (
    <div className="px-4 pt-8">
      <p className="text-xl font-medium">Order Summary</p>
      <p className="text-gray-400">
        Check your items. And select a suitable shipping method.
      </p>
      <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
        {products.map(({ name, id, price, image, size }) => (
          <div
            className="flex flex-col rounded-lg bg-white sm:flex-row"
            key={id}
          >
            <img
              className="m-2 h-24 w-28 rounded-md border object-cover object-center"
              src={image}
              alt=""
            />
            <div className="flex w-full flex-col px-4 py-4">
              <span className="font-semibold">{name}</span>
              <span className="float-right text-gray-400">{size}</span>
              <p className="text-lg font-bold">${price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
