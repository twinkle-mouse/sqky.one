import Color from "colorjs.io";

export const babypink100 = "#ffe4f7ff";
export const babypink200 = "#ffd1f1ff";
export const babypink300 = "#fabee9ff";
export const babypink400 = "#fdb6e9ff";
export const babypink500 = "#f0a5dcff";
export const babypink600 = "#d484c2ff";
export const babypink700 = "#9b598fff";
export const babypink800 = "#633959ff";
export const babypink900 = "#3b2737ff";
export const babypink = {
    babypink100,
    babypink200,
    babypink300,
    babypink400,
    babypink500,
    babypink600,
    babypink700,
    babypink800,
    babypink900,
};

export const cuteblue100 = "#e3e6ffff";
export const cuteblue200 = "#cfd4fdff";
export const cuteblue300 = "#b0b8f1ff";
export const cuteblue400 = "#939eeaff";
export const cuteblue500 = "#848fe5ff";
export const cuteblue600 = "#6571c7ff";
export const cuteblue700 = "#4c5496ff";
export const cuteblue800 = "#383e5fff";
export const cuteblue900 = "#272738ff";
export const cuteblue = {
    cuteblue100,
    cuteblue200,
    cuteblue300,
    cuteblue400,
    cuteblue500,
    cuteblue600,
    cuteblue700,
    cuteblue800,
    cuteblue900,
};

export const lavender100 = "#ecd8ff";
export const lavender200 = "#e2c7ff";
export const lavender300 = "#e5c2ffff";
export const lavender400 = "#d8b1ffff";
export const lavender500 = "#d7a6ffff";
export const lavender600 = "#c08cebff";
export const lavender700 = "#9766b9ff";
export const lavender800 = "#694780ff";
export const lavender900 = "#3c2c47ff";
export const lavender = {
    lavender100,
    lavender200,
    lavender300,
    lavender400,
    lavender500,
    lavender600,
    lavender700,
    lavender800,
    lavender900,
};

export const space100 = "#d8d8ffff";
export const space200 = "#cacaffff";
export const space300 = "#c0bdffff";
export const space400 = "#b9b0ffff";
export const space500 = "#9c93f3ff";
export const space600 = "#8077daff";
export const space700 = "#6059afff";
export const space800 = "#49407cff";
export const space900 = "#312a4bff";
export const space = {
    space100,
    space200,
    space300,
    space400,
    space500,
    space600,
    space700,
    space800,
    space900,
};

export const grass100 = "#f6ffecff";
export const grass200 = "#ebffd2ff";
export const grass300 = "#daffb8ff";
export const grass400 = "#ccff9dff";
export const grass500 = "#b0ec77ff";
export const grass600 = "#77af43ff";
export const grass700 = "#5f9138ff";
export const grass800 = "#476331ff";
export const grass900 = "#2f3f21ff";
export const grass = {
    grass100,
    grass200,
    grass300,
    grass400,
    grass500,
    grass600,
    grass700,
    grass800,
    grass900,
};

export const slate100 = "#dedbf0ff";
export const slate200 = "#c9c6e7ff";
export const slate300 = "#b8b2ddff";
export const slate400 = "#b1b1d4ff";
export const slate500 = "#9b99bbff";
export const slate600 = "#7c7994ff";
export const slate700 = "#6f6b86ff";
export const slate800 = "#454555ff";
export const slate900 = "#36363fff";
export const slate = {
    slate100,
    slate200,
    slate300,
    slate400,
    slate500,
    slate600,
    slate700,
    slate800,
    slate900,
};

export const colors = {
    babypink: new Map(Object.entries(babypink)),
    cuteblue: new Map(Object.entries(cuteblue)),
    lavender: new Map(Object.entries(lavender)),
    space: new Map(Object.entries(space)),
    grass: new Map(Object.entries(grass)),
    slate: new Map(Object.entries(slate)),
};

export const semanticColorsDark = {
    // global
    pageBgColor: lavender900,
    focusColor: "#ff1d1d",
    //

    // generic
    textColor: babypink100,
    linkColor: grass200,
    linkHoverColor: grass500,
    headingColor: lavender300,
    smallColor: slate300,
    codeBgColor: slate600,
    codeBorderColor: slate400,
    strongColor: space300,
    emColor: cuteblue300,
    markColor: babypink900,
    markBgColor: grass300,
    quoteColor: lavender100,
    quoteBorderColor: slate600,
    citeColor: lavender400,
    separatorColor: babypink400,

    detailsBgColor: slate900,
    detailsBorderColor: slate700,
    summaryColor: space300,

    tableHeadBgColor: lavender800,
    tableBodyBgColor: lavender900,
    thBorderColor: lavender600,
    tdBorderColor: lavender600,
    //

    // sections
    articleBgColor: cuteblue900,
    articleBorderColor: cuteblue700,

    sectionBgColor: space900,
    sectionBorderColor: space700,

    // navigation
    navTitleBgColor: slate700,
    navTitleBorderColor: slate300,

    navBgColor: lavender800,
    navBorderColor: lavender600,
    navLinkBgColor: space900,
    navLinkBorderColor: space500,
    navLinkActiveBgColor: space800,

    sitemapBgColor: babypink800,
    //sitemapBorderColor
    sitemapLinkBgColor: cuteblue800,
    sitemapLinkBorderColor: cuteblue400,
    sitemapLinkActiveBgColor: cuteblue700,
    //

    // interactive
    textAreaColor: cuteblue100,
    textAreaBgColor: slate900,
    textAreaBorderColor: slate700,

    buttonTextColor: lavender300,
    buttonBgColor: cuteblue800,
    buttonBorderColor: space500,
    buttonHoverTextColor: lavender100,
    buttonHoverBgColor: cuteblue700,
    buttonHoverBorderColor: space100,
    buttonActiveTextColor: lavender500,
    buttonActiveBgColor: cuteblue900,
    buttonActiveBorderColor: space400,

    inputBgColor: lavender400,
    inputBorderColor: space700,
    inputHoverBgColor: lavender100,
    inputHoverBorderColor: cuteblue600,
    inputActiveBgColor: lavender400,
    inputActiveBorderColor: space700,
    //
};

export const semanticUtilsDark = {
    cardBoxShadow: `
        0px 0px 6px 4px rgba(0, 0, 0, 0.5),
        inset 0px 0px 4px 3px rgba(60, 60, 90, 0.3)
    `,
};

export const semanticColorsLight = semanticColorsDark;
export const semanticUtilsLight = semanticUtilsDark;

export const semanticColorsDarkLavenderOverride = {
    pageBgColor: "#101020",
    textColor: "#fff2f2",
    headingColor: cuteblue100,
    sectionBgColor: "#201c24",
    sectionBorderColor: "#1b112b",
};

export const semanticColorsLightLavenderOverride = semanticColorsDarkLavenderOverride;

export function colorsToCssStyle(colors: [string, string][]) {
    return Array.from(colors.map(([key, value]) => `--${key}:${new Color(value).toString()}`)).join(";");
}

export function stylesToCssStyle(colors: [string, string][]) {
    return Array.from(colors.map(([key, value]) => `--${key}:${value}`)).join(";");
}
