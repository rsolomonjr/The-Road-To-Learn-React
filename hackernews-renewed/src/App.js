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
function isSearched(searchTerm){
  return function(item){
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      list,
      searchTerm: '',
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);

  }

  onSearchChange (e) {
    this.setState({ searchTerm: e.target.value });
  }

  onDismiss(id){
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }

  render() {
    const {searchTerm, list} = this.state;
    return (
      <div className="App">
        <tr className="tableHeader">
          <th colspan="5">REACTJS TOOLS</th>
          </tr>
        <tr>
          <td className="tableHeader-ruler" colspan="5">
          </td>
        </tr>
        <Table
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
        />
      </div>
    );
  }
}

const Search = ({ value, onChange }) =>
    <div>
      <tr id="SearchForm">
        <th colspan="5">
          <h2 className="SearchForm_Header">Search the List</h2>
          <input
            type="text"
            value={value}
            onChange={onChange}
            pattern="^[a-zA-Z]+$"
            placeholder="Enter Title/Letters Here"
          />
          <div className="footnote">
            <em>** Do not enter numbers</em>
          </div>
        </th>
      </tr>
    </div>
{/*
class Search extends Component {
  render (){
    const {value, onChange, children} = this.props;
    return (
      <div>
      <tr id="SearchForm">
        <th colspan="5"><h2 className="SearchForm_Header">Search the List</h2>
        <input
          type="text"
          value={value}
          onChange={onChange}
          pattern="^[a-zA-Z]+$"
          placeholder="Enter Title/Letters Here"
        />
        <div className="footnote"><em>** Do not enter numbers</em></div>
        </th>
      </tr>
      </div>
    );
  }
}
*/}

class Table extends Component {
  render () {
    const {list, pattern, onDismiss} = this.props;
    return (
      <div>
        {/* START OF THE MAIN APP */}
        {list.filter(isSearched(pattern)).map(item => {
            const onHandleDismiss = () =>
            this.onDismiss(item.objectID);
            return (
            <tr key={item.objectID} id="Tools">
               <td className="Book_Title">
                 <a href={item.url}>{item.title}</a>
               </td>
               <td className="Author">{item.author}</td>
               <td className="Comments">{item.num_comments}</td>
               <td className="Points">{item.points}</td>
               <td>
               <Button onClick={() => onDismiss(item.objectID)}>
                 Remove Item
               </Button>
               </td>
             </tr>
              );
            }
          )}
        {/* END OF THE MAIN APP */}
      </div>
    );
  }
}

class Button extends Component {
  render () {
    const {
      onClick,
      className = "btn",
      children
    } = this.props;

    return (
      <button
        onClick = {onClick}
        className = {className}
        type="button"
        >
          {children}
        </button>
    );
  }
}
export default App;
