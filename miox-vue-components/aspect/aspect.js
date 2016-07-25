export default function(Component){
    class Aspect extends Component {
        constructor(){
            super();
        }

        computed(options){
            options.class = function(){
                const cls = [];
                if ( this.align ){
                    cls.push('mx-text-' + this.align);
                }
                return cls.join(' ');
            }
        }

        template(){
            return `<div class="mx-aspect" role="aspect" :style="{width:width}" :class="class"><div class="mx-aspect-inner"><slot></slot></div><div class="mx-aspect-after" :style="{'padding-bottom':ratio}"></div></div>`;
        }

        props(props){
            props.width = { type: String, default: '100%' };
            props.align = String;
            props.ratio = { type: String, default: "100%" };
        }
    }

    return Aspect;
}
