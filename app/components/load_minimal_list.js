import React from "react";
import PropTypes from 'prop-types';
import SomethingWentWrong from "components/something_went_wrong";
import FilterButton from "components/filter_button";
import Boolean from "components/boolean";
import PleaseWait from "components/please_wait";
import ReactPaginate from "react-paginate";

const ALL_FILTER = "All";
const APPROVED_FILTER = "Approved";
const NOT_APPROVED_FILTER = "Not-Approved";

const defaultFilters = [
  ALL_FILTER,
  APPROVED_FILTER,
  NOT_APPROVED_FILTER
];

let localFilters = {}, localPage = 0, searchTerm = "", selectedEvent = "";

function setLocalFilters(filters) {
  localFilters = filters;
  localPage = 0;
}

function setLocalPage(page) {
  localPage = page;
}

class LoadMinimalList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      page: localPage,
      filterName: ALL_FILTER
    }
  }

  componentDidMount() {
    this.resetValues();
    this.loadFromServer();

    const { recordType } = this.props;
    if (recordType === 'ruleset') {
      this.props.eventTypes();
      const { events } = this.props;
    }
  }

  resetValues = () => {
    searchTerm = "";
    selectedEvent = "";
    this.setState({
      filterName: ALL_FILTER
    });
    setLocalFilters({});
  }

  onFilter = (event) => {
    const filterName = event.target.dataset.filterName;

    switch(filterName) {
      case ALL_FILTER:
        this.setState({
          filterName: filterName
        });
        setLocalFilters(this.getFilters());
        break;
      case APPROVED_FILTER:
        this.setState({
          filterName: filterName
        });
        setLocalFilters(this.getFilters({approved: "true"}));
        break;
      case NOT_APPROVED_FILTER:
        this.setState({
          filterName: filterName
        });
        setLocalFilters(this.getFilters({approved: "false"}));
        break;
    }

    this.loadFromServer();
  }

  getFilters = ({ approved=false } = {})  => {
    if (approved) {
      return { approved: approved };
    } else {
      return {};
    }
  }

  loadFromServer = () => {
    if (selectedEvent != 'Event Type')
      localFilters = Object.assign(localFilters, {event:selectedEvent});
    if (searchTerm === "") {
      const {pageSize} = this.props;
      this.props.loadAction(localPage, pageSize, localFilters);
    } else {
      const { recordType } = this.props;
      this.props.searchList(recordType, searchTerm, localFilters);
    }
  }



  onApprove = (request, event) => {
    event.preventDefault();

    const { recordType, attemptApprove } = this.props;
    attemptApprove(recordType, request);
  }

  onSearch = (event) => {
    event.preventDefault();
    this.resetValues();
    const { recordType } = this.props;
    searchTerm = this.refs.searchTerm.value;

    if (recordType === 'ruleset') {
      selectedEvent = this.refs.selectEvent.value;

      if (selectedEvent != 'Event Type')
        localFilters = Object.assign(localFilters, {event: selectedEvent});
    }

    this.props.searchList(
      recordType,
      searchTerm,
      localFilters
    );
  }

  onClear = () => {
    const { recordType } = this.props;
    this.resetValues();
    this.refs.searchTerm.value = "";
    if (recordType === 'ruleset') {
      this.refs.selectEvent.value = "Event Type"
    }
    this.loadFromServer();
  }

  handlePageClick = (data) => {
    const page = data.selected;
    setLocalPage(page);
    this.loadFromServer();
  }

  onSelectEvent = () => {
    selectedEvent = this.refs.selectEvent.value;
    if (selectedEvent != 'Event Type')
      localFilters = Object.assign(localFilters, {event:selectedEvent});

    this.loadFromServer();
  }

  rulesetDropDown = () => {
    const { recordType, events } = this.props;
    if (recordType === 'ruleset') {
      return (
        <select ref="selectEvent" onChange={this.onSelectEvent} style={{paddingTop:5}}>
          <option key='event'>Event Type</option>
          {events.map(function (event) {
            return (
            <option key={event}>{event}</option>
            )
          })}
        </select>
      )
    }
  }

  renderPaginate = () => {
    const { count, pageSize } = this.props;
    const pageNum = count ? Math.ceil(count / pageSize) : 1;

    if (pageNum > 1) {
      return (
        <ReactPaginate
          forceSelected={localPage}
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
          subContainerClassName={"pages pagination"} />
      );
    } else {
      return null;
    }
  }

  renderRecord = (record) => {
    const { recordType, customRows } = this.props;
    const onRecordApprove = this.onApprove.bind(null, record);
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
        <td width="90"><Boolean flag={record.approved}/></td>
        <td width="250" className="btn-toolbar">
          <a
            className="btn btn-sm btn-success"
            href="#"
            onClick={onRecordApprove}
            data-test-element="approve">
            Approve
          </a>
        </td>
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
              <th>Approved</th>
              <th>Actions</th>
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
        <PleaseWait message="Loading" />
      );
    }
  }

  render() {
    const { title, recordType, data, count, pageSize, customRows, events } = this.props;
    const { filterName } = this.state;
    const filters = defaultFilters;

    return (
      <div>
        <div className="btn-group btn-group-xs pull-right" role="group">
          {
            filters.map((filterText) => {
              return (
                <FilterButton
                  key={`filter=${filterText}`}
                  selectedFilter={filterName}
                  onFilter={this.onFilter}
                  text={filterText} />
              );
            })
          }
        </div>
        <div className="page-container">
          <h1 className="page-header" data-test-element="header">{title}</h1>
          <form className="form-group" onSubmit={this.onSearch}>
            <div className="form-inline">
              <div className="input-group">
                {/*{this.rulesetDropDown()}*/}
                <input className="form-control" ref="searchTerm" placeholder="Search term..." required = {true} />
                <a className="input-group-addon btn" href="#" onClick={this.onClear}>x</a>
                <a className="input-group-addon btn" href="#" type="submit" onClick={this.onSearch}>Search</a>
              </div>
            </div>
            {this.rulesetDropDown()}
          </form>
          {this.renderData()}
        </div>
      </div>
    );
  }
}

LoadMinimalList.propTypes = {
  title: PropTypes.string.isRequired,
  recordType: PropTypes.string.isRequired,
  loadAction: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  count: PropTypes.number,
  pageSize: PropTypes.number,
  customRows: PropTypes.object,
};

LoadMinimalList.defaultProps = {
  pageSize: 30,
  count: null,
  customRows: {
    headers: [],
    attributes: () => {}
  },
};

export default LoadMinimalList;
