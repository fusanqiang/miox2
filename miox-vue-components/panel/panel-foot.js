
export default function(Component){
    class PanelFoot extends Component {
        constructor(){
            super();
        }

        template(){
            return `<div class="mx-panel-foot" :class="{'mx-panel-linked':linked}"><slot></slot></div>`;
        }

        props(props){
            props.linked = Boolean;
        }
    }
    return PanelFoot
}
