// product slider
        // filter
        filterSelection("all")
        function filterSelection(c) {
        var x, i;
        x = document.getElementsByClassName("filterDiv");
        if (c == "all") c = "";
        // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
            for (i = 0; i < x.length; i++) {
                w3RemoveClass(x[i], "showProduk");
                if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "showProduk");
            }
            $(function() {
            // Number of items and limits the number of items per page
            var numberOfItems = $(".product-list .showProduk").length;
            var limitPerPage;
            if ($(window).width() < 576) {
                limitPerPage = 2;
             }
             else {
                limitPerPage = 4;
            }
            // Total pages rounded upwards
            var totalPages = Math.ceil(numberOfItems / limitPerPage);
            // Number of buttons at the top, not counting prev/next,
            // but including the dotted buttons.
            // Must be at least 5:
            var paginationSize = 5;
            var currentPage;

            function showPage(whichPage) {
                if (whichPage < 1 || whichPage > totalPages) return false;
                currentPage = whichPage;
                $(".product-list .showProduk")
                .hide()
                .slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage)
                .show();
                // Replace the navigation items (not prev/next):
                $(".pagination li").slice(1, -1).remove();
                getPageList(totalPages, currentPage, paginationSize).forEach(item => {
                $("<li>")
                    .addClass(
                    "page-item " +
                        (item ? "current-page " : "") +
                        (item === currentPage ? "active " : "")
                    )
                    .append(
                    $("<a>")
                        .addClass("page-link")
                        .attr({
                        href: "javascript:void(0)"
                        })
                        .text(item || "...")
                    )
                    .insertBefore("#next-page");
                });
                return true;
            }

                // Include the prev/next buttons:
                $(".pagination").append(
                    $("<li>").addClass("page-item").attr({ id: "previous-page" }).append(
                    $("<a>")
                        .addClass("page-link")
                        .attr({
                        href: "javascript:void(0)"
                        })
                        .text("<<")
                    ),
                    $("<li>").addClass("page-item").attr({ id: "next-page" }).append(
                    $("<a>")
                        .addClass("page-link")
                        .attr({
                        href: "javascript:void(0)"
                        })
                        .text(">>")
                    )
                );
                // Show the page links
                $(".product-list").show();
                showPage(1);

                // Use event delegation, as these items are recreated later
                $(document)
                .on("click", ".pagination li.current-page:not(.active)", function() {
                    return showPage(+$(this).text());
                });
                $("#next-page").on("click", function() {
                    return showPage(currentPage + 1);
                });

                $("#previous-page").on("click", function() {
                    return showPage(currentPage - 1);
                });
            });
        }

        // Show filtered elements
        function w3AddClass(element, name) {
        var i, arr1, arr2;
        arr1 = element.className.split(" ");
        arr2 = name.split(" ");
        for (i = 0; i < arr2.length; i++) {
            if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
            }
        }
        }

        // Hide elements that are not selected
        function w3RemoveClass(element, name) {
        var i, arr1, arr2;
        arr1 = element.className.split(" ");
        arr2 = name.split(" ");
        for (i = 0; i < arr2.length; i++) {
            while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
            }
        }
        element.className = arr1.join(" ");
        }
        // /filter
        function getPageList(totalPages, page, maxLength) {
            if (maxLength < 5) throw "maxLength must be at least 5";

            function range(start, end) {
                return Array.from(Array(end - start + 1), (_, i) => i + start);
            }

            var sideWidth = maxLength < 9 ? 1 : 2;
            var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
            var rightWidth = (maxLength - sideWidth * 2 - 2) >> 1;
            if (totalPages <= maxLength) {
                // no breaks in list
                return range(1, totalPages);
            }
            if (page <= maxLength - sideWidth - 1 - rightWidth) {
                // no break on left of page
                return range(1, maxLength - sideWidth - 1)
                .concat([0])
                .concat(range(totalPages - sideWidth + 1, totalPages));
            }
            if (page >= totalPages - sideWidth - 1 - rightWidth) {
                // no break on right of page
                return range(1, sideWidth)
                .concat([0])
                .concat(
                    range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages)
                );
            }
            // Breaks on both sides
            return range(1, sideWidth)
                .concat([0])
                .concat(range(page - leftWidth, page + rightWidth))
                .concat([0])
                .concat(range(totalPages - sideWidth + 1, totalPages));
            }
// /product slider