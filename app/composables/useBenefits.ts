export const useBenefits = () => {
    return useFetch('/api/benefits', {
        key: 'benefits',
        default: () => [],
        lazy: true,
    })
}
