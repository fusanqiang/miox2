export default function(Component){
    class Toolbar_Item extends Component {
        constructor(){
            super();
            this.name = 'toolbar-item'
        }

        data(){
            return function(){
                return {
                    active: false
                }
            }
        }

        methods(methods){
            methods.click = function(){
                this.$parent.$emit('ask', this);
            }
            return methods;
        }

        events(events){
            events['active:on'] = function(){
                this.active = true;
            }
            events['active:off'] = function(){
                this.active = false;
            }
            return events;
        }

        template(){
            return `
                <flex-item flex="1" align="center"><div class="mx-toolbar-item" :class="{'active':active}" @click="click"><slot></slot></div></flex-item>
            `
        }
    }

    return Toolbar_Item
}
