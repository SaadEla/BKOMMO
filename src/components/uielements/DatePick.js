import React, { useState, useEffect } from "react";

import { DatePicker } from "@progress/kendo-react-dateinputs";
import {
  IntlProvider,
  load,
  loadMessages,
  LocalizationProvider,
} from "@progress/kendo-react-intl";
import weekData from "cldr-core/supplemental/weekData.json";
import numbers from "cldr-numbers-full/main/fr/numbers.json";
import caGregorian from "cldr-dates-full/main/fr/ca-gregorian.json";
import dateFields from "cldr-dates-full/main/fr/dateFields.json";
import timeZoneNames from "cldr-dates-full/main/fr/timeZoneNames.json";
import esMessages from "./fr.json";
//import {DatePicker} from "antd";

load(weekData, numbers, caGregorian, dateFields, timeZoneNames);
loadMessages(esMessages, "fr-FR");

const DatePick = (props) => {
  const {
    disabled,
    value,
    onChangeDate,
    onChange,
    defaultValue,
    width = "70%",
  } = props;
  return (
    <LocalizationProvider language="fr-FR">
      <IntlProvider locale="fr">
        <div>
          <DatePicker
            disabled={disabled}
            value={value || defaultValue}
            style={{ zIndex: 1000000 }}
            onChange={onChangeDate ? onChangeDate : onChange}
            format="dd/MM/yyyy"
            width={width}
            tabIndex="502"
            formatPlaceholder={{ year: "yyyy", month: "mm", day: "dd" }}
            {...props}
          />
        </div>
      </IntlProvider>
    </LocalizationProvider>
  );
};

export default DatePick;
