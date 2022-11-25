import React, {Fragment, FunctionComponent, useEffect, useState} from 'react';
import {BryntumDemoHeader, BryntumThemeCombo, BryntumGantt} from '@bryntum/gantt-react';
import {useActions} from "./hooks/useActions";
import {useTypedSelector} from "./hooks/useTypedSelector";

import './App.scss';

interface Table {
    value: boolean
}

interface Project {
    autoLoad: boolean,
    tasks: Array<any>,
    validateResponse: boolean,
    startDate: string,
    endDate: string,
}

interface Config {
    project: Project,
    columns: Array<any>,
    viewPreset: string,
    barMargin: number,
}

const App: FunctionComponent = () => {
    const logsList = useTypedSelector(state => state.data.logs)
    const {fetchLogs} = useActions()
    const [tableVisiable, setTableVisiable] = useState<Table>()
    const [config, setConfig] = useState<Config>();

    useEffect(() => {
        fetchLogs()
    }, [])

    useEffect(() => {
        let currentValues: any[] = []
        let finalArray: any[] = []
        let indexItem = 1
        if (logsList) {
            //создание итогового массива для конфига таблицы
            function buildTree(items: Array<any>, parent: any) {
                parent = parent || null;
                let result: any[] = [];
                items.forEach((item) => {
                    if (item.parent === parent) {
                        result.push(item);

                        item.children = buildTree(items, item.id);
                        if (!item.children.length) {
                            delete item.children;
                        }
                    }

                });
                return result;
            }

            //получение обработанного массива с API
            function getArray(obj: any) {
                if (obj) {
                    currentValues.push({
                        "id": indexItem,
                        "name": obj.title,
                        "startDate": "2022-09-02",
                        "rollup": true,
                        "endDate": "2022-09-06",
                        "manuallyScheduled": true,
                        "expanded": true,
                        "parent": null
                    })
                    indexItem += 1
                    let current = obj.sub
                    currentValues.push({
                        "id": indexItem,
                        "name": current[0].title,
                        "startDate": "2022-09-02",
                        "rollup": true,
                        "endDate": "2022-09-06",
                        "manuallyScheduled": true,
                        "expanded": true,
                        "parent": indexItem - 1
                    })

                    while (current) {
                        if (current['0'].sub !== undefined) {
                            current = current[0].sub
                            current.map((item: any) => {
                                indexItem += 1
                                currentValues.push({
                                    "id": indexItem,
                                    "name": item.title,
                                    "startDate": item.period_start,
                                    "rollup": true,
                                    "endDate": item.period_end,
                                    "manuallyScheduled": true,
                                    "expanded": true,
                                    "parent": indexItem - 1
                                })
                            })
                        } else {
                            current = undefined
                        }
                    }
                }
            }

            getArray(logsList.chart)

            if (currentValues.length) {
                //выводим количество вложенных элементов
                currentValues.map((item: any) => {
                    item.name = `${item.name} - ${currentValues.length - item.id}`
                })
                finalArray = buildTree(currentValues, null)
                setTableVisiable({value: true})
            }

            //устанавливаем итоговый конфиг для таблицы
            setConfig({
                project: {
                    autoLoad: true,
                    tasks: finalArray,
                    validateResponse: true,
                    startDate: '2022-09-02',
                    endDate: '2022-09-08',
                },
                columns: [{type: 'name', field: 'name', width: 300}],
                viewPreset: 'weekAndDayLetter',
                barMargin: 10,
            })
        }
    }, [logsList])

    return (
        <>
            {tableVisiable?.value ?
                <Fragment>
                    <BryntumDemoHeader
                        children={<BryntumThemeCombo/>}
                    />
                    <BryntumGantt {...config} />
                </Fragment> : null
            }
        </>
    );
};

export default App;
