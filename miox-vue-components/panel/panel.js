export default function(Component){
    class Panel extends Component {
        constructor(){
            super();
        }

        template(){
            return `<div class="mx-panel" :style="{'border-color':borderColor}"><slot></slot></div>`;
        }

        props(props){
            props.borderColor = String;
        }
    }
    return Panel;
}
