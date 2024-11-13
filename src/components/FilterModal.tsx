import React from "react";
import { ILocation } from "../interfaces";
import { Categories } from "../enums";

interface IProps {
  locations: ILocation[];
}

const FilterModal = (props: IProps) => {
  const filteredLocations = (category: Categories) => {
    return props.locations.filter((loc) => loc.category === category);
  };
  return <div>FilterModal</div>;
};

export default FilterModal;
