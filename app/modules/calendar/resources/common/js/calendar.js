$(document).on("click", ".new-calendar-button", function () {
    $(".error-calendar-event").hide();
    $(".create-calendar-title, #copy").val("");
    $("#stages").val(null).trigger("change.select2");
    $("#myNewCalendar").modal("show");
    $(".select2-choices").css('width', '100%');
    $(".select2-choices").css('border-color', '#d8d9da');
});

$(document).on("click", ".create-calendar", function () {
    var form = $(this).closest("form");
    if (form.find(".create-calendar-title").val() === "" || form.find("#stages").val() === null
        || form.find("#create-calendar-start-date").val() === "" || form.find("#create-calendar-end-date").val() === "") {
        form.find(".alert").html("Campos com * são obrigatórios.").show();
    } else {
        form.find(".alert").hide();
        $.ajax({
            url: "?r=calendar/default/create",
            type: "POST",
            data: {
                title: $(".create-calendar-title").val(),
                startDate: $("#create-calendar-start-date").val(),
                endDate: $("#create-calendar-end-date").val(),
                stages: $("#stages").val(),
                copyFrom: $("#copy").val()
            },
            beforeSend: function () {
                $("#myNewCalendar .centered-loading-gif").show();
                $("#myNewCalendar .modal-body").css("opacity", 0.3).css("pointer-events", "none");
                $("#myNewCalendar button").attr("disabled", "disabled");
            },
        }).success(function (data) {
            data = JSON.parse(data);
            if (!data.valid) {
                form.find(".alert").html(DOMPurify.sanitize(data.error)).show();
                $("#myNewCalendar .centered-loading-gif").hide();
                $("#myNewCalendar .modal-body").css("opacity", 1).css("pointer-events", "auto");
                $("#myNewCalendar button").removeAttr("disabled");
            } else {
                window.location.reload();
            }
        });
    }
});

$(document).on("click", ".edit-calendar", function (e) {
    $("#edit-calendar-modal").find(".alert").hide();
    var icon = this;
    e.stopPropagation();
    $.ajax({
        url: "?r=calendar/default/loadCalendarData",
        type: "POST",
        data: {
            id: $(icon).attr("data-id")
        },
        beforeSend: function () {
            $(icon).css("pointer-events", "none").find("i").addClass("fa-spin").addClass("fa-spinner").removeClass("fa-edit");
        },
    }).success(function (data) {
        data = JSON.parse(data);
        $("#edit-calendar-modal").find("#Calendar_id").val(data.id);
        $("#edit-calendar-modal").find("#Calendar_title").val(data.title);
        $("#edit-calendar-modal").find("#Calendar_start_date").val(data.startDate);
        $("#edit-calendar-modal").find("#Calendar_end_date").val(data.endDate);
        var selectedStages = [];
        $.each(data.stages, function () {
            selectedStages.push(this);
        });
        $("#edit-calendar-modal").find("#stages").val(selectedStages).trigger("change.select2");
        $("#edit-calendar-modal").modal("show");
        $(".select2-choices").css('width', '100%');
        $(".select2-choices").css('border-color', '#d8d9da');
    }).complete(function () {
        $(icon).css("pointer-events", "auto").find("i").removeClass("fa-spin").removeClass("fa-spinner").addClass("fa-edit");

    });
});

$(document).on("click", ".edit-calendar-button", function () {
    if ($("#edit-calendar-modal").find("#Calendar_title").val() === "" || $("#edit-calendar-modal").find("#stages").val() === null) {
        $("#edit-calendar-modal").find(".alert").removeClass("alert-primary").addClass("alert-error").html("Campos com * são obrigatórios.").show();
    } else {
        editCalendar(false);
    }
});

$(document).on("click", ".confirm-edit-calendar-event", function() {
    editCalendar(true);
});

