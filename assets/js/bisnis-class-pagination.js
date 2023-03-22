// paginasi-bawah
$(function() {
    // Number of items and limits the number of items per page
    var numberOfItems = $(".info-list .content").length;
    var limitPerPage;
    if ($(window).width() < 576) {
        limitPerPage = 1;
    }
    else {
        limitPerPage = 3;
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
        $(".info-list .content")
        .hide()
        .slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage)
        .show();
        // Replace the navigation items (not prev/next):
        $(".pagination-info li").slice(1, -1).remove();
        getPageList(totalPages, currentPage, paginationSize).forEach(item => {
        $("#next").before(
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
            )
        });
        return true;
    }

        // Include the prev/next buttons:
        $(".pagination-info").append(
            $("<li>").addClass("page-item").attr({ id: "prev" }).append(
            $("<a>")
                .addClass("page-link")
                .attr({
                href: "javascript:void(0)"
                })
                .text("<<")
            ),
            $("<li>").addClass("page-item").attr({ id: "next" }).append(
            $("<a>")
                .addClass("page-link")
                .attr({
                href: "javascript:void(0)"
                })
                .text(">>")
            )
        );
        // Show the page links
        $(".info-list").show();
        showPage(1);

        // Use event delegation, as these items are recreated later
        $(document)
        .on("click", ".pagination-info li.current-page:not(.active)", function() {
            return showPage(+$(this).text());
            scrollTo()
        });
        $("#next").on("click", function() {
            return showPage(currentPage + 1);
        });

        $("#prev").on("click", function() {
            return showPage(currentPage - 1);
        });
        
    });
// /paginasi-bawah