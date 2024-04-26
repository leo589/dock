@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row">
            @component('admin.users.tabs-component',['user' => $form->getModel()])
                <div class="col-md-12">
                    <h3>Editar Usuário</h3>
                    {!!
                    form($form->add('edit', 'submit', [
                        'attr' => ['class' => 'btn btn-primary btn-block'],
                        'label' => Icon::create('floppy-disk').'&nbsp;&nbsp;Editar'
                    ]))
                    !!}
                </div>
            @endcomponent
        </div>
    </div>
@endsection