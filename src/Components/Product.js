import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Product = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/product/getproduct/${id}`);
                setProduct(res.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductDetail();
    }, [id]);

    const addToCart = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('You need to be logged in to add products to the cart');
            navigate('/login');
            return;
        }

        try {
            const customerId = localStorage.getItem('customer_id');
            const quantity = 1;

            await axios.post('http://localhost:4000/cart/addcart', {
                c_id: customerId,
                productId: product._id,
                productTitle: product.title,
                productPrice: product.price,
                quantity
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('Product added to cart successfully');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            alert('Failed to add product to cart');
        }
    };


    if (loading) return <div>Loading...</div>;

    if (!product) return <div>Product not found</div>;

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            {product.images && product.images.length > 0 ? (
                                product.images.map((image, index) => (
                                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                        <img className="d-block w-100" src={image} alt={`Slide ${index + 1}`} />
                                    </div>
                                ))
                            ) : (
                                <div className="carousel-item active">
                                    <img className="d-block w-100" src="/path/to/default-image.jpg" alt="Default" />
                                </div>
                            )}
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
                <div className="col-md-6">
                    <h1>{product.title || 'No Title'}</h1>
                    <p>{product.description || 'No Description'}</p>
                    <p>Price: {product.price || 'N/A'}</p>
                    <p>Discount: {product.discountPercentage || 'N/A'}%</p>
                    <p>Rating: {product.rating || 'N/A'}</p>
                    <p>Stock: {product.stock || 'N/A'}</p>
                    <p>Category: {product.category || 'N/A'}</p>
                    <p>Brand: {product.brand || 'N/A'}</p>
                    <button className="btn btn-secondary" onClick={addToCart} disabled={product.stock === 0}>
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
