import { Categories } from "../types/enums";
import "./FilterModal.css";

interface IProps {
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  categoryFilter: string;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
}

const FilterModal = (props: IProps) => {
  return (
    <div className="filter-modal">
      <div className="filter-info">
        <span
          className="current-filter"
          style={{
            visibility: props.categoryFilter.length > 0 ? "visible" : "hidden",
          }}
          onClick={() => props.setCategoryFilter("")}
        >
          ✕ {props.categoryFilter}
        </span>
        <div
          className="close-button"
          onClick={() => props.setShowFilter(false)}
        >
          ✕
        </div>
      </div>
      <select
        name=""
        id="filter-category-select"
        onChange={(e) => props.setCategoryFilter(e.target.value)}
      >
        <option value="">Categories</option>
        {Object.entries(Categories).map(([key, value]) => (
          <option key={key} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterModal;
