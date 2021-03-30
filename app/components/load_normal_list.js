/**
 * Created by ashwin.raghavan on 12/01/17.
 */

import React from "react";
import PropTypes from 'prop-types';
import SomethingWentWrong from "components/something_went_wrong";
import NoResults from "components/no_results";
import ReactPaginate from "react-paginate";

let localFilters = {}, localPage = 0, searchTerm = "", selectedEvent = "";

function setLocalPage(page) {
  localPage = page;
}

class LoadNormalList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      page: localPage
    }
  }
  
  componentDidMount() {
    this.resetValues();
    this.loadFromServer();
  }

  resetValues = () => {
    searchTerm = "";
    selectedEvent = "";
  }

  onClear = () => {
    this.resetValues();
    this.refs.searchTerm.value = "";
    this.loadFromServer();
  }

  loadFromServer = () => {
    if (searchTerm === "") {
      const { pageSize } = this.props;
      this.props.loadAction(localPage, pageSize, localFilters);
    } else {
      const { recordType } = this.props;
      this.props.searchList(recordType, searchTerm, localFilters);
    }
  }

  onSearch = (event) => {
    event.preventDefault();
    this.resetValues();
    const { recordType } = this.props;
    searchTerm = this.refs.searchTerm.value;

    this.props.searchList(
      recordType,
      searchTerm,
      localFilters
    );
  }

  handlePageClick = (data) => {
    const page = data.selected;
    setLocalPage(page);
    this.loadFromServer();
  }

  // do not paginate if:
  // 1. there is no count
  // 2. there is only one page
  renderPaginate = () => {
    const { count, pageSize } = this.props;
    const pageNum = count ? Math.ceil(count / pageSize) : 1;

    if (pageNum > 1) {
      return (
        <ReactPaginate
          // forceSelected={localPage}
          forcePage={localPage}
          pageNum={pageNum}
          // clickCallback={this.handlePageClick}
          onPageChange={this.handlePageClick}
          previousLabel={"previous"}
          nextLabel={"next"}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          breakLabel={<a href="">...</a>}
          breakClassName={"break-me"}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"} />
      );
    } else {
      return null;
    }
  }

  renderRecord = (record) => {
    const { recordType, customRows } = this.props;
    const customAttributes = customRows.attributes(record) || [];
    var counter = 0;

    return (
      <tr key={`${recordType}-${record.id}`}>
        {
          customAttributes.map((attribute) => {
            return (
              <td key={`attribute-${counter++}`}>{attribute}</td>
            );
          })
        }
      </tr>
    );
  }

  renderRecords = () => {
    const { data, customRows } = this.props;
    var counter = 0;

    return (
      <div>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <tbody>
            <tr>
              {
                customRows.headers.map((rowName) => {
                  return (
                    <th key={`header-${counter++}`}>{rowName}</th>
                  );
                })
              }
            </tr>
            {data.map(this.renderRecord)}
            </tbody>
          </table>
        </div>
        {this.renderPaginate()}
      </div>
    );
  }

  renderData = () => {
    const { data, error } = this.props;

    if (error && (error === "something went wrong" || error === "timeout")) {
      if (data.length) {
        return this.renderRecords();
      } else {
        return (
          <SomethingWentWrong errorMessage={error}/>
        );
      }
    } else if (data.length) {
      return this.renderRecords();
    } else {
      return (
        <NoResults/>
      );
    }
  }

  render() {
    const { title } = this.props;

    return (
      <div>
        <div className="page-container">
          <h1 className="page-header" data-test-element="header">{title}</h1>
          <form className="form-group" onSubmit={this.onSearch}>
            <div className="form-inline">
              <div className="input-group">
                <input className="form-control" ref="searchTerm" placeholder="Search term..." required = {true} />
                <a className="input-group-addon btn" href="#" onClick={this.onClear}>x</a>
                <a className="input-group-addon btn" href="#" type="submit" onClick={this.onSearch}>Search</a>
              </div>
            </div>
          </form>
          {this.renderData()}
        </div>
      </div>
    );
  }
}

LoadNormalList.propTypes = {
  loadFromServer: PropTypes.bool,
  title: PropTypes.string.isRequired,
  recordType: PropTypes.string.isRequired,
  loadAction: PropTypes.func,
  data: PropTypes.array.isRequired,
  count: PropTypes.number,
  pageSize: PropTypes.number,
  customRows: PropTypes.object
}

LoadNormalList.defaultProps = {
  pageSize: 10,
  count: null,
  customRows: {
    headers: [],
    attributes: () => {}
  }
}

export default LoadNormalList;