function editCalendar(confirm) {
    $("#edit-calendar-modal").find(".alert").hide();
    $.ajax({
        url: "?r=calendar/default/editCalendar",
        type: "POST",
        data: {
            id: $("#edit-calendar-modal").find("#Calendar_id").val(),
            title: $("#edit-calendar-modal").find("#Calendar_title").val(),
            startDate: $("#edit-calendar-modal").find("#Calendar_start_date").val(),
            endDate: $("#edit-calendar-modal").find("#Calendar_end_date").val(),
            stages: $("#edit-calendar-modal").find("#stages").val(),
            confirm: confirm
        },
        beforeSend: function () {
            $("#edit-calendar-modal").find(".modal-body").css("opacity", 0.3).css("pointer-events", "none");
            $("#edit-calendar-modal").find("button").attr("disabled", "disabled");
            $("#edit-calendar-modal").find(".centered-loading-gif").show();
        },
    }).success(function (data) {
        data = JSON.parse(data);
        if (data.valid) {
            window.location.reload();
        } else {
            $("#edit-calendar-modal").find(".alert").removeClass("alert-error").addClass("alert-" + DOMPurify.sanitize(data.alert)).html(DOMPurify.sanitize(data.message)).show();
        }
    }).complete(function () {
        $("#edit-calendar-modal").find(".modal-body").css("opacity", 1).css("pointer-events", "auto");
        $("#edit-calendar-modal").find("button").removeAttr("disabled");
        $("#edit-calendar-modal").find(".centered-loading-gif").hide();
    });
}

$(document).on("click", ".manage-unity-periods", function (e) {
    dismissPeriods();
    $("#unity-periods-modal").find(".alert").hide();
    var icon = this;
    e.stopPropagation();
    $.ajax({
        url: "?r=calendar/default/loadUnityPeriods",
        type: "POST",
        data: {
            id: $(icon).attr("data-id")
        },
        beforeSend: function () {
            $(icon).css("pointer-events", "none").find("i").addClass("fa-spin").addClass("fa-spinner").removeClass("fa-map-o");
        },
    }).success(function (data) {
        data = JSON.parse(data);
        if (data.valid) {
            var html = "";
            html += "<input class='calendar-id' type='hidden' value='" + $(icon).attr("data-id") + "'>";
            html += "<input class='calendar-end-date' type='hidden' value='" + data.result.calendarFinalDate + "'>";
            for (var i = 0; i < Object.keys(data.result.stages).length; i++) {
                html += "<div class='grade-unity-stage-tab " + (i === 0 ? "active" : "") + "'>" + (i + 1) + "ª Etapa</div>";
            }
            $.each(data.result.stages, function (i, stage) {
                html += "<div class='grade-unity-stage-container " + (i === 0 ? "active" : "") + "'>";
                html += "<span class='grade-unity-stage-title'>" + stage.title + "</span>";
                if (Object.keys(stage.unities).length) {
                    $.each(stage.unities, function (j, unity) {
                        html += "<div class='form-control grade-unity-container'>";
                        html += "<input class='grade-unity-id' type='hidden' value='" + unity.id + "'>";
                        html += "<label>" + unity.name + "</label>";
                        html += "<input class='grade-unity-initial-date' " + (j === 0 ? "disabled" : "") + " size='10' maxlength='10' type='text' placeholder='Início da Unidade' value='" + unity.initial_date + "'>";
                        html += "</div>";
                    });
                } else {
                    html += "<div class='alert alert-warning'>Etapa sem unidades. </div>";
                }
                html += "</div>";
            });
            $(".unity-periods-container").html(html);

            $(".grade-unity-initial-date").mask("99/99/9999").datepicker({
                container: "#unity-periods-modal .modal-dialog",
                language: "pt-BR",
                format: "dd/mm/yyyy",
                autoclose: true,
                todayHighlight: true,
                allowInputToggle: true,
                disableTouchKeyboard: true,
                keyboardNavigation: false,
                orientation: "bottom left",
                clearBtn: true,
                maxViewMode: 2,
                startDate: "01/01/" + data.result.year,
                endDate: "31/12/" + data.result.year

            });

        } else {
            $("#unity-periods-modal").find(".alert").html(DOMPurify.sanitize(data.error)).show();
        }

        $("#unity-periods-modal").modal("show");
    }).complete(function () {
        $(icon).css("pointer-events", "auto").find("i").removeClass("fa-spin").removeClass("fa-spinner").addClass("fa-map-o");

    });
});

