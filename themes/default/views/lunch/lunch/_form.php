<?php
/* @var $menuModel Menu
 * @var $form CActiveForm
 * @var $isUpdate Boolean
 */

$baseScriptUrl = Yii::app()->controller->module->baseScriptUrl;

$cs = Yii::app()->getClientScript();
$cs->registerCssFile($baseScriptUrl . '/common/css/layout.css?v=1.0');
$cs->registerScriptFile($baseScriptUrl . '/common/js/lunch.js?v='.TAG_VERSION, CClientScript::POS_END);
$cs->registerCssFile($baseUrl . '/css/lunch.css');

$form = $this->beginWidget('CActiveForm', array(
    'id' => 'Menu',
    'enableClientValidation' => true,
    'clientOptions' => array(
        'validateOnSubmit' => true,
    ),
    'htmlOptions' => array(
        'class' => 'form-horizontal',
    ),
));
?>

<?php if (Yii::app()->user->hasFlash('success')) : ?>
    <div class="row-fluid">
        <div class="span12">
            <div class="alert alert-success">
                <?php echo Yii::app()->user->getFlash('success') ?>
            </div>
        </div>
    </div>
<?php endif ?>
<?php if (Yii::app()->user->hasFlash('error')) : ?>
    <div class="row-fluid">
        <div class="span12">
            <div class="alert alert-error">
                <?php echo Yii::app()->user->getFlash('error') ?>
            </div>
        </div>
    </div>
<?php endif ?>

<div class="row">
    <div class="column is-two-fifths">
        <div class="t-field-text">
            <?= CHTML::activeLabel($menuModel, 'date', ['class' => "control-label t-field-text__label"]) ?>

            <?php $date = 'date';
            ?>
            <?= CHTML::textField(chtml::resolveName($menuModel, $date), date("d/m/Y", strtotime($menuModel->date)),
            ['class' => "form-control t-field-text____input"]) ?>

        </div>
        <div class="t-field-text">
            <?= CHTML::activeLabel($menuModel, 'name', ['class' => "t-field-text__label"]) ?>
            <?php $name = 'name'; ?>
            <?= CHTML::textField(chtml::resolveName($menuModel, $name), $menuModel->name,
            ['class' => "t-field-text__input", 'placeholder' => 'Digite o Nome do Cardápio']) ?>

        </div>
        <div class="t-field-select">
            <?= CHTML::activeLabel($menuModel, 'turn', ['class' => "t-field-select__label"])?>
            <?php $turn = 'turn'; ?>
            <?= CHtml::dropDownList(chtml::resolveName($menuModel, $turn), $menuModel->turn,
            ['M'=>'Manhã', 'T' => 'Tarde', 'N' => 'Noite'], ["class" => "select-search-on t-field-select__input"])?>
        </div>

        <div class="form-group-container">
            <div class="t-buttons-container">
                <button type="submit" class="t-button-primary">
                    <?= Yii::t('lunchModule.lunch', 'Save'); ?>
                </button>
            </div>
        </div>
    </div>
</div>

