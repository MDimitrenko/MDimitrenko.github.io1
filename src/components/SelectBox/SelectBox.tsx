import React, { FC } from 'react';

import './SelectBox.css';

import Select, { components } from 'react-select';

// import question from "src/images/question.png";

export type SelectBoxProps = {
  label: string;
  // options: string[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};
export const SelectBox: FC<SelectBoxProps> = ({ label, onChange }) => {
  // const dispatch = useDispatch();
  // const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //     dispatch(setProcessed(event.target.value))
  //
  // }
  const options = [
    { value: 'England', label: 'England', icon: 'england.svg' },
    { value: 'Germany', label: 'Germany', icon: 'germany.svg' },
  ];

  const { Option } = components;
  const IconOption = (props: any) => (
    <Option {...props}>
      <img src={require('./' + props.data.icon)} style={{ width: 36 }} alt={props.data.label} />
      {props.data.label}
    </Option>
  );

  return <Select defaultValue={options[0]} options={options} components={{ Option: IconOption }} />;
};

export default SelectBox;
