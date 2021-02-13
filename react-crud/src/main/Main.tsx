import React, { useState, useEffect } from 'react';
import { Product } from '../admin/interfaces/Product';

const Main = () => {

    const [products, setProducts] = useState([] as Product[]);

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8001/api/products');
                const data = await response.json();
                setProducts(data);
            }
        )();


    }, []);

    const like = async (id: number) => {
        await fetch(`http://localhost:8001/api/products/${id}/like`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })

        setProducts(products.map(
            (p: Product) => {
                if (p.id === id) {
                    p.likes++;
                }
                return p;
            }
        ))
    }

    return (

        <main>
            <div className="album py-5 bg-light">
                <div className="container">

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {products.map(
                            (p: Product) => {
                                return (
                                    <div className="col" key={p.id}>
                                        <div className="card shadow-sm">
                                            <img src={p.image} alt={p.title} height="250" />
                                            <div className="card-body">
                                                <p className="card-text">{p.title}</p>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="btn-group">
                                                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => like(p.id)}>Like</button>
                                                    </div>
                                                    <small className="text-muted">{p.likes} likes</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        )}
                    </div>
                </div>
            </div>

        </main>
    );
};

export default Main;