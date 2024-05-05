import React from "react";
import Select from "react-select";
import { RemoteOptions } from "./options";

export default function RemoteSelect() {
  return (
    <div className="role-select-container">
      <Select
        options={RemoteOptions}
        placeholder="Remote"
        className="mult-select"
        classNamePrefix="select"
      />
    </div>
  );
}
