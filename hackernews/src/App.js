import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// # leanpub-start-insert
const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
  {
    title: 'Parcel',
    url: 'https://parceljs.org/',
    author: 'Devon Govett',
    num_comments: 8,
    points: 12,
    objectID: 2,
  },
];
// # leanpub-end-insert

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      list,
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss(id){
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }

  render() {
    return (
      <div className="App">
      {/* leanpub-start-insert */}
      <tr><th colspan="5">REACTJS TOOLS</th></tr>
      {this.state.list.map(item => {
          const onHandleDismiss = () =>
          this.onDismiss(item.objectID);
          return (
          <tr key={item.objectID}>
             <td className="Book_Title">
               <a href={item.url}>{item.title}</a>
             </td>
             <td className="Author">{item.author}</td>
             <td className="Comments">{item.num_comments}</td>
             <td className="Points">{item.points}</td>
             <td>
             <button
               className = {`btn`}
               onClick={onHandleDismiss}
               type="button">
               Remove Item
             </button>
             </td>
           </tr>
            );
          }
        )}
      {/* leanpub-end-insert */}
      </div>
    );
  }
}

export default App;
