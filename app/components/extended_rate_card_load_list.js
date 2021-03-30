import React, { Fragment } from "react";
import PropTypes from "prop-types";
import FilterButton from "components/filter_button";
import SomethingWentWrong from "components/something_went_wrong";
import PleaseWait from "components/please_wait";
import ReactPaginate from "react-paginate";
import { h } from "preact";
import { somethingWentWrong } from "../actions/action_creators";

const NO_FILTER = "No Filter";
const defaultFilters = [NO_FILTER];
let localFilters = {},
  localPage = 0,
  selectedEvent = "";

function setLocalPage(page) {
  localPage = page;
}

const cardTypes = ["BASIC_RATE_CARD", "COUNT_BASED_RATE_CARD"];

const fromAmount = [100001];
const toAmount = [200000];

const Style = {
  marginTop: 10
};

const MarginLeft = {
  marginLeft: 5
};

const SlabbedFee = ["true", "false"];

const rates = ["true", "false"];

class ExtendedRateCardLoadList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: localPage,
      filterName: "",
      localFilters: {},
      cardType: "",
      isHidden: true,
      isTrue: false,
      input: "",
      rules: []
    };
  }

  componentDidMount() {
    this.loadFromServer();
  }

  loadFromServer = () => {
    let { count, pageSize } = this.props;
    if (count < localPage * pageSize) {
      pageSize = count - (localPage - 1 * pageSize);
    }
    this.props.loadAction(localPage, pageSize, this.state.localFilters, {});
  };

  toggleHidden = e => {
    e.preventDefault();
    this.setState({ isHidden: !this.state.isHidden });
  };

  onSearchTerm = e => {
    if (e.key == "Enter") {
      this.onSearch();
    }
  };

  onSearch = event => {
    // event.preventDefault();

    // let DecimalV = Number(this.refs.DecimalValue.value);
    const { rules } = this.state;

    if (!rules) {
      return <div>Rules can't be blank</div>;
    }

    let pgId = this.refs.pgId.value;
    let shortId = this.refs.shortId.value;
    let providerName = this.refs.providerName.value;
    let merchant = this.refs.merchant.value;
    // let DecimalValue = this.refs.DecimalValue ? DecimalV : "";
    // let cardType = this.refs.cardType ? this.refs.cardType.value : "";
    // let slabbedFee = this.refs.slabbedFee.value === "true" ? true : false;
    // let rate = this.refs.rate.value === "true" ? true : false;
    // let fromAmount = this.refs.fromAmount
    //   ? Number(this.refs.fromAmount.value)
    //   : null;
    // let toAmount = this.refs.toAmount ? Number(this.refs.toAmount.value) : null;

    this.props.loadAction(0, 30, this.state.localFilters, {
      pgId,
      shortId,
      providerName,
      merchant,
      rules
      // DecimalValue,
      // cardType,
      // slabbedFee,
      // rate,
      // fromAmount,
      // toAmount,
      // slabbedFees
    });
  };

  onClear = event => {
    if (event.target.id === "pgId") {
      this.refs.pgId.value = "";
    } else if (event.target.id === "shortId") {
      this.refs.shortId.value = "";
    } else if (event.target.id === "merchant") {
      this.refs.merchant.value = "";
    } else if (event.target.id === "providerName") {
      this.refs.providerName.value = "";
    } else if (event.target.id === "DecimalValue") {
      this.refs.DecimalValue.value = "";
    }
    this.loadFromServer();
  };

  handlePageClick = data => {
    const page = data.selected;
    setLocalPage(page);
    this.loadFromServer();
  };

  onFilter = event => {
    event.persist();
    const filterName = event.target.dataset.filterName;
    let noFilterActive = this.state.filterName === "No Filter";
    switch (filterName) {
      case NO_FILTER:
        // if(!noFilterActive){
        //   this.refs.merchant.value = "";
        //   this.refs.providerName.value = "";
        //   this.refs.pgId.value = "";
        // }
        this.setState(
          {
            localFilters: noFilterActive
              ? { noFilter: false }
              : { noFilter: true },
            filterName: noFilterActive ? "" : filterName
          },
          () => {
            this.onSearch(event);
          }
        );
        break;
    }
  };

  onSelectEvent = () => {
    selectedEvent = this.refs.selectEvent.value;
    if (selectedEvent != "Event Type")
      localFilters = Object.assign(localFilters, { event: selectedEvent });
    this.setState({
      localFilters: { ...this.state.localFilters, ...localFilters }
    });
    this.loadFromServer();
  };

  rulesetDropDown = () => {
    const { data, recordType, events } = this.props;

    if (recordType === "rateCardTemplate") {
      return (
        <select
          ref="selectEvent"
          onChange={this.onSelectEvent}
          style={{ paddingTop: 5 }}
        >
          <option key="event">Event Type</option>
          {events}
          {/* {events.map(function(event) {
            return <option key={event}>{event}</option>;
          })} */}
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
          forcePage={localPage}
          pageNum={pageNum}
          onPageChange={this.handlePageClick}
          previousLabel={"previous"}
          nextLabel={"next"}
          pageCount={Math.ceil(count / pageSize)}
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
    const customAttributes = customRows.attributes(record) || [];
    var counter = 0;

    return (
      <tr key={`${recordType}-${record.id}`}>
        {customAttributes.map(attribute => {
          return <td key={`attribute-${counter++}`}>{attribute}</td>;
        })}
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

  AddArray = e => {
    e.preventDefault();
    this.setState({
      rules: this.state.rules.concat([
        {
          card_type: "",
          rate: "",
          value: "",
          slabbedFee: false,
          slabbedFees: []
        }
      ])
    });
  };

  OnRemoveArray = id => {
    let deletedRules = this.state.rules;
    deletedRules.splice(id, 1);

    this.setState({
      rules: deletedRules
    });
  };

  AddNestedArray = (e, id) => {
    e.preventDefault();
    let newArray = this.state.rules.map((obj, idx) => {
      if (obj.slabbedFee === true) {
        if (id == idx) {
          obj.slabbedFees.push({
            fromAmount: "",
            toAmount: "",
            value: "",
            rate: ""
          });
        }
        return obj;
      } else {
        obj.slabbedFees == [];
      }
    });
    this.setState({ rules: newArray });
  };

  RemoveNestedArray = (e, nestedIndex, index) => {
    let copyArray = [...this.state.rules];

    let removableSlabbedFeesArray = copyArray[index].slabbedFees;
    removableSlabbedFeesArray.splice(nestedIndex, 1);

    this.setState({ rules: copyArray });
  };

  onChangeValue = (id, e) => {
    let newArray = this.state.rules.map((obj, idx) => {
      if (id == idx) {
        if (e.target.checked) {
          obj.slabbedFee = true;
          obj.slabbedFees.push({
            fromAmount: "",
            toAmount: "",
            value: "",
            rate: ""
          });
        } else {
          obj.slabbedFee = false;
          obj.slabbedFees = [];
        }
      }
      return obj;
    });
    this.setState({ rules: newArray });
  };

  onChangeRulesCardType = (id, e) => {
    let newArray = this.state.rules.map((obj, idx) => {
      if (id == idx) {
        if (e.target.value) {
          obj.card_type = e.target.value;
        } else {
          obj.card_type = "";
        }
      }
      return obj;
    });

    this.setState({ rules: newArray });
  };

  onChangeValueRules = (id, e) => {
    let newArray = this.state.rules.map((obj, idx) => {
      if (id == idx) {
        if (e.target.value) {
          obj.value = Number(e.target.value);
        } else {
          obj.value = "";
        }
      }
      return obj;
    });
    this.setState({ rules: newArray });
  };

  onChangeValueRulesRate = (id, e) => {
    let newArray = this.state.rules.map((obj, idx) => {
      if (id == idx) {
        if (e.target.value) {
          obj.rate = e.target.value === "true" ? true : false;
        } else {
          obj.rate = "";
        }
      }
      return obj;
    });
    this.setState({ rules: newArray });
  };

  onChangeValueFromAmount = (e, MainIndex, SlabbedIndex) => {
    let newArray = this.state.rules.map((Item, idx) => {
      if (idx === MainIndex) {
        Item.slabbedFees.map((nestedObj, index) => {
          if (index === SlabbedIndex) {
            if (e.target.value) {
              nestedObj.fromAmount = parseInt(e.target.value);
            } else {
              nestedObj.fromAmount = "";
            }
            return nestedObj;
          }
        });
      }
      return Item;
    });

    this.setState({ rules: newArray });
  };
  onChangeValueToAmount = (e, MainIndex, SlabbedIndex) => {
    let newArray = this.state.rules.map((Item, idx) => {
      if (idx === MainIndex) {
        Item.slabbedFees.map((nestedObj, index) => {
          if (index === SlabbedIndex) {
            if (e.target.value) {
              nestedObj.toAmount = parseInt(e.target.value);
            } else {
              nestedObj.toAmount = "";
            }
            return nestedObj;
          }
        });
      }
      return Item;
    });

    this.setState({ rules: newArray });
  };

  onChangeValueSlabbed = (e, MainIndex, SlabbedIndex) => {
    let newArray = this.state.rules.map((Item, idx) => {
      if (idx === MainIndex) {
        Item.slabbedFees.map((nestedObj, index) => {
          if (index === SlabbedIndex) {
            if (e.target.value) {
              nestedObj.value = Number(e.target.value);
            } else {
              nestedObj.value = "";
            }
            return nestedObj;
          }
        });
      }
      return Item;
    });

    this.setState({ rules: newArray });
  };

  onChangeRulesSlabbedrate = (e, MainIndex, SlabbedIndex) => {
    let newArray = this.state.rules.map((Item, idx) => {
      if (idx === MainIndex) {
        Item.slabbedFees.map((nestedObj, index) => {
          if (index === SlabbedIndex) {
            if (e.target.value) {
              nestedObj.rate = e.target.value === "true" ? true : false;
            } else {
              nestedObj.rate = "";
            }
            return nestedObj;
          }
        });
      }
      return Item;
    });

    this.setState({ rules: newArray });
  };

  render() {
    const { rules } = this.state;

    return (
      <div>
        <div className="btn-group btn-group-xs pull-right" role="group">
          {defaultFilters.map(filterText => {
            return (
              <FilterButton
                key={`filter=${filterText}`}
                selectedFilter={this.state.filterName}
                onFilter={this.onFilter}
                text={filterText}
              />
            );
          })}
        </div>

        <div className="page-container">
          <h1 className="page-header" data-test-element="header">
            {this.props.title}
          </h1>
          <form className="form-group" onKeyPress={e => this.onSearchTerm(e)}>
            <div className="form-inline flex">
              <div className="input-group customMargin">
                <input
                  className="form-control"
                  ref="shortId"
                  placeholder="Search shortId..."
                  required={true}
                />
                <a
                  className="input-group-addon btn"
                  id="shortId"
                  href="#"
                  onClick={this.onClear}
                >
                  x
                </a>
              </div>
              <div className="input-group customMargin">
                <input
                  className="form-control"
                  ref="merchant"
                  placeholder="Search merchant..."
                  required={true}
                />
                <a
                  className="input-group-addon btn"
                  id="merchant"
                  href="#"
                  onClick={this.onClear}
                >
                  x
                </a>
              </div>
              <div className="input-group customMargin">
                <input
                  className="form-control"
                  ref="pgId"
                  placeholder="Search pgId..."
                  required={true}
                />
                <a
                  className="input-group-addon btn"
                  id="pgId"
                  href="#"
                  onClick={this.onClear}
                >
                  x
                </a>
              </div>
              <div className="input-group customMargin">
                <input
                  className="form-control"
                  ref="providerName"
                  placeholder="Search provider name..."
                  required={true}
                />
                <a
                  className="input-group-addon btn"
                  id="providerName"
                  href="#"
                  onClick={this.onClear}
                >
                  x
                </a>
              </div>

              <div className="input-group" style={{ marginLeft: 5 }}>
                <a
                  className="input-group-addon btn-lg"
                  href="#"
                  type="submit"
                  onClick={this.onSearch}
                >
                  Search
                </a>
              </div>
              <div className="row">
                {rules.map((itemName, id) => (
                  <Fragment>
                    <div
                      className="col-md-11 jumbotron"
                      style={{
                        marginTop: 5,
                        marginLeft: 20,
                        minHeight: 150
                      }}
                    >
                      <div className="col-md-3">
                        <select
                          className="form-control"
                          value={itemName.card_type}
                          onChange={e => {
                            this.onChangeRulesCardType(id, e);
                          }}
                        >
                          <option>Select Card Type</option>

                          {cardTypes.map(cardType => {
                            return (
                              <option key={`sub-option-${cardType}`}>
                                {cardType}
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      <div className="col-md-3">
                        <input
                          className="form-control"
                          value={itemName.slabbedFee}
                          type="checkbox"
                          onChange={e => this.onChangeValue(id, e)}
                          id="checkid"
                          type="checkbox"
                          required
                        />

                        <label
                          style={{ marginLeft: 10, marginTop: 10 }}
                          htmlFor="checkid"
                        >
                          Slabbed Condition
                        </label>
                      </div>
                      <br />

                      <div className="col-md-10" style={{ marginLeft: 20 }}>
                        {itemName.slabbedFee ? (
                          <div>
                            {itemName.slabbedFees.map((nestedName, idN) => (
                              <div style={{ marginTop: 10 }}>
                                <input
                                  validate
                                  className="form-control"
                                  name="fromAmount"
                                  required={true}
                                  type="number"
                                  placeholder="Enter FromAmount"
                                  value={nestedName.fromAmount}
                                  onChange={e =>
                                    this.onChangeValueFromAmount(e, id, idN)
                                  }
                                />

                                <input
                                  style={MarginLeft}
                                  className="form-control"
                                  required={true}
                                  type="number"
                                  value={nestedName.toAmount}
                                  placeholder="Enter ToAmount"
                                  onChange={e =>
                                    this.onChangeValueToAmount(e, id, idN)
                                  }
                                />
                                <input
                                  style={MarginLeft}
                                  className="form-control"
                                  required={true}
                                  type="number"
                                  step="any"
                                  value={nestedName.value}
                                  placeholder="Enter Slabbed Value"
                                  onChange={e =>
                                    this.onChangeValueSlabbed(e, id, idN)
                                  }
                                />

                                <select
                                  style={MarginLeft}
                                  className="form-control"
                                  required={true}
                                  value={nestedName.rate}
                                  onChange={e =>
                                    this.onChangeRulesSlabbedrate(e, id, idN)
                                  }
                                >
                                  <option>Select rate</option>
                                  {rates.map(rate => {
                                    return (
                                      <option key={`sub-option-${rate}`}>
                                        {rate}
                                      </option>
                                    );
                                  })}
                                </select>

                                <button
                                  style={{ marginLeft: 10 }}
                                  className="btn btn-danger"
                                  onClick={e =>
                                    this.RemoveNestedArray(e, idN, id)
                                  }
                                >
                                  {" "}
                                  -
                                </button>
                                <button
                                  disabled={
                                    !nestedName.fromAmount &&
                                    !nestedName.toAmount &&
                                    !nestedName.value &&
                                    !nestedName.rate
                                  }
                                  style={{ marginLeft: 10 }}
                                  className="btn btn-primary"
                                  onClick={e => this.AddNestedArray(e, id)}
                                >
                                  {" "}
                                  +
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <Fragment>
                            <input
                              style={MarginLeft}
                              className="form-control"
                              required={true}
                              type="number"
                              step="any"
                              value={itemName.value}
                              onChange={e => this.onChangeValueRules(id, e)}
                              placeholder="Enter Value"
                            />

                            <select
                              style={MarginLeft}
                              className="form-control"
                              required={true}
                              value={itemName.rate}
                              onChange={e => this.onChangeValueRulesRate(id, e)}
                            >
                              <option>Select rate</option>
                              {rates.map(rate => {
                                return (
                                  <option key={`sub-option-${rate}`}>
                                    {rate}
                                  </option>
                                );
                              })}
                            </select>
                          </Fragment>
                        )}
                      </div>

                      <button
                        style={{ marginLeft: 10, marginTop: "-20px" }}
                        type="button"
                        className="btn btn-danger"
                        onClick={e => this.OnRemoveArray(id)}
                      >
                        -
                      </button>
                    </div>
                  </Fragment>
                ))}
              </div>

              <button
                style={{ marginLeft: 5, marginTop: 10 }}
                type="button"
                className="btn btn-primary"
                onClick={this.AddArray}
              >
                Add Rule
              </button>
            </div>
            {/* {this.rulesetDropDown()} */}
          </form>
          {this.renderData()}
        </div>
      </div>
    );
  }
}

ExtendedRateCardLoadList.propTypes = {
  title: PropTypes.string.isRequired,
  recordType: PropTypes.string.isRequired,
  loadAction: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  count: PropTypes.number,
  pageSize: PropTypes.number,
  customRows: PropTypes.object,
  filterAddress: PropTypes.bool
};

ExtendedRateCardLoadList.defaultProps = {
  pageSize: 30,
  count: null,
  customRows: {
    headers: [],
    attributes: () => {}
  },
  filterAddress: false
};

export default ExtendedRateCardLoadList;
