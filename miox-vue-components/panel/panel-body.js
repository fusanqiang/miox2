
export default function(Component){
    class PanelBody extends Component {
        constructor(){
            super();
        }

        template(){
            return `<div class="mx-panel-body"><slot></slot></div>`;
        }
    }
    return PanelBody;
}
