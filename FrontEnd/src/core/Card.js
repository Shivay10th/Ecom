/** @format */
import React from 'react';
import ImageHelper from './helper/ImageHelper';

const Card = ({ product, addToCart = true, removeFromCart = false }) => {
	const cardTitle = product ? product.name : 'Default';
	const cardDes = product ? product.description : 'Default Desctiption';
	const cardPrice = product ? product.price : '0';
	const cardStock = product ? product.stock : '0';

	const ShowAddToCartBtn = (addToCart) => {
		return (
			addToCart && (
				<button
					onClick={() => {}}
					className="btn btn-block btn-outline-success mt-2 mb-2"
				>
					Add to Cart
				</button>
			)
		);
	};

	const ShowRemoveToCartbtn = (removeFromCart) => {
		return (
			removeFromCart && (
				<button
					onClick={() => {}}
					className="btn btn-block btn-outline-danger mt-2 mb-2"
				>
					Remove from cart
				</button>
			)
		);
	};

	return (
		<div className="card text-white bg-dark border border-info ">
			<div className="card-header lead">{cardTitle}</div>
			<div className="card-body">
				<ImageHelper product={product} />
				<p className="lead bg-success font-weight-normal text-wrap">
					{cardDes}
				</p>
				<p className="btn btn-success rounded  btn-sm px-4">
					&#8377; {cardPrice}
				</p>
				<p className="btn btn-success rounded  ml-5 btn-sm px-4">
					Stock :{cardStock}
				</p>
				<div className="row">
					<div className="col-12">{ShowAddToCartBtn(addToCart)}</div>
					<div className="col-12">
						{ShowRemoveToCartbtn(removeFromCart)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
