// OrderDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/order/${id}`);
                setOrder(response.data);
                console.log(response.data)
            } catch (error) {
                setError(error.response?.data?.message || 'Failed to fetch order');
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className="container mt-4">
                <h2 className="text-primary">Order Details</h2>
                <p><strong>Customer ID:</strong> {order.customerId}</p>

                <h3 className="mt-4">Products:</h3>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Product Title</th>
                            <th>Quantity</th>
                            <th>Product price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.products.map((product) => (
                            <tr key={product.productId}>
                                <td>{product.productTitle}</td>
                                <td>{product.quantity}</td>
                                <td>{product.productPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td></td>
                            <td><strong>{order.total.toFixed(2)}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    );
};

export default OrderDetails;