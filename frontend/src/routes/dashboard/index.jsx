import React, { useState, useEffect } from 'react';

import { css } from 'emotion';
import { GroupedBarChart, SimpleBarChart } from '@carbon/charts-react';
import {
    Button,
    Search,
    StructuredListWrapper,
    StructuredListHead,
    StructuredListBody,
    StructuredListRow,
    StructuredListCell
} from 'carbon-components-react'
import "@carbon/charts/styles.css";

import { AverageInsights } from './average-insights';

import { SettingsAdjust16 } from '@carbon/icons-react'

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

const toneAnalysisOptions = {
    "title": "Tone analysis summary",
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
    margin-top: 40px;
    margin-left: 30px;
    margin-right: 30px;
`;

const chartWrapper = css`
    display: flex;
    flex-direction: row;
    margin-top: 50px;
    margin-bottom: 40px;
`;

const personalityChart = css`
    width: 50%;
    margin-right: 15px;
`;

const toneChart = css`
    width: 50%;
    margin-left: 15px;
`;

const searchInput = css`
    width: 70%;
    input {
        background: white;
    }
`;

const shareButton = css`
    border-bottom: 1px solid rgb(141, 141, 141);
`;

const searchBar = css`
    display: flex;
    flex-direction: row;
`;

export const DashBoard = ({ personalityInsight, selectedField, toneAnalysis }) => {
    const [personalityInsightData, setPersonalityInsightData] = useState('');
    const [toneAnalysisData, setToneAnalysisData] = useState('');
    const [tableFilter, setTableFilter] = useState('');

    useEffect(() => {
        if (!personalityInsight || !toneAnalysis) {
            return;
        }

        const chartPersonalityInsightData = {
            labels: personalityInsight.personality.map(personalityTrait => (
                personalityTrait.name
            )),
            datasets: [
                {
                    label: "Your predicted personality",
                    data: personalityInsight.personality.map(personalityTrait => (
                        personalityTrait.percentile
                    ))
                },
                AverageInsights[selectedField.value]
            ]
        };

        const chartToneAnalysisData = {
            labels: toneAnalysis.document_tone.tones.map(tone => tone.tone_id),
            datasets: [
                {
                    label: "Summary of tones",
                    data: toneAnalysis.document_tone.tones.map(tone => tone.score)
                }
            ]
        };

        setPersonalityInsightData(chartPersonalityInsightData);
        setToneAnalysisData(chartToneAnalysisData);
    }, [personalityInsight, toneAnalysis]);

    return (
        <div className={wrapper}>
            {
                toneAnalysisData && personalityInsightData ?
                <div>
                    <div className={chartWrapper}>
                        <div className={personalityChart}>
                            <GroupedBarChart data={personalityInsightData} options={personalityInsightOptions} />
                        </div>
                        <div className={toneChart}>
                            <SimpleBarChart data={toneAnalysisData} options={toneAnalysisOptions} />
                        </div>
                    </div>
                    <div>
                        <div className={searchBar}>
                            <Search
                                labelText='Chart'
                                placeHolderText='Search sentences'
                                className={searchInput}
                                onChange={event => {setTableFilter(event.target.value)}} />
                            <Button kind='ghost' className={shareButton}><SettingsAdjust16 /></Button>
                        </div>
                        <StructuredListWrapper>
                            <StructuredListHead>
                                <StructuredListCell head>
                                    Sentence
                                </StructuredListCell>
                                <StructuredListCell head>
                                    Tone
                                </StructuredListCell>
                            </StructuredListHead>
                            <StructuredListBody>
                                {
                                    toneAnalysis.sentences_tone
                                        .filter(tone => tone.tones.length && (tone.text.toLowerCase().includes(tableFilter.toLowerCase())))
                                        .map(tone => (
                                            <StructuredListRow>
                                                <StructuredListCell>
                                                    {tone.text}
                                                </StructuredListCell>
                                                <StructuredListCell>
                                                    {
                                                        tone.tones.map(tone => (
                                                            // { tone: tone.tone_name, score: tone.score }
                                                            <div className={css`dispaly: flex; flex-direction: column`}>
                                                                <p className={css`font-size: 0.875rem`}>{`Tone: ${tone.tone_name}`}</p>
                                                                <p className={css`font-size: 0.875rem`}>{`Tone score: ${tone.score}`}</p>
                                                            </div>
                                                        ))
                                                    }
                                                </StructuredListCell>
                                            </StructuredListRow>
                                    ))
                                }
                            </StructuredListBody>
                        </StructuredListWrapper>
                    </div>
                </div> :
                <p className={css`margin-top: 100px;`}>Nothing here yet...</p>
            }
        </div>
    );
}