$(document).on("click", ".grade-unity-stage-tab", function () {
    if (!$(this).hasClass("active")) {
        $(".grade-unity-stage-tab, .grade-unity-stage-container").removeClass("active");
        var tabIndex = $(".unity-periods-container").find(".grade-unity-stage-tab").index(this);
        $($(".grade-unity-stage-container").get(tabIndex)).addClass("active");
        $(this).addClass("active");
    }
});

$(document).on("click", ".manage-unity-periods-button", function () {
    var previousDate;
    var gradeUnities = [];
    var errorUnsequenced = false;
    var errorUnfilled = false;
    var errorDateAfterCalendarEnd = false;
    var splittedDate = "";

    var calendarEndDate = $(".calendar-end-date").val();
    calendarEndDate = calendarEndDate.split("/");
    calendarEndDate = calendarEndDate[2] + calendarEndDate[1] + calendarEndDate[0];

    $(".grade-unity-stage-container").each(function (i, stage) {
        $(stage).find(".grade-unity-container").each(function (index) {
            if ($(this).find(".grade-unity-initial-date").val() == "") {
                errorUnfilled = true;
                return false;
            }

            var currentDate = $(this).find(".grade-unity-initial-date").val();
            currentDate = currentDate.split("/");
            currentDate = currentDate[2] + currentDate[1] + currentDate[0];

            if (currentDate > calendarEndDate) {
                errorDateAfterCalendarEnd = true;
                return false;
            }

            if (index > 0) {
                if (previousDate > currentDate) {
                    errorUnsequenced = true;
                    return false;
                }
            }
            previousDate = currentDate;

            gradeUnities.push({
                gradeUnityFk: $(this).find(".grade-unity-id").val(),
                initialDate: $(this).find(".grade-unity-initial-date").val(),
            });
        });

        if (errorUnsequenced || errorUnfilled || errorDateAfterCalendarEnd) {
            $("#unity-periods-modal .modal-body").animate({scrollTop: 0}, "fast");
            return false;
        }
    });

    if (errorUnsequenced) {
        $("#unity-periods-modal").find(".error-calendar-event").html("As datas estão fora de sequência.").show();
    } else if (errorUnfilled) {
        $("#unity-periods-modal").find(".error-calendar-event").html("Preencha todas as datas.").show();
    } else if (errorDateAfterCalendarEnd) {
        $("#unity-periods-modal").find(".error-calendar-event").html("As datas selecionadas não podem ser superiores à data de fim do ano letivo (" + $(".calendar-end-date").val() + ").").show();
    } else {
        $("#unity-periods-modal").find(".error-calendar-event").hide();
        $.ajax({
            url: "?r=calendar/default/editUnityPeriods",
            type: "POST",
            data: {
                calendarFk: $("#unity-periods-modal").find(".calendar-id").val(),
                gradeUnities: gradeUnities,
            },
            beforeSend: function () {
                $("#unity-periods-modal").find(".modal-body").css("opacity", 0.3).css("pointer-events", "none");
                $("#unity-periods-modal").find("button").attr("disabled", "disabled");
                $("#unity-periods-modal").find(".centered-loading-gif").show();
            },
        }).success(function (data) {
            data = JSON.parse(data);
            if (data.valid) {
                $("#unity-periods-modal").modal("hide");
            } else {
                $("#unity-periods-modal").find(".alert").html(DOMPurify.sanitize(data.error)).show();
            }
        }).complete(function () {
            $("#unity-periods-modal").find(".modal-body").css("opacity", 1).css("pointer-events", "auto");
            $("#unity-periods-modal").find("button").removeAttr("disabled");
            $("#unity-periods-modal").find(".centered-loading-gif").hide();
        });
    }
});

