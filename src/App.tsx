import React, {Fragment, FunctionComponent, useEffect} from 'react';

import { BryntumDemoHeader, BryntumThemeCombo, BryntumGantt } from '@bryntum/gantt-react';
import './App.scss';

const App: FunctionComponent = () => {
    const tasks = [
        {
            "id": 1000,
            "name": "Marketing Launch",
            "startDate": "2022-09-02",
            "expanded": true,
            "manuallyScheduled" : true,
            "children": [
                {
                    "id": 1,
                    "name": "Banners for social networks",
                    "startDate": "2022-09-02",
                    "endDate": "2022-09-07",
                    "expanded": true,
                    "manuallyScheduled" : true,
                    "children": [
                        {
                            "id": 21,
                            "name": "Choosing a platform for ads",
                            "startDate": "2022-09-02",
                            "rollup": true,
                            "endDate": "2022-09-06",
                            "manuallyScheduled" : true,
                            "expanded": true,
                            "children": [
                                {
                                    "id": 31,
                                    "name": "Custom issue level #4",
                                    "startDate": "2022-09-03",
                                    "rollup": true,
                                    "endDate": "2022-09-05",
                                    "manuallyScheduled" : true,
                                    "expanded": true,
                                    "children": [
                                        {
                                            "id": 41,
                                            "name": "Custom issue level #5",
                                            "startDate": "2022-09-04",
                                            "rollup": true,
                                            "endDate": "2022-09-05",
                                            "manuallyScheduled" : true,
                                        },
                                        {
                                            "id": 51,
                                            "name": "Custom task",
                                            "startDate": "2022-09-05",
                                            "rollup": true,
                                            "endDate": "2022-09-05",
                                            "manuallyScheduled" : true,
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            "endDate": "2022-09-08"
        }
    ]
    const config = {
        project: {
            autoLoad: true,
            tasks: tasks,
            validateResponse : true,
            startDate: '2022-09-02',
            endDate: '2022-09-08'
        },
        columns: [{ type: 'name', field: 'name', width: 250 }],
        viewPreset: 'weekAndDayLetter',
        barMargin: 10,

    };

    useEffect(() => {
        fetch(`http://82.202.204.94/tmp/test.php`)
            .then(res => res.json())
            .then((res) => {
                console.log(res)
            });
    }, [])

    return (
        <Fragment>
            <BryntumDemoHeader
                children = {<BryntumThemeCombo />}
            />
            <BryntumGantt {...config} />
        </Fragment>
    );
};

export default App;
