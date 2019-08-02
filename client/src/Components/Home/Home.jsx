import React from 'react';
import './Home.scss';

import Button from '../Button'

const Home = () => {
    return (
        <div>
            <div className="home home-1">
                <h2>There is <span>more</span> to Esports than just <span>winning</span> games.</h2>
            </div>
            <div className="home home-2">
                <h3 className="home-title">Surgo means</h3>
                <hr />
                <h2>To rise up, to climb, to move upwards</h2>
                <p>Our programmes provide teams with the knowledge, tools and support they need to develop their players into professional athletes.</p>
                <div className="btn-container">
                    <Button text={"About Surgo"} />
                </div>
                </div>
        </div>
    )
}

export default Home;