$(document).on("click", ".replicate-periods", function () {
    $(".load-replication").css("display", "inline-block");
    var activeContainer = $(".unity-periods-container").find(".grade-unity-stage-container.active");
    var activeContainerDates = [];
    activeContainer.find(".grade-unity-container").each(function () {
        activeContainerDates.push($(this).find(".grade-unity-initial-date").val());
    });
    $(".unity-periods-container").find(".grade-unity-stage-container").not(activeContainer).each(function () {
        if (activeContainer.find(".grade-unity-container").length === $(this).find(".grade-unity-container").length) {
            $(this).find(".grade-unity-container").each(function (index) {
                $(this).find(".grade-unity-initial-date").val(activeContainerDates[index])
            });
        }
    });
    setTimeout(function () {
        $(".load-replication").hide();
    }, 300);
});

$(document).on("click", ".remove-calendar", function (e) {
    e.stopPropagation();
    $("#calendar_removal_id").val($(this).data('id'));
    $("#removeCalendar").modal("show");
});

$(document).on("click", ".remove-calendar-button", function () {
    $("#removeCalendar").find(".alert").hide();
    $.ajax({
        url: "?r=calendar/default/removeCalendar",
        type: "POST",
        data: {
            calendar_removal_id: $("#calendar_removal_id").val(),
        },
        beforeSend: function () {
            $("#removeCalendar .centered-loading-gif").show();
            $("#removeCalendar .modal-body").css("opacity", 0.3).css("pointer-events", "none");
            $("#removeCalendar button").attr("disabled", "disabled");
        },
    }).success(function (data) {
        data = JSON.parse(data);
        if (data.valid) {
            $(".calendar-container[data-id=" + $("#calendar_removal_id").val() + "]").closest(".accordion-group").remove();
            $(".accordion").children().length
                ? $(".no-calendars-alert").hide()
                : $(".no-calendars-alert").show();
            $("#removeCalendar").modal("hide");
        } else {
            $("#removeCalendar").find(".alert").html(DOMPurify.sanitize(data.error)).show();
        }
    }).complete(function () {
        $("#removeCalendar .centered-loading-gif").hide();
        $("#removeCalendar .modal-body").css("opacity", 1).css("pointer-events", "auto");
        $("#removeCalendar button").removeAttr("disabled");
    });
});

$(document).on("click", ".remove-event-button", function (e, confirm = 0) {
    $.ajax({
        url: "?r=calendar/default/deleteEvent",
        type: "POST",
        data: {
            id: $("#CalendarEvent_id").val(),
            calendarId: $("#CalendarEvent_calendar_fk").val(),
            confirm: confirm
        },
        beforeSend: function () {
            $("#myChangeEvent .centered-loading-gif").show();
            $("#myChangeEvent .modal-body").css("opacity", 0.3).css("pointer-events", "none");
            $("#myChangeEvent button").attr("disabled", "disabled");
        },
    }).success(function (data) {
        data = JSON.parse(data);
        if (data.valid) {
            var eventDays = $("a.change-event[data-id=" + data.id + "]");
            eventDays.attr("data-id", "-1").removeAttr("data-toggle").removeAttr("data-placement").removeAttr("data-original-title");
            eventDays.parent().removeClass("calendar-" + data.color);
            eventDays.find(".calendar-icon").remove();
            $("#myChangeEvent").modal("hide");
        } else {
            $("#myChangeEvent").find(".alert").addClass("alert-" + DOMPurify.sanitize(data.alert)).removeClass("alert-error").html(DOMPurify.sanitize(data.error)).show();
        }
    }).complete(function () {
        $("#myChangeEvent .centered-loading-gif").hide();
        $("#myChangeEvent .modal-body").css("opacity", 1).css("pointer-events", "auto");
        $("#myChangeEvent button").removeAttr("disabled");
    });
});

