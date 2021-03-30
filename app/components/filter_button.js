import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class FilterButton extends React.Component{ 
  
  isActive = () => {
    const { text, selectedFilter } = this.props;
    return (text === selectedFilter);
  }

  render() {
    const { text, onFilter } = this.props;
    const active = this.isActive();

    const buttonClass = classNames({
      'btn btn-default': true,
      'active': active
    });

    return (
      <button
        type="button"
        onClick={onFilter}
        className={buttonClass}
        data-filter-name={text}>{text}
      </button>
    );
  }
}

FilterButton.propTypes = {
  text: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired
};

FilterButton.defaultProps = {
  active: false
}

export default FilterButton;
