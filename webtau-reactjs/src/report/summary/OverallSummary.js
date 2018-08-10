/*
 * Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react'

import CallsTiming from './CallsTiming'
import HttpOperationCoverageSummary from './HttpOperationCoverageSummary'
import ConfigTable from './ConfigTable'

import TabSelection from '../widgets/TabSelection'

import PercentilePerformanceTable from './PercentilePerformanceTable'
import PercentilePerformanceDiagram from './PercentilePerformanceDiagram'

import './OverallSummary.css'

const summaryTabName = 'Summary'
const configurationTabName = 'Configuration'
const performanceTabName = 'Performance'
const tabNames = [summaryTabName, configurationTabName, performanceTabName]

export default class OverallSummary extends React.Component {
    render() {
        const {onTabSelection, selectedTabName = tabNames[0]} = this.props

        return (
            <div className="overall-summary">
                <TabSelection tabs={tabNames} selectedTabName={selectedTabName} onTabSelection={onTabSelection}/>

                <div className="overall-summary-tab-content">
                    {this.renderTabContent()}
                </div>
            </div>
        )
    }

    renderTabContent() {
        const {
            selectedTabName = tabNames[0],
            report,
            onSwitchToHttpCalls,
            onSwitchToSkippedHttpCalls,
        } = this.props

        switch (selectedTabName) {
            case summaryTabName: return (
                <React.Fragment>
                    <CallsTiming report={report} onSwitchToHttpCalls={onSwitchToHttpCalls}/>
                    <HttpOperationCoverageSummary report={report} onSwitchToSkippedHttpCalls={onSwitchToSkippedHttpCalls}/>
                </React.Fragment>
            )

            case configurationTabName: return (
                <ConfigTable report={report}/>
            )

            case performanceTabName: return (
                <div className="overall-summary-performance-grid">
                    <PercentilePerformanceTable report={report}/>
                    <PercentilePerformanceDiagram report={report}/>
                </div>
            )

            default:
                return null
        }
    }
}

