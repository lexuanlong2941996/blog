export const configCKEDITOR = (
    bgColor: string,
    foreColor: string,
    textColor: string,
    toolTipBgColor: string,
    toolTipTextColor: string
) => {
    document.documentElement.style.setProperty("--ck-color-base-background", bgColor)
    document.documentElement.style.setProperty("--ck-color-base-foreground", foreColor)
    document.documentElement.style.setProperty("--ck-color-text", textColor)
    document.documentElement.style.setProperty("--ck-color-tooltip-background", toolTipBgColor)
    document.documentElement.style.setProperty("--ck-color-tooltip-text", toolTipTextColor)
}
