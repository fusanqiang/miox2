/**
 * appview foot
 * @param Component
 * @returns {AppViewFoot}
 */
export default function(Component){
    class AppViewFoot extends Component {
        constructor(){
            super();
        }

        template(){
            return `<div class="mx-appview-foot" role="appview-foot"><slot></slot></div>`;
        }
    }
    return AppViewFoot;
}
