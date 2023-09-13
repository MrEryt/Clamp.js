let ClampInner = {
    //Инициализируем наш враппер и вызываем функцию подсчёта
    constructor: function (wrapperSelector) {
        this.$wrapperSelector = $(wrapperSelector);
        ClampInner.calcClamp();
    },
    //Добавляем стили к элементу
    addClampStyle: function (element, resultCountLines) {
        element.style.overflow          = 'hidden';
        element.style.textOverflow      = 'ellipsis';
        element.style.webkitBoxOrient   = 'vertical';
        element.style.display           = '-webkit-box';
        element.style.webkitLineClamp   = resultCountLines;
    },
    //Считаем высоты дочерних элементов и применяем стили к дочернему элементу
    calcClamp: function () {
        if (this.$wrapperSelector.length > 0) {
            if (this.$wrapperSelector.children().length > 0) {
                let CountChildrenElements   = this.$wrapperSelector.children();
                const wrapperHeight         = this.$wrapperSelector[0].clientHeight;

                let counter         = 0,
                    ChildrenHeight  = 0,
                    allMargins      = 0;

                CountChildrenElements.each(function() {
                    let CurrentElement          = CountChildrenElements[counter],
                        CurrentElementHeight    = CountChildrenElements[counter].clientHeight,
                        currentElementMargin    = parseInt(window.getComputedStyle(CountChildrenElements[counter]).marginBottom);

                    allMargins      += currentElementMargin;
                    ChildrenHeight  += CurrentElementHeight;
                    if (CurrentElementHeight > wrapperHeight || ChildrenHeight > wrapperHeight) {
                        const   correctingPixels    = ChildrenHeight - wrapperHeight,
                            elementHeight       = CurrentElementHeight - correctingPixels - allMargins,
                            lineHeight          = parseInt($(CountChildrenElements[counter]).css('line-height')),
                            countLines          = CurrentElementHeight / lineHeight;

                        let allLinesHeight          = lineHeight * countLines;

                        while (allLinesHeight > elementHeight) {
                            allLinesHeight -= lineHeight;
                        }

                        const resultCountLines = allLinesHeight / lineHeight;
                        ClampInner.addClampStyle(CurrentElement, resultCountLines)
                    }
                    counter++;
                })
            }
        }
    }
}
