import React from 'react';

const Home = () => {
    return (
        <>
            <div className="">
                {/* Hero Section */}
                <div className="jumbotron text-center bg-primary text-white py-5">
                    <h1 className="display-4">Welcome to Our E-commerce Platform!</h1>
                    <p className="lead">Find the best products at unbeatable prices.</p>
                    <a href="/products" className="btn btn-light btn-lg">
                        Shop Now
                    </a>
                </div>

                {/* Featured Products Section */}
                <div className=" container">
                    <h2 className="my-5 text-center">Featured Products</h2>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="card h-100">
                                <img src="https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074075.jpg" alt="Product 1" className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">iPhone 9</h5>
                                    <p className="card-text">An apple mobile which is nothing like apple</p>
                                    <a href="/products/66b1ceaf3dfa119ddc4688cd" className="btn btn-primary">View Product</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card h-100">
                                <img src="https://fashionistabudget.com/wp-content/uploads/2015/01/stylish.jpg" alt="Product 2" className="card-img-top h-60" />
                                <div className="card-body">
                                    <h5 className="card-title">OPPOF19</h5>
                                    <p className="card-text">OPPO F19 is officially announced on April 2021.</p>
                                    <a href="/products/66b1ceaf3dfa119ddc4688d0" className="btn btn-primary">View Product</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card h-100">
                                <img src="https://img.freepik.com/free-photo/modern-smartphone-with-live-abstract-wallpaper-coming-out-screen_23-2151033647.jpg?size=626&ext=jpg" alt="Product 3" className="card-img-top h-60" />
                                <div className="card-body">
                                    <h5 className="card-title">Samsung Universe 9</h5>
                                    <p className="card-text">Samsung's new variant which goes beyond Galaxy to the Universe.</p>
                                    <a href="/products/66b1ceaf3dfa119ddc4688cf" className="btn btn-primary">View Product</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Testimonials Section */}
                <h2 className="my-5 text-center">What Our Customers Say</h2>
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="text-center">
                                <p className="lead">"Great products and amazing customer service!"</p>
                                <small>- Customer A</small>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="text-center">
                                <p className="lead">"The best shopping experience I've ever had!"</p>
                                <small>- Customer B</small>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="text-center">
                                <p className="lead">"Fast shipping and quality products."</p>
                                <small>- Customer C</small>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

                {/* Footer */}
                <footer className="bg-dark text-white text-center py-4 mt-5">
                    <p>&copy; 2024 E-commerce Platform. All Rights Reserved.</p>
                </footer>
            </div>
        </>
    );
}

export default Home;
