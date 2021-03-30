import React from "react";
import PropTypes from "prop-types";
import SomethingWentWrong from "components/something_went_wrong";
import FilterButton from "components/filter_button";
import Boolean from "components/boolean";
import PleaseWait from "components/please_wait";
import ReactPaginate from "react-paginate";

const ALL_FILTER = "All";
const NO_FILTER = "No Filter";
const ACTIVE_FILTER = "Active";
const INACTIVE_FILTER = "In-Active";
const APPROVED_FILTER = "Approved";
const NOT_APPROVED_FILTER = "Not-Approved";
const ADDRESS_VERIFIED_FILTER = "Address Verified";
const VERIFIED_PENDING_FILTER = "Verification Pending";

const defaultFilters = [
  ALL_FILTER,
  NO_FILTER,
  ACTIVE_FILTER,
  INACTIVE_FILTER,
  APPROVED_FILTER,
  NOT_APPROVED_FILTER
];

let localFilters = {},
  searchTerm = "",
  selectedEvent = "";

// changing filters resets page to 0
// as page count can differ wildly based on filter
function setLocalFilters(filters) {
  localFilters = filters;
}

class LoadRuleSetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      filterName: ALL_FILTER
    };
  }

  componentDidMount() {
    this.resetValues();
    this.loadFromServer();

    const { recordType } = this.props;
    if (recordType === "ruleset") {
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
  };

  onFilter = event => {
    const filterName = event.target.dataset.filterName;

    switch (filterName) {
      case ALL_FILTER:
        this.setState({
          filterName: filterName
        });
        setLocalFilters(this.getFilters());
        break;
      case NO_FILTER:
        setLocalFilters(
          this.getFilters(
            this.state.filterName === "NO_FILTER"
              ? { noFilter: false }
              : { noFilter: true }
          )
        );
        this.setState({
          filterName: filterName
        });
        // this.refs.merchantFilter.value = "";
        // this.refs.providerNameFilter.value = "";
        // this.refs.pgIdFilter.value = "";
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
      case APPROVED_FILTER:
        this.setState({
          filterName: filterName
        });
        setLocalFilters(this.getFilters({ approved: "true" }));
        break;
      case NOT_APPROVED_FILTER:
        this.setState({
          filterName: filterName
        });
        setLocalFilters(this.getFilters({ approved: "false" }));
        break;
      case ADDRESS_VERIFIED_FILTER:
        this.setState({
          filterName: filterName
        });
        setLocalFilters(this.getFilters({ verified: "true" }));
        break;
      case VERIFIED_PENDING_FILTER:
        this.setState({
          filterName: filterName
        });
        setLocalFilters(this.getFilters({ verified: "false" }));
        break;
    }

    this.loadFromServer();
  };

  getFilters = ({
    active = false,
    approved = false,
    verified = false,
    noFilter = false
  } = {}) => {
    const { filterAddress } = this.props;

    if (active) {
      return { active: active };
    } else if (approved) {
      return { approved: approved };
    } else if (filterAddress && verified) {
      return { verified: verified };
    } else if (noFilter) {
      return { noFilter: noFilter };
    } else {
      return {};
    }
  };

  loadFromServer = () => {
    this.onSearch();
  };

  onApprove = (request, event) => {
    event.preventDefault();

    const { recordType, attemptApprove } = this.props;
    attemptApprove(recordType, request);
  };

  onActivate = (request, event) => {
    event.preventDefault();

    const { recordType, attemptActivate } = this.props;
    attemptActivate(recordType, request);
  };

  onDeactivate = (request, event) => {
    event.preventDefault();

    const { recordType, attemptDeactivate } = this.props;
    attemptDeactivate(recordType, request);
  };

  onSearchTerm = e => {
    if (e.key === "Enter") {
      this.onSearch();
    }
  };

  onSearch = (event = false) => {
    event && this.setState({ page: 0 });
    event && this.resetValues();
    const { recordType } = this.props;

    if (recordType === "ruleset") {
      selectedEvent = this.refs.selectEvent.value;

      if (selectedEvent != "Event Type")
        localFilters = Object.assign(localFilters, { event: selectedEvent });
    }
    let searchTerm = this.refs.searchTerm.value;
    let merchantFilter = this.refs.merchantFilter.value;
    let providerNameFilter = this.refs.providerNameFilter.value;
    let pgIdFilter = this.refs.pgIdFilter.value;
    let { count, pageSize } = this.props;
    if (count < this.state.page * pageSize) {
      pageSize = count - (this.state.page - 1 * pageSize);
    }
    this.props.loadAction(event ? 0 : this.state.page, pageSize, localFilters, {
      searchTerm,
      merchantFilter,
      providerNameFilter,
      pgIdFilter
    });
  };

  onClear = event => {
    const { recordType } = this.props;
    this.resetValues();
    if (event.target.id === "searchTerm") {
      this.refs.searchTerm.value = "";
    } else if (event.target.id === "merchantFilter") {
      this.refs.merchantFilter.value = "";
    } else if (event.target.id === "providerNameFilter") {
      this.refs.providerNameFilter.value = "";
    } else {
      this.refs.pgIdFilter.value = "";
    }
    if (recordType === "ruleset") {
      this.refs.selectEvent.value = "Event Type";
    }
    this.loadFromServer();
  };

  handlePageClick = data => {
    const page = data.selected;
    this.setState({ page });
    this.loadFromServer();
  };

  onSelectEvent = () => {
    selectedEvent = this.refs.selectEvent.value;
    if (selectedEvent != "Event Type")
      localFilters = Object.assign(localFilters, { event: selectedEvent });

    this.onSearch(true);
  };

  rulesetDropDown = () => {
    const { recordType, events } = this.props;
    if (recordType === "ruleset") {
      return (
        <select
          ref="selectEvent"
          onChange={this.onSelectEvent}
          style={{ paddingTop: 5, marginTop: 10 }}
        >
          <option key="event">Event Type</option>
          {events.map(function(event) {
            return <option key={event}>{event}</option>;
          })}
        </select>
      );
    }
  };

  // do not paginate if:
  // 1. there is no count
  // 2. there is only one page
  renderPaginate = () => {
    const { count, pageSize } = this.props;
    const pageNum = count ? Math.ceil(count / pageSize) : 1;

    if (pageNum > 1) {
      return (
        <ReactPaginate
          forcePage={this.state.page}
          pageNum={pageNum}
          onPageChange={this.handlePageClick}
          previousLabel={"previous"}
          pageCount={Math.ceil(count / pageSize)}
          nextLabel={"next"}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          breakLabel={<a href="">...</a>}
          breakClassName={"break-me"}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      );
    } else {
      return null;
    }
  };

  renderRecord = record => {
    const { recordType, customRows } = this.props;
    const onRecordApprove = this.onApprove.bind(null, record);
    const onRecordActivate = this.onActivate.bind(null, record);
    const onRecordDeactivate = this.onDeactivate.bind(null, record);
    const customAttributes = customRows.attributes(record) || [];
    var counter = 0;

    return (
      <tr key={`${recordType}-${record.id}`}>
        {customAttributes.map(attribute => {
          return <td key={`attribute-${counter++}`}>{attribute}</td>;
        })}
        <td width="90">
          <Boolean flag={record.approved} />
        </td>
        <td width="90">
          <Boolean flag={record.active} />
        </td>
        <td width="250" className="btn-toolbar">
          <a
            className="btn btn-sm btn-success"
            href="#"
            onClick={onRecordApprove}
            data-test-element="approve"
          >
            Approve
          </a>
          <a
            className="btn btn-sm btn-primary"
            href="#"
            onClick={onRecordActivate}
            data-test-element="activate"
          >
            Activate
          </a>
          <a
            className="btn btn-sm btn-danger"
            href="#"
            onClick={onRecordDeactivate}
            data-test-element="deactivate"
          >
            De-activate
          </a>
        </td>
      </tr>
    );
  };

  renderRecords = () => {
    const { data, customRows } = this.props;
    var counter = 0;

    return (
      <div>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <tbody>
              <tr>
                {customRows.headers.map(rowName => {
                  return <th key={`header-${counter++}`}>{rowName}</th>;
                })}
                <th>Approved</th>
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
  };

  renderData = () => {
    const { data, error } = this.props;

    if (error) {
      if (data.length) {
        return this.renderRecords();
      } else {
        return <SomethingWentWrong errorMessage={error} />;
      }
    } else if (data.length) {
      return this.renderRecords();
    } else {
      return <PleaseWait message="Loading" />;
    }
  };

  render() {
    const { title, filterAddress } = this.props;
    const { filterName } = this.state;
    const customFilters = filterAddress
      ? [ADDRESS_VERIFIED_FILTER, VERIFIED_PENDING_FILTER]
      : [];
    const filters = defaultFilters.concat(customFilters);

    return (
      <div>
        <div className="btn-group btn-group-xs pull-right" role="group">
          {filters.map(filterText => {
            return (
              <FilterButton
                key={`filter=${filterText}`}
                selectedFilter={filterName}
                onFilter={this.onFilter}
                text={filterText}
              />
            );
          })}
        </div>
        <div className="page-container">
          <h1 className="page-header" data-test-element="header">
            {title}
          </h1>
          <form className="form-group" onKeyPress={e => this.onSearchTerm(e)}>
            <div className="form-inline flex">
              <div className="input-group customMargin">
                <input
                  className="form-control"
                  ref="searchTerm"
                  placeholder="Search term..."
                  required={true}
                />
                <a
                  className="input-group-addon btn"
                  id="searchTerm"
                  href="#"
                  onClick={this.onClear}
                >
                  x
                </a>
              </div>
              <div className="input-group customMargin">
                <input
                  className="form-control"
                  ref="merchantFilter"
                  placeholder="Search merchant filter..."
                  required={true}
                />
                <a
                  className="input-group-addon btn"
                  id="merchantFilter"
                  href="#"
                  onClick={this.onClear}
                >
                  x
                </a>
              </div>
              <div className="input-group customMargin">
                <input
                  className="form-control"
                  ref="providerNameFilter"
                  placeholder="Search provider name..."
                  required={true}
                />
                <a
                  className="input-group-addon btn"
                  id="providerNameFilter"
                  href="#"
                  onClick={this.onClear}
                >
                  x
                </a>
              </div>
              <div className="input-group customMargin">
                <input
                  className="form-control"
                  ref="pgIdFilter"
                  placeholder="Search pg id filter..."
                  required={true}
                />
                <a
                  className="input-group-addon btn"
                  id="pgIdFilter"
                  href="#"
                  onClick={this.onClear}
                >
                  x
                </a>
              </div>
              <div className="input-group">
                <a
                  className="input-group-addon btn-lg"
                  href="#"
                  type="submit"
                  onClick={this.onSearch}
                >
                  Search
                </a>
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

LoadRuleSetList.propTypes = {
  title: PropTypes.string.isRequired,
  recordType: PropTypes.string.isRequired,
  loadAction: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  count: PropTypes.number,
  pageSize: PropTypes.number,
  customRows: PropTypes.object,
  filterAddress: PropTypes.bool
};

LoadRuleSetList.defaultProps = {
  pageSize: 30,
  count: null,
  customRows: {
    headers: [],
    attributes: () => {}
  },
  filterAddress: false
};

export default LoadRuleSetList;
