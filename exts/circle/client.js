const request = require('superagent')
const chalk   = require('chalk')

/**
 * @param {Mozaik} mozaik
 */
const client = mozaik => {

    const makeApiRequest = (path, params) => {
        const url = 'https://circleci.com/api/v1.1'
        const req = request.get(`${url}${path}`)

        const paramsDebug = params ? ` ${JSON.stringify(params)}` : ''
        mozaik.logger.info(chalk.yellow(`[circle] calling ${url}${path}${paramsDebug}`))

        if (params) {
            req.query(params)
        }

        req.set('Accept', 'application/json')

        return req.then((res) => res.body);
    }

    function parseRepoInfo(repoString) {
        const repoBits = repoString.split('#');
        return {
            name: repoBits[0],
            branch: repoBits[1],
        };
    }

    function getBuildResults(repo) {
        const repoInfo = parseRepoInfo(repo);
        return makeApiRequest(`/project/github/${repoInfo.name}/tree/${repoInfo.branch}`, {limit: 1})
            .then((result) => ({
                repo: result[0].reponame,
                branch: result[0].branch,
                status: result[0].status,
                time: result[0].stop_time || result[0].start_time
            }));
    }

    const apiCalls = {
        buildStatuses({ repos }) {
            return Promise.all(repos.map(getBuildResults));
        },
    }

    return apiCalls
}


module.exports = client
