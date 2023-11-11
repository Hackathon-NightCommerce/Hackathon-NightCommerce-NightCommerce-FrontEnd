import { useProduct } from "../../hooks/useProduct";
import { StyledFilterComponent } from "./style";
interface FilterProps {
  title: string;
  filter: string[] | string;
  filterKey: string;
}

export const FilterComponent = ({ title, filter, filterKey }: FilterProps) => {
  const { getAdvertsByFilter, filters } = useProduct();

  const handleFilterClick = (selectedValue: string): void => {
    const newFilters = {
      ...filters,
      [filterKey]: selectedValue,
    };
    getAdvertsByFilter(newFilters);
    
  };

  const filterArray = Array.isArray(filter) ? filter : Array.of(filter);

  return (
    <StyledFilterComponent>
      <h1>{title}</h1>
      <ul>
        {filterArray.map((value: string) => {
          const lines = value.split('\n');  
          const firstLine = lines[0];  
          return (
            <li key={value} onClick={() => handleFilterClick(value)}>
              <button className={filterArray.length <= 1 ? "select" : undefined}>
                {firstLine[0]?.toUpperCase() + firstLine.slice(1).split(" ")[0]}
              </button>
            </li>
          );
        })}
      </ul>
    </StyledFilterComponent>
  );

};
