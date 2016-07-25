/**
 * appview body
 * @param Component
 * @returns {AppViewBody}
 */
export default function(Component){
    class AppViewBody extends Component {
        constructor(){
            super();
        }

        template(){
            return `<div class="mx-appview-body" role="appview-body"><slot></slot></div>`;
        }
    }
    return AppViewBody;
}
