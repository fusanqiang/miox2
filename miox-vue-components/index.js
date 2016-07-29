/**
 * Created by evio on 16/7/25.
 */
'use strict';
import appview from './appview/index';
import navgation from './navgation/index';
import flex from './flex/index';
import aspect from './aspect/index';
import button from './button/index';
import cell from './cell/index';
import checkbox from './checkbox/index';
import container from './container/index';
import middle from './middle/index';
import panel from './panel/index';
import radio from './radio/index';
import toolbar from './toolbar/index';

export default function components(Engine){
    appview(Engine.Component, Engine.define);
    navgation(Engine.Component, Engine.define);
    flex(Engine.Component, Engine.define);
    aspect(Engine.Component, Engine.define);
    button(Engine.Component, Engine.define);
    cell(Engine.Component, Engine.define);
    checkbox(Engine.Component, Engine.define);
    container(Engine.Component, Engine.define);
    middle(Engine.Component, Engine.define);
    panel(Engine.Component, Engine.define);
    radio(Engine.Component, Engine.define);
    toolbar(Engine.Component, Engine.define);
}