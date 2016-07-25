export default function(Component) {
    class button extends Component {
        constructor() {
            super();
        }

        template() {
            return `
            <div class="mx-button" :class="{
                'mx-button-blocked':blocked ,
                'mx-button-loading':loading
                }"
                :type="type"
                :style="{'borderRadius':radius,'fontSize':size}">
                <div class="mx-button-loading-icon" :class="{'loading':loading}" ></div>
                <slot></slot>
            </div>
            `
        }

        data(data){
            data.waveStartX = '0';
            data.waving = false;
        }


        props(props) {
            props.blocked = Boolean;
            props.radius = String;
            props.loading = Boolean;
            props.size = String;
            props.type = {
                type: String,
                default: 'default'
            };
        }
    }
    return button;
}
