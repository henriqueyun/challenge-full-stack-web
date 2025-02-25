/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import VMask from "@ssibrahimbas/v-mask";

const app = createApp(App).use(VMask)

registerPlugins(app)

app.mount('#app')
