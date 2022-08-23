import React, { useState } from "react";
import { Checkbox, Collapse } from "antd";

const { Panel } = Collapse;
function CheckBox(props) {
  const [Checked, setChecked] = useState([]);
  const handleToggle = (value) => {
    // 누른 것의 index를 구하고
    const currentIndex = Checked.indexOf(value);

    // 전체 checked된 state에서 현재 누른 Checkbox가 이미 있다면
    const newChecked = [...Checked];

    // 빼주고
    // State 넣어준다.
    if (currentIndex === -1) {
      // 없는 값을 넣으면 -1 나옴
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);

    //update this checked information into Parent Component
    props.handleFilters(newChecked);
  };

  const renderCheckboxLists = () =>
    props.list &&
    props.list.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox
          type="checkbox"
          onChange={() => handleToggle(value._id)}
          checked={Checked.indexOf(value._id) === -1 ? false : true}
        />
        &nbsp;&nbsp;
        <span>{value.name}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </React.Fragment>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Continents" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
