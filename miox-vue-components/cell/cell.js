export default function(Component) {
    class Cell extends Component {
        constructor() {
            super();
        }

        template() {
            return `<div class="mx-cell" role="cell" data-left="0" :class="{'mx-cell-linked':linked}" :style="{'border-color':borderColor,'padding-left':left}"><slot></slot></div>`;
        }

        props(props) {
            props.linked = Boolean;
            props.borderColor = String;
            props.left = {
                type: String,
                default: ''
            };
        }
    }
    return Cell;
}
