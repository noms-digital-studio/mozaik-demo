import 'mozaik/ui.css'
import 'font-awesome/css/font-awesome.min.css'

import React         from 'react'
import { render }    from 'react-dom'
import Mozaik, { Registry, ThemeManager } from 'mozaik/ui'

import nightBlue     from 'mozaik-themes/themes/night-blue'

import 'mozaik-themes/themes/night-blue.css'

ThemeManager.add(nightBlue)
ThemeManager.defaultTheme = nightBlue.name

Registry.addExtensions({
    circle: require('./exts/circle/widgets'),
})

render(
    <Mozaik />,
    document.getElementById('mozaik')
)
