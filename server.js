require('dotenv').load({ silent: true })

const path   = require('path')
const Mozaik = require('mozaik')


let configFile = process.argv[2] || 'config.yml'

console.log(`using config file: ${configFile}\n`)

Mozaik.configureFromFile(path.join(__dirname, configFile))
    .then(() => {
        Mozaik.registerApi('circle', require('./exts/circle/client'))

        Mozaik.start()
    })
    .catch(err => {
        console.error(err)
        process.exit(1);
    })
