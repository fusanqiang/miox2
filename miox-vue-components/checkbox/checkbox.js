export default function(Component){
    class Checkbox extends Component {
        constructor(){
            super();
        }
        template(){
            return `
                <label class="mx-checkbox" :type="type" role="input:checkbox" >
                    <input :checked="checked" type="checkbox" :name="name" :value="value" class="mx-checkbox-input">
                    <span :style="{'font-size':size}"  @click="elClick" class="mx-checkbox-vision"></span>
                    <slot><slot>
                </label>`;
        }

        methods(methods){
            methods.elClick=function(){
                this.$el.click()
            }
        }

        props(props){
            props.name = String;
            props.value = String;
            props.size = String;
            props.type = String;
            props.checked = Boolean;
        }
    }
    return Checkbox;
}
