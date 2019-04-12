import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { listOfWeek, listOfMonths, numOfRows } from '../constants'
import { getCellDate, getCellNativeEvent } from '../utils'

class Calendar extends Component {
  constructor () {
    super();
  }
  
  allowDrop = e => {
    e.preventDefault();
  }

  drag = e => {
    const date = e.target.getAttribute('data-date');
    const month = e.target.getAttribute('data-month');
    const data = { date, month }
    e.dataTransfer.setData("text", JSON.stringify(data));
  }

  drop = e => {
    e.preventDefault();
    var data = JSON.parse(e.dataTransfer.getData("text"));
    const date = e.target.getAttribute('data-date');
    const month = e.target.getAttribute('data-month');
    const updatedData = { from: data, to: {date, month} }
    this.props.updateEvent(updatedData)
  }

  getDays = () => {
    const week = [];
    for(let i = 0; i < 7; i++) {
      week.push(<div className='week-day'>{listOfWeek[i]}</div>)
    }
    return <div className='week-days'>{week}</div>
  }

  render() {
    const { currentMonth, currentYear, handlePrev, handleNext, handleToday} = this.props; 
    const renderRowContentCell = (i) => (
      <div className="cell-row"> {listOfWeek.map((item, ind) => {
          const {content, nameOfMonth, currentDay} = getCellDate(i, ind, this.props)
          return (
            <div key={item} className="date-cell">
              {content}
              {/* <div id='drag' data-month={nameOfMonth} data-date={currentDay} draggable onDragStart={this.drag} onDragOver={this.allowDrop} onDrop={this.drop}>event</div>
              <div id="div2" onDrop={this.drop} onDragOver={this.allowDrop}></div> */}
            </div>
          )
        })}
      </div>
      )

    const renderRowContentCellEvents = (i) => {
      return <div className="cell-row"> {listOfWeek.map((item, ind) => <div key={item} className="native-event-cell">
        {getCellNativeEvent(i, ind, this.props)}
      </div>)}</div>;
    }

    const renderRowContent = (i) => {
      return <div className='content-row'>{[renderRowContentCell(i), renderRowContentCellEvents(i)]}</div>;
    }

    const renderRowBg = () => {
      return <div className="bg-row"> {listOfWeek.map(week => <div key={week} className="day-bg"></div>)}</div>;
    }

    const renderRow = () => {
      const rowData = [];
      for (let i = 0; i < numOfRows; i++) {
        const eachRow = [renderRowBg(), renderRowContent(i)] // Bring me rows for each week(i) (total 6 weeks/rows)
        rowData.push(eachRow)
      }
      return <div className="month-calendar">{
        rowData.map( ([eachRowBg, eachRowContent], ind) => <div key={String(ind)} className="week-row">{eachRowBg}{eachRowContent}</div>)
      }</div>;
    }
    
    return (
      <div className="App">
        <div className='calendar'>
          <div className='header'>
            <h2>{listOfMonths[currentMonth]} {currentYear}</h2>
            <div>
              <button onClick={handlePrev}>prev</button>
              <button onClick={handleToday}>today</button>
              <button onClick={handleNext}>next</button>
            </div>
            
          </div>
          
          <div className='filter'>
            <button>All</button>
            <button>Home</button>
            <button>Work</button>
            <button>Family</button>
          </div>

          {this.getDays()}

          {renderRow()}
        
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  currentMonth: PropTypes.number,
  currentYear: PropTypes.number,
  handlePrev: PropTypes.func,
  handleNext: PropTypes.func,
  handleToday: PropTypes.func,
}

export default Calendar;