$(document).on("click", ".confirm-delete-event", function () {
    $(".remove-event-button").trigger("click", [1]);
});

$(document).on("click", ".change-event", function () {
    dismissPeriods();
    var event = this;
    $("#myChangeEvent").find(".selected-calendar-current-year").val($(event).closest(".calendar").data("year"));
    $(".error-calendar-event").hide();
    if ($(event).attr('data-id') !== "-1") {
        $(".remove-event-button").show();
        $.ajax({
            url: "?r=calendar/default/event",
            type: "POST",
            dataType: 'text',
            data: {
                id: $(event).attr('data-id')
            },
            beforeSend: function () {
                $(event).closest(".calendar-container").css("pointer-events", "none").css("opacity", 0.3);
                $(event).closest(".accordion-inner").find(".centered-loading-gif").show();
            },
            success: function (data) {
                data = $.parseJSON(data);
                $("#CalendarEvent_id").val(data.id);
                $("#CalendarEvent_calendar_fk").val(data.calendar_fk);
                $("#CalendarEvent_name").val(data.name);
                $("#CalendarEvent_start_date").val(data.start_date.split(" ")[0]);
                $("#CalendarEvent_end_date").val(data.end_date.split(" ")[0]);
                $("#CalendarEvent_calendar_event_type_fk").val(data.calendar_event_type_fk);
                $("#CalendarEvent_copyable").attr("checked", data.copyable);
                $("#myChangeEvent").modal("show");
            },
            complete: function () {
                $(event).closest(".calendar-container").css("pointer-events", "auto").css("opacity", 1);
                $(event).closest(".accordion-inner").find(".centered-loading-gif").hide();
            }
        });
    } else {
        $(".remove-event-button").hide();
        $("#CalendarEvent_id").val($(event).attr('data-id'));
        $("#CalendarEvent_calendar_fk").val($(event).closest(".calendar").attr("data-id"));
        $("#CalendarEvent_name").val("");
        $("#CalendarEvent_start_date").val($(event).data('year') + "-" + pad($(event).data('month'), 2) + "-" + pad($(event).data('day'), 2));
        $("#CalendarEvent_end_date").val($(event).data('year') + "-" + pad($(event).data('month'), 2) + "-" + pad($(event).data('day'), 2));
        $("#CalendarEvent_calendar_event_type_fk").val("");
        $("#CalendarEvent_copyable").attr("checked", "checked");
        $("#myChangeEvent").modal("show");
    }
});

