import { useSelector, useDispatch } from 'react-redux';
import { removeProduct } from '../store/cartSlice';
import appwriteService from '../appwrite/config';

function Cart() {
  const dispatch = useDispatch();

  // Access cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Handle removing an item from the cart
  const handleRemove = (id) => {
    dispatch(removeProduct(id));
  };

  return (
    // <div className="w-full mx-auto">

      cartItems.length === 0 ? (
        <div className='conatiner min-h-screen max-w-4xl md:max-w-full px-20 py-10 mx-auto bg-gray-900 flex items-center justify-center'>
        <h1 className='text-2xl text-white text-center flex items-center justify-center gap-3  divide-solid divide-x divide-gray-500 py-5'>
      <span className='text-red-700 '>404</span>
      <span className='pl-3'>cart is empty</span>
    </h1>
      </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex items-center justify-between">
                {/* Product Image */}
                <div className="w-16 h-16 overflow-hidden rounded-lg">
                  <img
                    src={appwriteService.getFilePreview(item.productImg)}
                    className="w-full h-full object-cover"
                    alt={item.title}
                  />
                </div>

                {/* Product Details */}
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-green-600 font-bold">${item.price}</p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )
    // </div>
  );
}

export default Cart;
