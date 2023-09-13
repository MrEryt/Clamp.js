let ClampInner = {
        constructor: function (wrapperSelector) {
            this.$wrapperSelector = $(wrapperSelector);
            ClampInner.calcClamp();
        },
        addClampStyle: function (element, resultCountLines) {
            element.style.overflow = 'hidden';
            element.style.textOverflow = 'ellipsis';
            element.style.webkitBoxOrient = 'vertical';
            element.style.display = '-webkit-box';
            element.style.webkitLineClamp = resultCountLines;
        },
        calcClamp: function () {
            if (this.$wrapperSelector.length > 0) {
                if (this.$wrapperSelector.children().length > 0) {
                    let CountChildrenElements = this.$wrapperSelector.children();

                    const wrapperHeight = this.$wrapperSelector[0].clientHeight;

                    let counter = 0;
                    let ChildrenHeight = 0;
                    let allMargins = 0;
                    CountChildrenElements.each(function() {
                        let CurrentElement = CountChildrenElements[counter];
                        let CurrentElementHeight = CountChildrenElements[counter].clientHeight;
                        let currentElementMargin = parseInt(window.getComputedStyle(CountChildrenElements[counter]).marginBottom);
                        allMargins += currentElementMargin;
                        ChildrenHeight += CurrentElementHeight;
                        if (CurrentElementHeight > wrapperHeight || ChildrenHeight > wrapperHeight) {
                            const correctingPixels = ChildrenHeight - wrapperHeight;
                            const elementHeight = CurrentElementHeight - correctingPixels - allMargins;
                            const lineHeight = parseInt($(CountChildrenElements[counter]).css('line-height'));
                            const countLines = CurrentElementHeight / lineHeight;
                            let allLinesHeight = lineHeight * countLines;

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
