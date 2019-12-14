import Vue from 'vue';
import Vuetify, { VBtn, VIcon, VSnackbar } from 'vuetify/lib';
import VuetifyToast from 'vuetify-toast-snackbar';

Vue.use(Vuetify, {
    components: {
        VBtn,
        VIcon,
        VSnackbar
    }
});
Vue.use(VuetifyToast, {
    x: 'right',
    y: 'top',
    timeout: 4000,
    dismissable: true,
    showClose: true,
    closeIcon: 'mdi-close'
});


export default new Vuetify({});
