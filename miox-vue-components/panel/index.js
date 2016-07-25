import panel from './panel';
import panel_head from './panel-head';
import panel_body from './panel-body';
import panel_foot from './panel-foot';

export default function(COMPONENT, REGISTER){
    REGISTER('panel', panel(COMPONENT));
    REGISTER('panel-head', panel_head(COMPONENT));
    REGISTER('panel-body', panel_body(COMPONENT));
    REGISTER('panel-foot', panel_foot(COMPONENT));
}
