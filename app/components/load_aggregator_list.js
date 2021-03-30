import React from "react";
import PropTypes from 'prop-types';
import SomethingWentWrong from "components/something_went_wrong";
import FilterButton from "components/filter_button";
import Boolean from "components/boolean";
import PleaseWait from "components/please_wait";
import ReactPaginate from "react-paginate";

const ALL_FILTER = "All";
const ACTIVE_FILTER = "Active";
const INACTIVE_FILTER = "In-Active";
// const APPROVED_FILTER = "Approved";
// const NOT_APPROVED_FILTER = "Not-Approved";
const ADDRESS_VERIFIED_FILTER = "Address Verified";
const VERIFIED_PENDING_FILTER = "Verification Pending";
const PENDING_REACTIVATION_FILTER = "Pending Reactivation";

const defaultFilters = [
  ALL_FILTER,
  ACTIVE_FILTER,
  INACTIVE_FILTER,
];

let localFilters = {}, localPage = 0, searchTerm = "", selectedEvent = "";

// changing filters resets page to 0
// as page count can differ wildly based on filter
function setLocalFilters(filters) {
  localFilters = filters;
  localPage = 0;
}

function setLocalPage(page) {
  localPage = page;
}
class LoadAggregatorList extends React.Component {
  constructor(props) {
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
    switch (filterName) {
      case ALL_FILTER:
        this.setState({
          filterName: filterName
        });
        setLocalFilters(this.getFilters());
        break;
      case ACTIVE_FILTER:
        this.setState({
          filterName: filterName
        });
        setLocalFilters(this.getFilters({ active: "true" }));
        break;
      case INACTIVE_FILTER:
        this.setState({
          filterName: filterName
        });
        setLocalFilters(this.getFilters({ active: "false" }));
        break;
    }

    this.loadFromServer();
  }

  getFilters = ({ active = false, approved = false, verified = false, pendingReactivation = false } = {}) => {
    const { filterAddress, filterPendingReactivation } = this.props;

    if (active) {
      return { active: active };
    } else if (approved) {
      return { approved: approved };
    } else if (filterAddress && verified) {
      return { verified: verified };
    } else if (filterPendingReactivation && pendingReactivation) {
      return { pendingReactivation: pendingReactivation };
    } else {
      return {};
    }
  }

  loadFromServer = () => {
    if (selectedEvent != 'Event Type')
      localFilters = Object.assign(localFilters, { event: selectedEvent });
    if (searchTerm === "") {
      const { pageSize, rateCardId } = this.props;
      this.props.loadAction(localPage, pageSize, localFilters, rateCardId);
    } else {
    const { recordType } = this.props;
      this.props.searchList(recordType, searchTerm, localFilters);
    }
  }

  onActivate = (request, event) => {
    event.preventDefault();
    const { recordType, attemptActivate } = this.props;
    attemptActivate(recordType, request);
  }

  onDeactivate = (request, event) => {
    event.preventDefault();

    const { recordType, attemptDeactivate } = this.props;
    attemptDeactivate(recordType, request);
  }

  onSearch = (event) => {
    event.preventDefault();
    this.resetValues();
    const { recordType } = this.props;
    searchTerm = this.refs.searchTerm.value;

    if (recordType === 'ruleset') {
      selectedEvent = this.refs.selectEvent.value;

      if (selectedEvent != 'Event Type')
        localFilters = Object.assign(localFilters, { event: selectedEvent });
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
      localFilters = Object.assign(localFilters, { event: selectedEvent });
    this.loadFromServer();
  }

  rulesetDropDown = () => {
    const { recordType, events } = this.props;
    if (recordType === 'ruleset') {
      return (
        <select ref="selectEvent" onChange={this.onSelectEvent} style={{ paddingTop: 5 }}>
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
          pageCount={Math.ceil((count / pageSize))}
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
    const onRecordActivate = this.onActivate.bind(null, record);
    const onRecordDeactivate = this.onDeactivate.bind(null, record);
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
        <td width="90"><Boolean flag={record.active} /></td>
        <td width="250" className="btn-toolbar">
         
          <a
            className="btn btn-sm btn-primary"
            href="#"
            onClick={onRecordActivate}
            data-test-element="activate">
            Activate
          </a>
          <a
            className="btn btn-sm btn-danger"
            href="#"
            onClick={onRecordDeactivate}
            data-test-element="deactivate">
            De-activate
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
              
                <th>Active</th>
                <th className="text-center">Actions</th>
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
    if (data.length) {
      return this.renderRecords();
    } else if (error && (error === "something went wrong" || error === "timeout")) {
      return (
        <SomethingWentWrong errorMessage={error} />
      );
    } else if (data.length === 0) {
      return (
        <SomethingWentWrong errorMessage={"Your search/filter yielded no results"} />
      );
    } else {
      return (
        <PleaseWait message="Loading" />
      );
    }
  }

  render() {
    const { title, recordType, data, count, pageSize, customRows, filterAddress, events, rateCardId, filterPendingReactivation } = this.props;
    const { filterName } = this.state;
    const customFilters = filterAddress ? [ADDRESS_VERIFIED_FILTER, VERIFIED_PENDING_FILTER] : [];
    const customFilters1 = filterPendingReactivation ? [PENDING_REACTIVATION_FILTER] : []
    const filters = defaultFilters.concat(customFilters).concat(customFilters1);

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
        <div className="page-container" >
          <h1 className="page-header" data-test-element="header">{title}</h1>
          <form className="form-group" onSubmit={this.onSearch}>
            <div className="form-inline" style={{display :'none'}}>
              <div className="input-group" >
                <input className="form-control" ref="searchTerm" placeholder="Search term..." required={true} />
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

LoadAggregatorList.propTypes = {
  title: PropTypes.string.isRequired,
  recordType: PropTypes.string.isRequired,
  loadAction: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  count: PropTypes.number,
  pageSize: PropTypes.number,
  customRows: PropTypes.object,
  filterAddress: PropTypes.bool
}

LoadAggregatorList.defaultProps = {
  pageSize: 30,
  count: null,
  customRows: {
    headers: [],
    attributes: () => { }
  },
  filterAddress: false
}


export default LoadAggregatorList;