$(document).on("click", ".save-event", function (e, confirm = 0) {
    var form = $(this).closest("form");
    if (form.find("#CalendarEvent_name").val() === "" || form.find("#CalendarEvent_start_date").val() === "" || form.find("#CalendarEvent_end_date").val() === "" || form.find("#CalendarEvent_calendar_event_type_fk").val() === "") {
        form.find(".alert").addClass("alert-error").removeClass(".alert-primary").html("Campos com * são obrigatórios.").show();
    } else if (form.find("#CalendarEvent_end_date").val() < form.find("#CalendarEvent_start_date").val()) {
        form.find(".alert").addClass("alert-error").removeClass(".alert-primary").html("A Data de Encerramento não deve ser anterior à Data de Início.").show();
    } else {
        form.find(".alert").hide();
        $.ajax({
            url: "?r=calendar/default/changeEvent",
            type: "POST",
            data: {
                id: $("#CalendarEvent_id").val(),
                calendarFk: $("#CalendarEvent_calendar_fk").val(),
                name: $("#CalendarEvent_name").val(),
                startDate: $("#CalendarEvent_start_date").val(),
                endDate: $("#CalendarEvent_end_date").val(),
                eventTypeFk: $("#CalendarEvent_calendar_event_type_fk").val(),
                copyable: $("#CalendarEvent_copyable").is(":checked"),
                confirm: confirm
            },
            beforeSend: function () {
                $("#myChangeEvent .centered-loading-gif").show();
                $("#myChangeEvent .modal-body").css("opacity", 0.3).css("pointer-events", "none");
                $("#myChangeEvent button").attr("disabled", "disabled");
            },
        }).success(function (data) {
            data = JSON.parse(data);
            if (data.valid) {
                var calendar = $(".calendar-container[data-id=" + $("#CalendarEvent_calendar_fk").val() + "]");
                if (data.uniqueDayToDelete !== null) {
                    var uniqueDay = $("a.change-event[data-id=" + data.uniqueDayToDelete.id + "]");
                    uniqueDay.attr("data-id", "-1").removeAttr("data-toggle").removeAttr("data-placement").removeAttr("data-original-title");
                    uniqueDay.parent().removeClass("calendar-" + data.uniqueDayToDelete.color);
                    uniqueDay.find(".calendar-icon").remove();
                }
                var oldEventDays = $("a.change-event[data-id=" + data.eventId + "]");
                oldEventDays.attr("data-id", "-1").removeAttr("data-toggle").removeAttr("data-placement").removeAttr("data-original-title");
                oldEventDays.parent().removeClass("calendar-" + data.color);
                oldEventDays.find(".calendar-icon").remove();
                $.each(data.datesToFill, function () {
                    var date = calendar.find(".change-event[data-year=" + this.year + "][data-month=" + this.month + "][data-day=" + this.day + "]");
                    date.attr("data-id", data.eventId).attr("data-toggle", "tooltip").attr("data-placement", "top").attr("data-original-title", data.eventName);
                    date.parent().addClass("calendar-" + data.color);
                    date.children(".calendar-icon").remove();
                    date.prepend("<i class='calendar-icon fa " + DOMPurify.sanitize(data.icon) + "'></i>");
                    $("#myChangeEvent").modal("hide");
                });
                $('[data-toggle="tooltip"]').tooltip({container: "body"});
            } else {
                form.find(".alert").addClass("alert-" + DOMPurify.sanitize(data.alert)).removeClass("alert-error").html(DOMPurify.sanitize(data.error)).show();
            }
        }).complete(function () {
            $("#myChangeEvent .centered-loading-gif").hide();
            $("#myChangeEvent .modal-body").css("opacity", 1).css("pointer-events", "auto");
            $("#myChangeEvent button").removeAttr("disabled");
        });
    }
});

$(document).on("click", ".confirm-save-event", function () {
    $(".save-event").trigger("click", [1]);
});

$(document).on("click", ".show-stages", function (e) {
    dismissPeriods();
    var icon = this;
    e.stopPropagation();
    if (!$(icon).closest(".accordion-group").find(".floating-stages-container").length) {
        $(".floating-stages-container").remove();
        $.ajax({
            url: "?r=calendar/default/showStages",
            type: "POST",
            data: {
                id: $(icon).data('id')
            },
            beforeSend: function () {
                $(icon).css("pointer-events", "none").find("i").addClass("fa-spin").addClass("fa-spinner").removeClass("fa-question-circle-o");
            },
        }).success(function (data) {
            data = JSON.parse(data);
            var html = "<div class='floating-stages-container' calendarid='" + $(icon).data('id') + "'><div class='stages-container-title'>" + $(icon).closest(".accordion-group").find(".accordion-title").text() + "</div>";
            $.each(data, function () {
                html += "" +
                    "<div class='stage-container'>" +
                    "<span>" + this.name + "</span>" +
                    (this.hasPeriod ? "<i stageid='" + this.id + "' calendarid='" + $(icon).data('id') + "' class='view-periods fa fa-map-o' data-toggle='tooltip' data-placement='right' data-original-title='Visualizar Vigência'></i>" : "") +
                    "</div>";
            });
            html += '<i class="close-stages-container fa fa-remove"></i></div>';
            $(icon).closest(".accordion-group").append(html);
            $(".view-periods").tooltip({container: "body"});
        }).complete(function () {
            $(icon).css("pointer-events", "auto").find("i").removeClass("fa-spin").removeClass("fa-spinner").addClass("fa-question-circle-o");
        });
    } else {
        $(".floating-stages-container").remove();
    }
});

