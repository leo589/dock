$('.js-add-course-classes-accordion').on("change", function (){
    let optionSelected = $(this).val();
     let PlanName = $(this).find('option[value="' + optionSelected + '"]').text();
   
   
    $.ajax({
        type:'POST',
        data: {
            plan_name: PlanName,
            id: optionSelected
        },
        url:`?r=classdiary/default/RenderAccordion`
    }).success(function (response){
        $('.js-course-classes-accordion').append(DOMPurify.sanitize(response))
        $(function () {
            if($(".js-course-classes-accordion").data('uiAccordion')){
                $(".js-course-classes-accordion").accordion('destroy');
            }
            $( ".js-course-classes-accordion").accordion({
                active: false,
                collapsible: true,
                icons: false,
            });
        });

        // Remover a opção selecionada
        // $(this).find('option[value="' + optionSelected + '"]').remove();
    })
})
function renderFrequencyElement(w) {
    const urlParams = new URLSearchParams(window.location.search);
    const classroom_fk = urlParams.get("classroom_fk")
    const stage_fk = urlParams.get("stage_fk")
    const discipline_fk = urlParams.get("discipline_fk")
    const date = $('.js-date').val()
    const url =`RenderFrequencyElementMobile`;
    $.ajax({
        url: `${window.location.host}?r=classdiary/default/${url}&classroom_fk=${classroom_fk}&stage_fk=${stage_fk}&discipline_fk=${discipline_fk}&date=${date}`,
        type: "GET",
        
    }).success(function (response) {
        $(".js-frequency-element").html(DOMPurify.sanitize(response))
    });  
}
function updateClassesContents() 
{
    const urlParams = new URLSearchParams(window.location.search);
    const classroom_fk = urlParams.get("classroom_fk")  
    const discipline_fk = urlParams.get("discipline_fk")
    const stage_fk = urlParams.get("stage_fk")
    const date = $('.js-date').val();
    $.ajax({
        type:'GET',
        url:  `${window.location.host}?r=classdiary/default/GetClassesContents&classroom_fk=${classroom_fk}&stage_fk=${stage_fk}&date=${date}&discipline_fk=${discipline_fk}`
    }).success((response) => {
        
        if(response.valid==true){
            let options = "";
            $.each(response["courseClasses"], function () {
                options += '<option value="' + this.id + '" disciplineid="' + this.edid + '" disciplinename="' + this.edname + '">' + this.cpname + "|" + this.order + "|" + this.objective + "|" + this.edname + '</option>';
            });
            $("#coursePlan").html(options);
            $("#coursePlan").select2("val", response["classContents"]);
            $('#coursePlan').select2({
                formatSelection: function (state) {
                    let textArray = state.text.split("|");
                    return 'Plano de Aula "' + textArray[0] + '": Aula ' + textArray[1];
                },
                formatResult: function (data, container) {
                    let textArray = data.text.split("|");
                    if (textArray.length === 1) {
                        return "<div class='course-classes-optgroup'><b>" + textArray[0] + "</b></div>";
                    } else {
                        return "<div class='course-classes-option'><div><b>Plano de Aula:</b> <span>" + textArray[0] + "</span></div><div><b>Aula " + textArray[1] + "</b> - " + textArray[2] + "</div></div>";
                    }
                },
            });
            $(".js-hide-is-not-valid").show()
        }
    });
}

$(".js-save-course-plan").on("click", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const classroom_fk = urlParams.get("classroom_fk")  
    const stage_fk = urlParams.get("stage_fk")
    const date = $('.js-date').val();
    const discipline_fk = urlParams.get("discipline_fk")
    const classContent = $('#coursePlan').val();
   

     $.ajax({
        type:'GET',
        url:`${window.location.host}?r=classdiary/default/SaveClassContents&stage_fk=${stage_fk}&date=${date}&discipline_fk=${discipline_fk}&classroom_fk=${classroom_fk}&classContent=${classContent}`
    })
});

$(document).on("change", ".js-frequency-checkbox", function () {
    $.ajax({
        type: "POST",
        url: `${window.location.host}?r=classdiary/default/saveFresquency`,
        cache: false,
        data: {
            classroom_id: $(this).attr("data-classroom_id"),
            date: $(".js-date").val(),
            schedule: $(this).attr("data-schedule"),
            studentId: $(this).attr("data-studentId"),
            fault: $(this).is(":checked") ? 1 : 0,
            stage_fk: $(this).attr("data-stage_fk")
        },
        beforeSend: function () {
            $(".js-table-frequency").css("opacity", 0.3).css("pointer-events", "none");
            $(".js-date, .js-change-date").attr("disabled", "disabled");
        },
        complete: function (response) {
            $(".js-table-frequency").css("opacity", 1).css("pointer-events", "auto");
            $(".js-date, .js-change-date").removeAttr("disabled");
        },
    })
});


$(".js-change-date").on("click", function () {
    renderFrequencyElement(widthWindow)
    updateClassesContents();
});

let widthWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
renderFrequencyElement(widthWindow)
updateClassesContents();