export const required=value=>{
    if(!value || value===''){
        return 'This field is required';
    }
    return undefined;
}