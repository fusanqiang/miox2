import appview from './appview';
import appview_head from './appview-head';
import appview_body from './appview-body';
import appview_foot from './appview-foot';

export default function(COMPONENT, REGISTER){
    REGISTER('appview', appview(COMPONENT));
    REGISTER('appview-head', appview_head(COMPONENT));
    REGISTER('appview-body', appview_body(COMPONENT));
    REGISTER('appview-foot', appview_foot(COMPONENT));
}
