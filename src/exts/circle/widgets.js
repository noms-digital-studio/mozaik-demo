import React, { Component, PropTypes } from 'react'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetListItem,
    WidgetLoader,
} from 'mozaik/ui'

import moment from 'moment';

export class BuildStatuses extends Component {
    static getApiRequest({ name, repos }) {
        return {
            id: `circle.buildStatuses.${name}`,
            params: { repos }
        }
    }

    static propTypes = {
        name: PropTypes.string.isRequired,
        repos: PropTypes.array.isRequired,
        apiData:    PropTypes.object,
        apiError:   PropTypes.object,
    };

    render() {
        const { organization, apiData, apiError } = this.props

        return (
            <Widget>
                <WidgetHeader
                    title={'Build Statuses'}
                    subject={organization}
                    count={apiData && apiData.results.length}
                    icon="check-circle"
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>
                        {apiData
                            ? this.renderBody(apiData.results)
                            : <WidgetLoader />}
                    </TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }

    renderBody(results) {
        return (
            <div>
                {results.map((result) => (
                    <WidgetListItem
                        key={result.id}
                        onClick={() => window.open(result.url)}
                        pre={formatDateTime(result.time)}
                        title={result.repo}
                        post={<BuildStatus status={result.status} />}
                    />
                ))}
            </div>
        );
    }
}

class BuildStatus extends Component {
    static contextTypes = {
        theme: PropTypes.object.isRequired
    };
    static propTypes = {
        status: PropTypes.string.isRequired
    };
    render() {
        const {status} = this.props;
        const {colors} = this.context.theme;

        const color = getStatusColor(status);

        return (
            <span style={{
                backgroundColor: colors[color],
                borderRadius: 3,
                padding: 4,
            }}>
                {status}
            </span>
        );
    }
}

const statusColors = {
    success: 'success',
    canceled: 'warning',
    no_tests: 'warning',
    timedout: 'failure',
    failed: 'failure',
};
function getStatusColor(status) {
    if (statusColors[status]) {
        return statusColors[status];
    }
    return 'unknown';
}

function formatDateTime(datetime) {
    return moment(datetime, moment.ISO_8601).format('D/M HH:mm');
}