<?php $this->endWidget() ?>
<br>
<?php if ($isUpdate) : ?>
    <div class="row">
        <div class="column">
            <div class="t-buttons-container">
                <button class="t-button-danger button-remove-lunch" data-lunch-id="<?= $menuModel->id ?>">
                    <?= Yii::t('lunchModule.lunch', 'Remove'); ?>
                </button>
            </div>
            <div class="form-group-container" style="margin-bottom: 20px;">
                <h4 class="heading glyphicons notes">
                    <i></i><?= yii::t('lunchModule.lunch', 'Meals') ?>
                </h4>
            </div>
            <div class="form-group-container" style="width: 98%;">
            <div class="column">
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr role="row">
                                <th class="span1">Código</th>
                                <th class="span4">Restrições</th>
                                <th>Porções</th>
                                <th class="span1">Quantidade</th>
                                <th class="span1">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            $odd = false;
                            foreach ($menuModel->menuMeals as $menuMeal) :
                                $meal = $menuMeal->meal;
                                $odd = !$odd;
                            ?>
                                <tr class="<?= $odd ? "odd" : "" ?>">
                                    <td id="id">REF<?= $meal->id ?></td>
                                    <td id="restrictions" style="word-wrap: break-word; max-width: 600px;}"><?= $meal->restrictions ?></td>
                                    <td id="portions">
                                        <table class="table table-clear">
                                            <tbody>
                                                <?php foreach ($meal->mealPortions as $mealPortion) :
                                                    $portion = $mealPortion->portion ?>
                                                    <tr class="<?= $odd ? "odd" : "" ?>">
                                                        <td><?= $portion->item->name ?></td>
                                                        <td class="span2"><?= (floatval($mealPortion->amount) . "x " .
                                                        floatval($portion->measure)). " " .
                                                        $portion->unity->acronym ?></td>
                                                        <td class="span1 text-right">
                                                            <a data-toggle="modal" href="#removePortion" data-meal-portion-id="<?= $mealPortion->id ?>" class="button-remove-portion btn btn-danger btn-mini hidden-print">
                                                                <i class="fa fa-times"></i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                <?php endforeach ?>
                                                <tr>
                                                    <td colspan="3" class="<?= $odd ? "odd" : "" ?>">

                                                        <a data-toggle="modal" href="#addPortion" data-meal-id="<?= $menuMeal->meal_fk ?>" class="pull-left button-add-portion btn btn-success btn-small hidden-print">
                                                            <i class="fa fa-plus-circle"></i>
                                                            <?= Yii::t('lunchModule.stock', 'Add Portion'); ?>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td id="amount" class="text-center"><?= $menuMeal->amount ?></td>
                                    <td id="actions" class="text-center">
                                        <a data-toggle="modal" href="#changeMeal" data-meal-id="<?= $menuMeal->meal_fk ?>" class="button-change-meal btn btn-primary btn-small hidden-print">
                                            <i class="fa fa-pencil-square-o"></i>
                                        </a>
                                    </td>
                                </tr>
                            <?php endforeach ?>
                        </tbody>
                    </table>
                </div>
            </div>
                <button data-toggle="modal" href="#addMeal" class="button-add-meal pull-right btn btn-success ">
                    <i class="fa fa-plus-circle"></i>
                    <?= Yii::t('lunchModule.lunch', 'New Lunch'); ?>
                </button>
            </div>
        </div>
    </div>

    <div class="modal fade modal-content" id="addPortion">
        <div class="modal-dialog">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="position:static;">
                    <img src="<?php echo Yii::app()->theme->baseUrl; ?>/img/Close.svg" alt="" style="vertical-align: -webkit-baseline-middle">
                </button>
                <h4 class="modal-title"><?= Yii::t('lunchModule.stock', 'Add Portion'); ?></h4>
            </div>
            <form id="portion" method="post" action="<?= yii::app()->createUrl("lunch/lunch/addPortion") ?>">
                <?= CHtml::hiddenField("Menu[id]", $menuModel->id, ["id" => "menu-id"]) ?>
                <?= CHtml::hiddenField("MealPortion[meal_fk]", "", ["id" => "meal-id"]) ?>
                <div class="modal-body">
                    <div id="is-add-amount" class="widget widget-scroll margin-bottom-none">
                        <div class="widget-head" style="background: none;">
                            <h4 class="heading">
                                <i></i><?= yii::t('lunchModule.stock', 'Add Amount') ?>
                            </h4>
                        </div>
                        <div class="widget-body">
                            <div class="row-fluid">
                                <div class=" span8">
                                    <?= CHtml::label(Yii::t('lunchModule.labels', 'Portion'), 'MealPortion[portion_fk]', array('class' => 'control-label')); ?>
                                    <div class="controls span12">
                                        <?= CHtml::dropDownList(
                                            'MealPortion[portion_fk]',
                                            '',
                                            CHtml::listData(Portion::model()->findAll(), 'id', 'concatName'),
                                            ['class' => 'span12']
                                        ); ?>
                                    </div>
                                </div>
                                <div class="span2" style="width: 8%;">
                                    <label class="control-label" style="margin: 0 0 10px 0; width: 10px;">&nbsp;</label>
                                    <div class="controls span6" style="width: 100%;">
                                        <a href="#" id="new-portion" class="btn btn-success btn-small" style="background:none; border:none;">
                                            <img src="<?php echo Yii::app()->theme->baseUrl; ?>/img/addItem.svg" alt="Adicionar Novo Item">
                                        </a>
                                    </div>
                                </div>
                                <div class=" span2" style="width: 23%;">
                                    <?= CHtml::label(Yii::t('lunchModule.labels', 'Amount'), 'MealPortion[amount]', array('class' => 'control-label', 'style' => 'width: 100%')); ?>
                                    <div class="controls span12">
                                        <?= CHtml::numberField('MealPortion[amount]', '1', ['min' => '0', 'step' => '1', 'class' => 'span10', 'style' => 'height:44px;width:100%;']); ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="is-new-portion" class="widget widget-scroll margin-bottom-none">
                        <div class="widget-head" style="background: none;">
                            <h4 class="heading">
                                <i></i><?= yii::t('lunchModule.stock', 'New Portion') ?>
                            </h4>
                        </div>
                        <div class="widget-body" style="overflow: hidden;">
                            <div class="row-fluid">
                                <div class=" span6" style="margin-right:12px">
                                    <?= CHtml::label(Yii::t('lunchModule.labels', 'Item'), 'Item', array('class' => 'control-label')); ?>
                                    <div class="controls span12">
                                        <?= CHtml::dropDownList(
                                            'Portion[item_fk]',
                                            '',
                                            CHtml::listData(Item::model()->with(["inventories" => ["select" => "amount", 'condition' => 'amount > 0']])->findAll(), 'id', 'concatName'),
                                            ['class' => 'pull-left span10', 'style' => 'height:44px;width:100%;']
                                        ); ?>

                                    </div>
                                </div>

                                <div class=" span2" style="margin-right:10px">
                                    <?= CHtml::label(Yii::t('lunchModule.labels', 'Amount'), 'MealPortion[amount]', array('class' => 'control-label')); ?>
                                    <div class="controls span12">
                                        <?= CHtml::numberField('MealPortion[amount]', '1', ['min' => '0', 'step' => '1', 'class' => 'span10', 'style' => 'height:44px;width:100%;']); ?>
                                    </div>
                                </div>
                                <div class=" span2" style="margin-right:10px">
                                    <?= CHtml::label(Yii::t('lunchModule.labels', 'Measure'), 'Measure', array('class' => 'control-label')); ?>
                                    <div class="controls span12">
                                        <?= CHtml::numberField('Portion[measure]', '1', ['min' => '0', 'step' => '1', 'class' => 'span10', 'style' => 'height:44px;width:100%;']); ?>
                                    </div>
                                </div>
                                <div class=" span2" style="width: 10%;">
                                    <?= CHtml::label(Yii::t('lunchModule.labels', 'Measure'), 'Measure', array('class' => 'control-label', 'style' => 'width:auto')); ?>
                                    <div class="controls span12">
                                        <?= CHtml::dropDownList(
                                            'Portion[unity_fk]',
                                            '',
                                            CHtml::listData(Unity::model()->findAll(['order' => 'acronym']), 'id', 'acronym'),
                                            ['class' => ' span10', 'style' => 'width:100%']
                                        ); ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal"><?= Yii::t('lunchModule.stock', 'Close'); ?></button>
                        <button type="submit" class="btn btn-primary"><?= Yii::t('lunchModule.stock', 'Add'); ?></button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <div class="modal fade modal-content" id="removePortion">
        <div class="modal-dialog">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="position:static;">
                    <img src="<?php echo Yii::app()->theme->baseUrl; ?>/img/Close.svg" alt="" style="vertical-align: -webkit-baseline-middle">
                </button>
                <h4 class="modal-title"><?= Yii::t('lunchModule.stock', 'Remove Portion'); ?></h4>
            </div>
            <form id="portion" method="post" action="<?= yii::app()->createUrl("lunch/lunch/removePortion") ?>">
                <?= CHtml::hiddenField("Menu[id]", $menuModel->id, ["id" => "menu-id"]) ?>
                <?= CHtml::hiddenField("MealPortion[id]", "", ["id" => "meal-portion-id"]) ?>
                <div class="modal-body">
                    <div id="is-add-amount" class="widget widget-scroll margin-bottom-none">
                        <div class="widget-head" style="background: none;">
                            <h4 class="heading">
                                <i></i><?= yii::t('lunchModule.stock', 'Remove Amount') ?>
                            </h4>
                        </div>
                        <div class="widget-body" style="overflow: hidden;">
                            <div class="row-fluid">
                                <div class=" span6" style="width: 75%;margin-right:22px;">
                                    <?= CHtml::label(Yii::t('lunchModule.labels', 'Portion'), 'MealPortion[portion_fk]', array('class' => 'control-label')); ?>
                                    <div class="controls span12">
                                        <?= CHtml::dropDownList(
                                            'MealPortion[portion_fk]',
                                            '',
                                            CHtml::listData(Portion::model()->findAll(), 'id', 'concatName'),
                                            ['disabled' => 'true', 'class' => 'span10', 'style' => 'width: 100%']
                                        ); ?>
                                    </div>
                                </div>
                                <div class=" span6" style="width: 20%;">
                                    <?= CHtml::label(Yii::t('lunchModule.labels', 'Amount'), 'MealPortion[amount]', array('class' => 'control-label')); ?>
                                    <div class="controls span12">
                                        <?= CHtml::numberField('MealPortion[amount]', '1', ['min' => '1', 'step' => '1', 'class' => 'span10', 'style' => 'height:44px; width:99%;']); ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal"><?= Yii::t('lunchModule.stock', 'Close'); ?></button>
                        <button type="submit" class="btn btn-danger"><?= Yii::t('lunchModule.stock', 'Remove'); ?></button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <div class="modal fade modal-content" id="addMeal">
        <div class="modal-dialog">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="position:static;">
                    <img src="<?php echo Yii::app()->theme->baseUrl; ?>/img/Close.svg" alt="" style="vertical-align: -webkit-baseline-middle">
                </button>
                <h4 class="modal-title"><?= Yii::t('lunchModule.lunch', 'Add Lunch'); ?></h4>
            </div>
            <form id="portion" method="post" action="<?= yii::app()->createUrl("lunch/lunch/addMeal") ?>">
                <?= CHtml::hiddenField("MenuMeal[menu_fk]", $menuModel->id, ["id" => "menu-id"]) ?>
                <div class="modal-body">
                    <div id="is-add-amount" class="widget widget-scroll margin-bottom-none">
                        <h4 class="heading">
                            <i></i><?= yii::t('lunchModule.lunch', 'New Lunch') ?>
                        </h4>
                        <div class="widget-body" style="overflow: hidden;">
                            <div class="row-fluid">
                                <div class=" span6" style="width: 75%;margin-right:22px;">
                                    <?= CHtml::label(Yii::t('lunchModule.labels', 'Restrictions'), 'Meal[restrictions]', array('class' => 'control-label')); ?>
                                    <div class="controls span12" style="margin-left: 0;">
                                        <?= CHtml::textArea('Meal[restrictions]', '', ['style' => 'resize: vertical;', 'class' => 'span10', 'style' => 'height:44px;width: 100%']); ?>
                                    </div>
                                </div>
                                <div class=" span6" style="width: 20%;">
                                    <?= CHtml::label(Yii::t('lunchModule.labels', 'Amount'), 'MenuMeal[amount]', array('class' => 'control-label')); ?>
                                    <div class="controls span12">
                                        <?= CHtml::numberField('MenuMeal[amount]', '1', ['min' => '1', 'step' => '1', 'class' => 'span10', 'style' => 'height:44px; width:99%;']); ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">
                            <?= Yii::t('lunchModule.stock', 'Close'); ?>
                        </button>
                        <button type="submit" class="btn btn-primary">
                            <?= Yii::t('lunchModule.stock', 'Add'); ?>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <div class="modal fade modal-content" id="changeMeal">
        <div class="modal-dialog">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="position:static;">
                    <img src="<?php echo Yii::app()->theme->baseUrl; ?>/img/Close.svg" alt="" style="vertical-align: -webkit-baseline-middle">
                </button>
                <h4 class="modal-title"><?= Yii::t('lunchModule.lunch', 'Update Lunch'); ?></h4>
            </div>
            <form id="portion" method="post" action="<?= yii::app()->createUrl("lunch/lunch/changeMeal") ?>">
                <?= CHtml::hiddenField("MenuMeal[menu_fk]", $menuModel->id, ["id" => "menu-id"]) ?>
                <?= CHtml::hiddenField("MenuMeal[meal_fk]", '', ["id" => "meal-id"]) ?>
                <div class="modal-body">
                    <div id="is-add-amount" class="widget widget-scroll margin-bottom-none">
                        <div class="widget-head" style="background: none;">
                            <h4 class="heading">
                                <i></i><?= yii::t('lunchModule.lunch', 'Lunch Info') ?>
                            </h4>
                        </div>
                        <div class="widget-body" style="overflow: hidden;">
                            <div class="row-fluid">
                                <div class=" span6" style="width: 75%;margin-right:22px;">
                                    <?= CHtml::label(Yii::t('lunchModule.labels', 'Restrictions'), 'Meal[restrictions]', array('class' => 'control-label')); ?>
                                    <div class="controls span12" style="margin-left: 0;">
                                        <?= CHtml::textArea('Meal[restrictions]', '', ['style' => 'resize: vertical;', 'class' => 'span10', 'style' => 'height:44px;width: 100%']); ?>
                                    </div>
                                </div>
                                <div class=" span6" style="width: 20%;">
                                    <?= CHtml::label(Yii::t('lunchModule.labels', 'Amount'), 'MenuMeal[amount]', array('class' => 'control-label')); ?>
                                    <div class="controls span12">
                                        <?= CHtml::numberField('MenuMeal[amount]', '1', ['min' => '1', 'step' => '1', 'class' => 'span10', 'style' => 'height:44px; width:99%;']); ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">
                            <?= Yii::t('lunchModule.lunch', 'Close'); ?>
                        </button>
                        <button type="submit" class="btn btn-primary">
                            <?= Yii::t('lunchModule.lunch', 'Update'); ?>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
<?php endif ?>
