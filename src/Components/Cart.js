// Cart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState(null);
    const customer = localStorage.getItem('customer_id');

    useEffect(() => {
        const fetchCart = async () => {
            if (!customer) {
                alert('You need to be logged in to view your cart');
                return;
            }
            try {
                const res = await axios.get(`http://localhost:4000/cart/${customer}`);
                setCart(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCart();
    }, [customer]);

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:4000/cart/${customer}/product/${productId}`);
            setCart((prevCart) => ({
                ...prevCart,
                products: prevCart.products.filter(item => item.productId._id !== productId)
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const updateQuantity = async (productId, quantity) => {
        if (quantity < 1) return;
        try {
            await axios.put(`http://localhost:4000/cart/${customer}/product/${productId}`, { quantity });
            setCart((prevCart) => ({
                ...prevCart,
                products: prevCart.products.map(item =>
                    item.productId._id === productId ? { ...item, quantity } : item
                )
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const buyNow = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('You need to be logged in to buy products');
            navigate('/login');
            return;
        }

        const customerId = localStorage.getItem('customer_id');

        try {
            const products = cart.products.map(item => ({
                productId: item.productId,
                productTitle: item.productTitle,
                productPrice: item.productPrice,
                quantity: item.quantity
            }));

            const res = await axios.post('http://localhost:4000/order/buynow', {
                customerId,
                products,
                total: products.reduce((sum, item) => sum + item.productPrice * item.quantity, 0)
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // Clear the cart after placing the order
            await axios.delete(`http://localhost:4000/cart/${customer}`);
            alert('Order placed successfully');
            navigate(`/order/${res.data._id}`);
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order');
        }
    };

    if (!cart) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            <h1>Shopping Cart</h1>
            <div className="row">
                {cart.products.map((item, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{item.productTitle}</h5>
                                <p className="card-text">Price: ${item.productPrice}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <button
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <button
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(item.productId)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {cart.products.length > 0 && ( // Check if there are products in the cart
                    <button
                        className="btn btn-primary"
                        onClick={buyNow} // Call buyNow without parameters
                    >
                        Buy Now
                    </button>
                )}
            </div>
        </div>
    );
};

export default Cart;
