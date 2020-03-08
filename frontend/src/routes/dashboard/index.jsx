import React, { useState, useEffect } from 'react';

import { css } from 'emotion';
import { GroupedBarChart } from '@carbon/charts-react';
import "@carbon/charts/styles.css";

import { AverageInsights } from './average-insights';

const personalityInsightOptions = {
    "title": "Big 5 personality insights",
    "axes": {
        "left": {
            "primary": true
        },
            "bottom": {
                "scaleType": "labels",
                "secondary": true
        }
    },
    "height": "400px"
};

const wrapper = css`
    width: 100%;
    height: 100%;
    background: #f3f3f3;
`;

const chartWrapper = css`
    margin-top: 3rem;
`;

export const DashBoard = ({ personalityInsight, selectedField }) => {
    const [personalityInsightData, setPersonalityInsightData] = useState('');

    useEffect(() => {
        if (!personalityInsight) {
            return;
        }

        const chartData = {
            labels: personalityInsight.data.personality.map(personalityTrait => (
                personalityTrait.name
            )),
            datasets: [
                {
                    label: "Your predicted personality",
                    data: personalityInsight.data.personality.map(personalityTrait => (
                        personalityTrait.percentile
                    ))
                },
                AverageInsights[selectedField.value]
            ]
        };
        setPersonalityInsightData(chartData);
    }, [personalityInsight]);

    return (
        <div className={wrapper}>
            {
                personalityInsightData ?
                <div className={chartWrapper}>
                    <GroupedBarChart data={personalityInsightData} options={personalityInsightOptions} />
                </div> :
                null
            }
        </div>
    );
}
