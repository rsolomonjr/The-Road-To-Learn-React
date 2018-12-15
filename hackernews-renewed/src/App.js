import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

//# API CODING
const DEFAULT_QUERY = 'react context api';
const DEFAULT_HPP = '10';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

//# LOADING
const Loading = () =>
  <div className="LoadingApp">Loading ... </div>

class App extends Component {
  _isMounted = false;
  constructor(props){
    super(props);

    this.state = {
      result: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false
    };

    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    const {searchKey, results } = this.state;

    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];

    const updatedHits = [
      ...oldHits,
      ...hits
    ];

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      },
      isLoading: false
    });
  }

  fetchSearchTopStories(searchTerm, page=0) {
    this.setState({isLoading: true});
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(e => this._isMounted &&
        this.setState({ e }));
  }

  componentDidMount() {
    this._isMounted = true;
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  componentWillMount() {
    this._isMounted = false;
  }

  onSearchChange (e) {
    this.setState({ searchTerm: e.target.value });
  }

  onSearchSubmit (e) {
    const {searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    e.preventDefault();
  }

  onDismiss(id){
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  render() {
    const {
          searchTerm,
          results,
          searchKey,
          error,
          isLoading
        } = this.state;

        const page = (
          results &&
          results[searchKey] &&
          results[searchKey].page
        ) || 0;

        if (error) {
          return <p>Kittens died. Try again.</p>;
        }

        const list = (
          results &&
          results[searchKey] &&
          results[searchKey].hits
        ) || [];

    return (
      <div className="table">
      <div className="App">
        <tr className="tableHeader">
          <th colSpan={5}>REACTJS TOOLS</th>
        </tr>
        <tr>
          <td className="tableHeader-ruler" colSpan={5}>
          </td>
        </tr>
          { error
            ? <div className="interactions">
                <p>A cat died. You failed this city.</p>
              </div>
              : <Table
              list={list}
              onDismiss={this.onDismiss}
            />
          }
          {
            isLoading
            ? <Loading />
            : <Button
                className={`btn button-more`}
                onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
                  More
              </Button>
            }
            <Search
                value={searchTerm}
                onChange={this.onSearchChange}
                onSubmit={this.onSearchSubmit}
            />
      </div>
      </div>
    );
  }
}

const Table = ({ list, onDismiss }) =>
<div>
  {/* START OF THE MAIN APP */}
  {list.map(item =>
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
    )}
  {/* END OF THE MAIN APP */}
</div>

const Search = ({ value, onChange, onSubmit }) =>
      <form id="SearchForm" onSubmit={onSubmit}>
          <h2 className="SearchForm_Header">Search the List</h2>
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Enter Title/Letters Here"
          />
          <button type="submit" className="btn">
            Submit
          </button>
          <div className="footnote">
            <em>** Do not enter numbers</em>
          </div>
      </form>

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
