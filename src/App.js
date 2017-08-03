import React, { Component } from 'react';
// import logo from './logo.svg';
// import { connect } from "react-redux";
import './App.css';

class Menu extends Component {
  addItem = (food) => {
    return (e) => {
      e.preventDefault();
      this.props.addToFoods(food);
    };
  }

  render() {
    const menu = this.props.menu;
    return (
      <div>
        <h3>Menu</h3>
        <ul className="list-group">
        {menu.map((food, index) => {
          return (
            <li key={index} className="list-group-item" onClick={this.addItem(food)}>
              <div className="inline-name">{food.name}</div>
              <div className="inline-price">${food.price}</div>
            </li>
          )}
        )}
        </ul>
      </div>
    )
  }
}

class Cart extends Component {
  removeItem = (index) => {
    return (e) => {
      e.preventDefault();
      this.props.removeFromFoods(index);
    };
  }

  render() {
    const foods = this.props.foods;
    return (
      <div>
        <h3>Cart</h3>
        <p className="sum">Total: ${this.props.sum}</p>
        <ul className="list-group">
        {foods.map((food, index) => {
          return (
            <li key={index} className="list-group-item" onClick={this.removeItem(index)}>
              <div className="inline-name">{food.name}</div>
              <div className="inline-price">${food.price}</div>
            </li>
          )}
        )}
        </ul>
      </div>
    )
  };
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: [
        {
          name: "chicken",
          price: 16,
        },
        {
          name: "pizza",
          price: 25,
        },
        {
          name: "pasta",
          price: 20,
        },
        {
          name: "steak",
          price: 30,
        },
        {
          name: "risotto",
          price: 22,
        },
      ],
      foods: [],
      sum: 0,
    };
  }

  addToFoods = (food) => {
    this.state.foods.push(food);
    this.setState({ 
      foods: this.state.foods,
      sum: this.state.sum + food.price,
    })
  };

  removeFromFoods = (index) => {
    var sum = this.state.sum - this.state.foods[index].price
    this.state.foods.splice(index, 1)
    this.setState({ 
      foods: this.state.foods,
      sum: sum,
    })
  };

  render() {
    return (
      <div className="App">
        <div className="menu col-lg-4">
          <Menu menu={this.state.menu} addToFoods={this.addToFoods} />
        </div>
        <div className="cart col-lg-4">
          <Cart foods={this.state.foods} removeFromFoods={this.removeFromFoods} sum={this.state.sum} />
        </div>
      </div>
    );
  }
}

export default App;
