import React from "react";
import Select from "react-select";
import { ExperienceOptions } from "./options";

export default function ExperienceSelect() {
  return (
    <div className="role-select-container">
      <Select
        options={ExperienceOptions}
        placeholder="Experience"
        className="mult-select"
        classNamePrefix="select"
      />
    </div>
  );
}
