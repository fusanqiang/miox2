
export default function(Component){
    class PanelHead extends Component {
        constructor(){
            super();
        }

        template(){
            return `<div class="mx-panel-head" :class="{'mx-panel-linked':linked}"><slot></slot></div>`;
        }

        props(props){
            props.linked = Boolean;
        }
    }
    return PanelHead
}
