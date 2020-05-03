export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value, rules) => {
        // if we set to true and check each rules is true and double check it is good. if we dont double chek it will not work
        let isValid = true;

        if (rules.required) {
            // trim() no whitespaces at beggining or end if user enters blankspaces it will stay false as there is not any value in form 
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid
    }