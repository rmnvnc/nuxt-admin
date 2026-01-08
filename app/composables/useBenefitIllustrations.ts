export type BenefitIllustration = {
    key: string
    label: string
    src: string
}

const files = import.meta.glob('~/assets/img/dds/benefits/*.{png,jpg,jpeg,svg,webp}', {
    eager: true,
    import: 'default',
}) as Record<string, string>

const illustrations: BenefitIllustration[] = Object.entries(files).map(([path, src]) => {
    const filenameWithExt = path.split('/').pop() || ''
    const baseName = filenameWithExt.replace(/\.[^.]+$/, '')

    const label = baseName.replace(/[-_]+/g, ' ').replace(/^\w/, (c) => c.toUpperCase())

    return {
        key: baseName,
        label,
        src,
    }
})

export const useBenefitIllustrations = () => {
    return {
        illustrations,
    }
}
