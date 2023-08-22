import { Button, extendTheme } from "@chakra-ui/react"
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/700.css'
export const theme = extendTheme({
 
  colors: {
    brand: {
      100: "#265e9e",
    },
  },
 
  fonts:{
    body: 'Open Sans, sans-serif',
  },
 
  styles:{
    global: () =>({
      body:{
        bg:'#265e9e',
      }
    })
  },

  components:{
    Button
  }
})