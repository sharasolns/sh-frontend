const useShSuggest = (props, context) => {
    const { emit } = context;
    const onInput = (e) => {
        emit('update:modelValue', e.target.value);
    };
    return {
        onInput,
    };
}
