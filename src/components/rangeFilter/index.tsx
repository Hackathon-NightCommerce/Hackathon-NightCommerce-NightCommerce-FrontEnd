import { StyledRangeFilter } from "./style";
import { useProduct } from './../../hooks/useProduct';
import { useState } from 'react';
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from '@chakra-ui/react'

interface FilterProps {
  title: string;
  max: number;
  min: number;
  filterKey: string;
}

export const RangeFilter = ({ title, min: propMin, max: propMax, filterKey }: FilterProps) => {
  const { filters, getAdvertsByFilter } = useProduct();

  const [value, setValue] = useState<number[]>([propMin, propMax]);

  const min = propMin || 0;
  const max = propMax || 0; 
  
  const defaultValue = [value[0], value[1]];

  const handleRangeChange = ([minSet, maxSet]: number[]) => {
    const newFilters = {
      ...filters,
      [`min${filterKey}`]: minSet,
      [`max${filterKey}`]: maxSet,
    };
    getAdvertsByFilter(newFilters);
  };

  return (
    <StyledRangeFilter>
      <label htmlFor="minValue">{title}</label>
      <div>
        <p>{value[0]}</p>
        <p>{value[1]}</p>
      </div>
      <RangeSlider
        aria-label={['min', 'max']}
        defaultValue={defaultValue}
        min={min}
        max={max}
        onChangeEnd={handleRangeChange}
        onChange={([minSet, maxSet]) => setValue([minSet, maxSet])}
      >
        <RangeSliderTrack bg='red.100'>
          <RangeSliderFilledTrack bg="#4529E6" />
        </RangeSliderTrack>
        <RangeSliderThumb boxSize={4} index={0} bgColor="#B0A6F0" />
        <RangeSliderThumb boxSize={4} index={1} bg="#36007D" />
      </RangeSlider>
    </StyledRangeFilter>
  );
};