$(document).on("click", ".view-periods", function () {
    var icon = this;
    $.ajax({
        url: "?r=calendar/default/viewPeriods",
        type: "POST",
        data: {
            calendarId: $(icon).attr("calendarid"),
            stageId: $(icon).attr("stageid")
        },
        beforeSend: function () {
            $(icon).css("pointer-events", "none").addClass("fa-spin").addClass("fa-spinner").removeClass("fa-map-o");
        },
    }).success(function (data) {
        data = JSON.parse(data);
        var calendarContainer = $(".calendar-container[data-id=" + $(icon).attr("calendarid") + "]");
        var backgroundPalletes = ["#26cb24", "#ff0000", "#0081c2", "#9700f6", "#d9d303", "#333333", "pink"];
        calendarContainer.find(".calendar-icon").addClass("calendar-icon-hide");
        $.each(data, function () {
            calendarContainer.find(".change-event[data-year=" + this.year + "][data-month=" + this.month + "][data-day=" + this.day + "]")
                .tooltip("destroy")
                .parent()
                .addClass("date-palleted").attr("data-toggle", "tooltip").attr("data-placement", "top").attr("data-original-title", this.unityName)
                .css("background-color", backgroundPalletes[this.colorIndex])

        });
        $(".date-palleted").tooltip({container: "body"});
    }).complete(function () {
        $(icon).css("pointer-events", "auto").removeClass("fa-spin").removeClass("fa-spinner").addClass("fa-map-o");
    });
});

$(document).on("click", ".close-stages-container", function () {
    dismissPeriods();
    $(".floating-stages-container").remove();
});

function dismissPeriods() {
    $(".calendar-container").find(".date-palleted").removeClass("date-palleted").css("background-color", "initial").tooltip("destroy");
    $(".calendar-container").find(".change-event").tooltip({container: "body"});
    $(".calendar-container").find(".calendar-icon").removeClass("calendar-icon-hide");
}

$(document).on("click", ".add-fundamental-menor", function () {
    $(this).closest(".stages-container").find("#stages option[value=14]").prop("selected", true);
    $(this).closest(".stages-container").find("#stages option[value=15]").prop("selected", true);
    $(this).closest(".stages-container").find("#stages option[value=16]").prop("selected", true);
    $(this).closest(".stages-container").find("#stages").trigger("change.select2");
});

$(document).on("click", ".add-fundamental-maior", function () {
    $(this).closest(".stages-container").find("#stages option[value=17]").prop("selected", true);
    $(this).closest(".stages-container").find("#stages option[value=18]").prop("selected", true);
    $(this).closest(".stages-container").find("#stages option[value=19]").prop("selected", true);
    $(this).closest(".stages-container").find("#stages option[value=20]").prop("selected", true);
    $(this).closest(".stages-container").find("#stages option[value=21]").prop("selected", true);
    $(this).closest(".stages-container").find("#stages option[value=41]").prop("selected", true);
    $(this).closest(".stages-container").find("#stages").trigger("change.select2");
});

$(document).on("click", ".remove-stages", function () {
    $(this).closest(".stages-container").find("#stages option").prop("selected", false);
    $(this).closest(".stages-container").find("#stages").trigger("change.select2");
});

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}