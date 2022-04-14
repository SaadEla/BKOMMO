import React, { useState, useEffect } from 'react';

import { DatePicker } from '@progress/kendo-react-dateinputs';
import { IntlProvider, load, loadMessages, LocalizationProvider } from '@progress/kendo-react-intl';
import weekData from 'cldr-core/supplemental/weekData.json';
import numbers from 'cldr-numbers-full/main/fr/numbers.json';
import caGregorian from 'cldr-dates-full/main/fr/ca-gregorian.json';
import dateFields from 'cldr-dates-full/main/fr/dateFields.json';
import timeZoneNames from 'cldr-dates-full/main/fr/timeZoneNames.json';
import esMessages from './fr.json';


load(
    weekData, numbers,
    caGregorian,
    dateFields,
    timeZoneNames
);
loadMessages(esMessages, 'fr-FR');



const DatePick2 = ({ onChangeDate, defaultValue }) => {

    return (
        <LocalizationProvider language="fr-FR">
            <IntlProvider locale="fr">
                <div>
                    <DatePicker
                        onChange={onChangeDate}
                        format="dd/MM/yyyy"
                        defaultValue={defaultValue}
                        width='30%'
                        tabIndex='502'
                    />
                </div>
            </IntlProvider>
        </LocalizationProvider>
    );
}

export default DatePick2
