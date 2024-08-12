import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [product, setProduct] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const fatchProduct = async () => {
            try {
                const res = await axios.get('http://localhost:4000/product/getproduct');
                setProduct(res.data);
            } catch (error) {
                console.error(error);
            }
        }
        fatchProduct();
    }, [])
    const filteredProduct = product.filter((products) =>
        products.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <>
            <div className="container mt-5">
                <div className="input-group">
                    <div className="input-group py-4">
                        <input
                            type="search"
                            className="form-control rounded"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="search-addon"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            data-mdb-ripple-init
                        >
                            search
                        </button>
                    </div>
                </div>
                <div className="row">
                    {filteredProduct.map((Product) => (
                        <div className="col-md-4 mb-4" key={Product._id}>
                            <div className="card h-100">
                                <a href={`/products/${Product._id}`}>
                                    <img
                                        src={Product.images[0]}
                                        alt={Product.title}
                                        className="card-img-top"
                                    />
                                </a>
                                <div className="card-body">
                                    <h5 className="card-title">{Product.title}</h5>
                                    <p className="card-text">Price: {Product.price.toFixed(2)}</p>
                                    <p className="card-text">Discount: {Product.discountPercentage}%</p>
                                    <p className="card-text">Rating: {Product.rating}</p>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">In Stock</small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ProductList;