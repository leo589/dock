<?php if($frequency["valid"] == true): ?>
<div class="t-badge-info"><span class="t-info_positive t-badge-info__icon"></span>Para justificar falta e avaliação de Aluno clique no ícone </div>
<table aria-label="Tabela de alunos" class="column clearfix tag-table-secondary js-table-frequency">
    <thead>
        <tr>
            <th class="text-align--left">
                Nome
            </th>
            <th class="text-align--right">
                Faltas
            </th>
        </tr>
    </thead>
    <tbody>
        
    <?php foreach ($frequency["students"] as $f): 
        $url_link = yii::app()->createUrl('classdiary/default/StudentClassDiary', array('student_id' => $f["studentId"], 'stage_fk' => $stage_fk, 'classroom_id' => $classroom_fk, 'schedule' => $f["schedule"]["schedule"], 'date' => $date, 'discipline_fk' => $discipline_fk, "justification" => $f["schedule"]["justification"])) ; 
        $is_disabled = (!$f["schedule"]["available"] ? "disabled" : "");
    ?>
            <tr>
                <td> <a class='js-justification'  href='<?= $url_link ?>'><span class="t-icon-annotation t-icon "></span><?php echo $f["studentName"]; ?></a></td>
                <td class='justify-content--end' <?= $is_disabled ?>><input class='js-frequency-checkbox' id="<?php echo $f["studentId"] ?>" type='checkbox' <?= $is_disabled ?> <?php echo ( $f["schedule"]["fault"] ? "checked" : "") ?> 
                data-studentId='<?php echo $f["studentId"] ?>' data-classroom_id='<?php echo $classroom_fk ?>' data-stage_fk='<?php echo $stage_fk ?>' data-schedule='<?php echo $f["schedule"]["schedule"]?>'/></td>
            </tr>
    <?php endforeach ?>
    </tbody>
</table>
<?php else :?>
    <div class="t-badge-critical"><span class="t-info_positive t-badge-critical__icon"></span><?= $frequency["error"];?> </div>
<?php endif?>