import React from 'react';
import Header from 'components/header';

const Main = (props) => {
  let { children, ...otherProps} = props;
  return (
    <div className="container">
      <Header {...props}/>
      {React.cloneElement(children, {...otherProps})}
    </div>
  )
}

export default Main;
