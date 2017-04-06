import React, { Component, PropTypes } from 'react'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
} from 'mozaik/ui'


export class BuildStatuses extends Component {
    static getApiRequest({ name, repos }) {
        return {
            id:     `circle.buildStatuses.${name}`,
            params: { repos }
        }
    }

    render() {
        const { organization, apiData, apiError } = this.props
        let body = <WidgetLoader />
        let count
        if (apiData && !apiError) {
            count = apiData.length
            body = (
                <div>
                    {JSON.stringify(apiData, null, 2)}
                </div>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={'Build Statuses'}
                    subject={organization}
                    count={count}
                    icon="check-circle"
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>
                        {body}
                    </TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}

BuildStatuses.propTypes = {
    name: PropTypes.string.isRequired,
    repos: PropTypes.array.isRequired,
    apiData:    PropTypes.object,
    apiError:   PropTypes.object,
};
