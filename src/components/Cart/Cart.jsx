import React from 'react';
import '../../stylesheet/cartStyle.css';

const Cart = () => {
    return (
        <>
            <main>
                <div className="main-container">
                    <div id="toast" className="toast">
                        <span id="toast-message"></span>
                    </div>
                    <div className="left-section-main">
                        <div className="cart-items">
                            
                            
                            <div className="cart-item">
                                <div className="image-quantity">
                                    <figure>
                                        <img src="./Asset/headphone1.jpg" width="100" alt=""/>
                                    </figure>
                                    <div className="quantity-div">
                                        <button className="quantity-change-button">+</button>
                                        <input type="text" value="1" className="quantity-cart-field"/>
                                            <button className="quantity-change-button">-</button>

                                    </div>
                                </div>
                                <div className="cart-product-details">
                                    <div className="product-details">
                                        <h3 className="product-heading">Boult Audio Headset</h3>
                                        <h5 className="waveaura-assured">WaveAura Assured</h5>
                                        <h5>₹3000</h5>

                                    </div>
                                    <div className="cart-products-buttons">
                                        <div>REMOVE</div>
                                    </div>
                                </div>
                            </div>
                            <div className="cart-item">
                                <div className="image-quantity">
                                    <figure>
                                        <img src="./Asset/headphone2.jpg" width="100" alt=""/>
                                    </figure>
                                    <div className="quantity-div">
                                        <button className="quantity-change-button">+</button>
                                        <input type="text" value={2} className="quantity-cart-field"/>
                                            <button className="quantity-change-button">-</button>

                                    </div>
                                </div>
                                <div className="cart-product-details">
                                    <div className="product-details">
                                        <h3 className="product-heading">Boult Audio Headset</h3>
                                        <h5 className="waveaura-assured">WaveAura Assured</h5>
                                        <h5>₹3000</h5>

                                    </div>
                                    <div className="cart-products-buttons">
                                        <div>REMOVE</div>
                                    </div>
                                </div>
                            </div>
                            <div className="cart-item">
                                <div className="image-quantity">
                                    <figure>
                                        <img src="./Asset/headphone3.jpg" width="100" alt=""/>
                                    </figure>
                                    <div className="quantity-div">
                                        <button className="quantity-change-button">+</button>
                                        <input type="text" value={1} className="quantity-cart-field"/>
                                            <button className="quantity-change-button">-</button>

                                    </div>
                                </div>
                                <div className="cart-product-details">
                                    <div className="product-details">
                                        <h3 className="product-heading">Boult Audio Headset</h3>
                                        <h5 className="waveaura-assured">WaveAura Assured</h5>
                                        <h5>₹3000</h5>

                                    </div>
                                    <div className="cart-products-buttons">
                                        <div>REMOVE</div>
                                    </div>
                                </div>
                            </div>
                            

                        </div>
                        <div className="place-order-div">
                            <a href="#" className="place-order-button">Place Order</a>
                        </div>

                    </div>
                    <div className="right-section-main">
                        <h3>Price Details</h3>

                        <div className="price-div">
                            <h6>Price (<span id="total-items">0</span> items)</h6>
                            <h6>₹<span id="price-subtotal">0</span></h6>
                        </div>



                        <div className="total-price" >
                            <h5>Total Price</h5>
                            <h5>₹<span id="price-total">0</span></h5>
                        </div>


                    </div>


                </div>


            </main>


        </>
    )
}

export default Cart