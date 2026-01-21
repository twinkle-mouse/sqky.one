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

export const lavender100 = "#f2e5ffff";
export const lavender200 = "#e8d2ffff";
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
    focusColor: "#ff1d1d",
    bgColor: lavender900,
    articleBgColor: cuteblue900,
    articleBorderColor: cuteblue700,
    sectionBgColor: space900,
    sectionBorderColor: space700,
    navBgColor: lavender800,
    navBorderColor: lavender600,
    navLinkBorderColor: space500,
    navLinkBgColor: space900,
    navLinkBgColorActive: space800,
    navTitleBgColor: slate700,
    navTitleBorderColor: slate300,
    sitemapBgColor: babypink800,
    sitemapLinkBorderColor: cuteblue400,
    sitemapLinkBgColor: cuteblue800,
    sitemapLinkBgColorActive: cuteblue700,
    textColor: babypink100,
    linkColor: grass200,
    linkHoverColor: grass500,
    buttonColor: space500,
    buttonBorderColor: space200,
    buttonBgColor: cuteblue800,
    buttonHoverColor: space300,
    buttonActiveColor: cuteblue100,
    buttonActiveBorderColor: cuteblue500,
    headingColor: lavender300,
    articleHeadingColor: lavender400,
    smallColor: slate300,
    codeBgColor: slate600,
    codeBorderColor: slate400,
    strongColor: space300,
    emColor: cuteblue300,
    quoteColor: slate600,
    citeColor: lavender400,
    separatorColor: babypink400,
    blockFocusBorderColor: space500,
    textAreaColor: cuteblue100,
    textAreaBgColor: slate900,
    textAreaBorderColor: slate700,
    tableHeadBgColor: lavender800,
    tableBodyBgColor: lavender900,
    thBorderColor: lavender600,
    tdBorderColor: lavender600,
};

export const semanticUtilsDark = {
    cardBoxShadow: `
        0px 0px 6px 3px rgba(0, 0, 0, 0.5),
        inset 0px 0px 3px 2px rgba(90, 90, 160, 0.2)
    `,
};

/*
export const semanticColorsLight = {
    bgColor: "#fff",
    articleBgColor: cuteblue100,
    articleBorderColor: cuteblue600,
    sectionBgColor: lavender100,
    sectionBorderColor: lavender600,
    navBgColor: lavender100,
    navBorderColor: lavender600,
    navLinkBorderColor: space500,
    navLinkBgColor: slate100,
    navLinkBgColorActive: cuteblue100,
    navTitleBgColor: slate100,
    navTitleBorderColor: slate500,
    sitemapBgColor: babypink100,
    sitemapLinkBorderColor: lavender600,
    sitemapLinkBgColor: slate100,
    sitemapLinkBgColorActive: lavender100,
    textColor: space800,
    linkColor: grass700,
    linkFocusColor: grass600,
    buttonColor: cuteblue400,
    buttonBorderColor: cuteblue300,
    buttonBgColor: cuteblue200,
    buttonActiveColor: cuteblue600,
    buttonActiveBorderColor: cuteblue400,
    headingColor: cuteblue600,
    articleHeadingColor: lavender600,
    smallColor: slate600,
    codeBgColor: slate100,
    codeBorderColor: slate300,
    strongColor: cuteblue600,
    emColor: babypink700,
    quoteColor: slate700,
    citeColor: lavender700,
    separatorColor: babypink700,
    blockFocusBorderColor: cuteblue400,
    textAreaColor: cuteblue900,
    textAreaBgColor: slate400,
    textAreaBorderColor: slate200,
    tableHeadBgColor: lavender100,
    tableBodyBgColor: lavender200,
    thBorderColor: lavender500,
    tdBorderColor: lavender500,
};

export const semanticUtilsLight = {
    cardBoxShadow: `
        0px 0px 6px 3px rgba(219, 219, 219, 0.5),
        inset 0px 0px 3px 2px rgba(112, 169, 184, 0.2)
    `,
};
*/

export const semanticColorsLight = semanticColorsDark;
export const semanticUtilsLight = semanticUtilsDark;
