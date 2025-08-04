// frontend/src/components/EventFilter.js
import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Form, ButtonGroup } from "react-bootstrap";
import { DateRangeContext } from "../contexts/DateRangeContext";

const EventFilter = () => {
  const { startDate, setStartDate, endDate, setEndDate } =
    useContext(DateRangeContext);
  const handleFilter = () => {};
  const handlePresetChange = (days) => {
    const today = new Date();
    const newStartDate = new Date(today);
    newStartDate.setDate(today.getDate() - days);
    setStartDate(newStartDate);
    setEndDate(today);
  };
  return (
    <div className="mb-3">
      <h3> Filter Events </h3>{" "}
      <ButtonGroup aria-label="Date range presets">
        <Button
          variant="outline-secondary"
          onClick={() => handlePresetChange(7)}
        >
          {" "}
          Last 7 Days{" "}
        </Button>{" "}
        <Button
          variant="outline-secondary"
          onClick={() => handlePresetChange(30)}
        >
          {" "}
          Last 30 Days{" "}
        </Button>{" "}
        <Button
          variant="outline-secondary"
          onClick={() => handlePresetChange(90)}
        >
          {" "}
          Last 90 Days{" "}
        </Button>{" "}
        <Button
          variant="outline-secondary"
          onClick={() => {
            const today = new Date();
            const startOfYear = new Date(today.getFullYear(), 0, 1);
            setStartDate(startOfYear);
            setEndDate(today);
          }}
        >
          {" "}
          This Year{" "}
        </Button>{" "}
      </ButtonGroup>{" "}
      <div className="d-flex align-items-center mt-3">
        <div className="me-2">
          <label htmlFor="startDate"> Start Date: </label>{" "}
          <DatePicker
            id="startDate"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Select start date"
            className="form-control"
          />
        </div>{" "}
        <div>
          <label htmlFor="endDate"> End Date: </label>{" "}
          <DatePicker
            id="endDate"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="Select end date"
            className="form-control"
          />
        </div>{" "}
        <Button variant="primary" onClick={handleFilter} className="ms-3">
          Apply Filter{" "}
        </Button>{" "}
      </div>{" "}
    </div>
  );
};

export default EventFilter;
