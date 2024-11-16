import { Categories } from "../types/enums";

interface IProps {
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
}

const FilterModal = (props: IProps) => {
  return (
    <div
      className="filter-modal"
      style={{
        position: "absolute",
        padding: 10,
        backgroundColor: "white",
        zIndex: 1000,
        width: "-webkit-fill-available",
        display: "flex",
        flexDirection: "column",
        top: 0,
      }}
    >
      <div
        style={{ padding: 10, fontSize: 20, alignSelf: "end" }}
        onClick={() => props.setShowFilter(false)}
      >
        x
      </div>
      <select
        name=""
        id="filter-category-select"
        style={{ marginBottom: 10 }}
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
