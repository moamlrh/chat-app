import { makeStyles } from "@material-ui/core"

export const useStyle = makeStyles(() => ({
    card: {
    },
    textField: {
        margin:'15px auto'
    },
    cardContent:{
        padding:'50px',

    },
    title:{
        padding:'20px 0px',
        fontWeight:'600'
    },
    cardAction:{
        display:'flex',
        alignItems:'center',
        justifyContent:"space-between",
        padding:'30px',
        
    }
}))
