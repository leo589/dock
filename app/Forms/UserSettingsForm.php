<?php

namespace App\Forms;

use Kris\LaravelFormBuilder\Form;

class UserSettingsForm extends Form
{
    public function buildForm()
    {
        $this
            ->add('password', 'password', [
                'rules' => 'required|min:6|max:16|confirmed',
                'label' => 'Senha'
            ])
            ->add('password_confirmation', 'password', [
                'label' => 'Confirmar Senha'
            ]);
    }
}
